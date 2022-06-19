import { BigNumber } from 'bignumber.js'
import Token from "@/utils/Token";
export const lengthWithoutPrefix = (s) => s.replace(/^0x/i, '').length;

export const isPrefixedHexString = (s) =>{
    return typeof s === 'string' && /^0x[0-9a-f]+$/i.test(s);
}

export const split = (s) => {
    const nonPrefixLength = lengthWithoutPrefix(s);
    if (nonPrefixLength % 6 === 0)
        return s.match(/(0x|.{6})/gi) || [];
    return s.match(/(0x|.{1,8})/gi) || [];
};


/**
 * Test if value is an integer
 *
 * @param value Value to be tested if it is an integer
 *
 * @returns True if the passed in value is integer
 */
 export function isInteger(value){
    return (BigNumber.isBigNumber(value) && value.isInteger()) || typeof value === 'bigint'
  }
  
  /**
   *Convert value into a BigNumber if not already
   *
   * @param value Value to be converted
   *
   * @throws {TypeError} if the value is not convertible to a BigNumber
   *
   * @returns BigNumber - but it may still be NaN or Infinite
   */
  export function makeBigNumber(value){
    if (BigNumber.isBigNumber(value)) return value
  
    if (typeof value === 'string') return new BigNumber(value)
  
    if (typeof value === 'bigint') return new BigNumber(value.toString())
  
    // FIXME: bee-js still returns some values as numbers and even outside of SAFE INTEGER bounds
    if (typeof value === 'number' /* && Number.isSafeInteger(value)*/) return new BigNumber(value)
  
    throw new TypeError(`Not a BigNumber or BigNumber convertible value. Type: ${typeof value} value: ${value}`)
  }


  export function getHumanReadableFileSize(bytes) {
    if (bytes >= 1e15) {
      return (bytes / 1e15).toFixed(2) + ' PB'
    }
  
    if (bytes >= 1e12) {
      return (bytes / 1e12).toFixed(2) + ' TB'
    }
  
    if (bytes >= 1e9) {
      return (bytes / 1e9).toFixed(2) + ' GB'
    }
  
    if (bytes >= 1e6) {
      return (bytes / 1e6).toFixed(2) + ' MB'
    }
  
    if (bytes >= 1e3) {
      return (bytes / 1e3).toFixed(2) + ' kB'
    }
  
    return bytes + ' bytes'
  }

export function mapPromiseSettlements(promises) {
    const fulfilled = promises.filter(promise => promise.status === 'fulfilled');
    const rejected = promises.filter(promise => promise.status === 'rejected');
    return { fulfilled, rejected };
}
export function unwrapPromiseSettlements(promiseSettledResults) {
    const values = mapPromiseSettlements(promiseSettledResults);
    const fulfilled = values.fulfilled.map(x => x.value);
    const rejected = values.rejected.map(x => (x.reason ? String(x.reason) : 'Unknown error'));
    return { fulfilled, rejected };
}


export async function sleepMs(ms) {
  await new Promise(resolve => setTimeout(() => {
      resolve();
  }, ms));
}

export function makeRetriablePromise(fn, maxRetries = 3, delayMs = 1000) {
  return new Promise(async (resolve, reject) => {
      for (let tries = 0; tries < maxRetries; tries++) {
          try {
              const results = await fn();
              resolve(results);
              return;
          }
          catch (error) {
              if (tries < maxRetries - 1) {
                sleepMs(delayMs)
              }
              else {
                  reject(error);
              }
          }
      }
  });
}

export function mergeAccounting( balances, settlements, uncashedAmounts){
  // Settlements or balances are still loading or there is an error -> return null
  if (!balances || !settlements) return null

  const accounting = {}

  balances.forEach(
    // Some peers may not have settlement but all have balance (therefore initialize sent, received and uncashed to 0)
    ({ peer, balance }) =>
      (accounting[peer] = {
        peer,
        balance,
        sent: new Token('0'),
        received: new Token('0'),
        uncashedAmount: new Token('0'),
        total: balance,
      }),
  )

  settlements.forEach(({ peer, sent, received }) =>
      (accounting[peer] = {
        ...accounting[peer],
        sent,
        received,
        total: new Token(accounting[peer].balance.toBigNumber.plus(received.toBigNumber).minus(sent.toBigNumber)),
      }),
  )

  // If there are no cheques (and hence last cashout actions)
  if (!uncashedAmounts) return Object.values(accounting).sort((a, b) => (a.peer < b.peer ? -1 : 1))

  uncashedAmounts?.forEach(({ peer, uncashedAmount }) => {
    accounting[peer].uncashedAmount = new Token(uncashedAmount)
  })

  // Return sorted by the uncashed amount first and then by the peer id
  return Object.values(accounting).sort((a, b) => {
    const diff = b.uncashedAmount.toBigNumber.minus(a.uncashedAmount.toBigNumber).toNumber()

    if (diff !== 0) return diff

    return a.peer < b.peer ? -1 : 1
  })
}
