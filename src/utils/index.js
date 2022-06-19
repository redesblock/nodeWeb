import { BigNumber } from 'bignumber.js'
import Token from "@/utils/Token";
import { BZZ_LINK_DOMAIN } from "./data";
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

const regexpMatchHash = /(?:^|[^a-f0-9]+)([a-f0-9]{64}|[a-f0-9]{128})(?:$|[^a-f0-9]+)/i

export function extractSwarmHash(string){
  const matches = string.match(regexpMatchHash)

  return (matches && matches[1]) || undefined
}

// Matches the CID from bzz-link subdomain
const regexpMatchCID = new RegExp(`https://(bah5acgza[a-z0-9]{52})\\.${BZZ_LINK_DOMAIN}`, 'i')

export function extractSwarmCid(s){
  const matches = s.match(regexpMatchCID)

  if (!matches || !matches[1]) {
    return
  }

  const cid = matches[1]
  try {
    const decodeResult = decodeCid(cid)

    if (!decodeResult.type) {
      return
    }

    return decodeResult.reference
  } catch (e) {
    return
  }
}

// Matches any number of subdomain with .eth
// e.g. this.is.just-a-test.eth
export const regexpEns = /((?:(?:[^-./?:\s][^./?:\s]{0,61}[^-./?:\s]|[^-./?:\s]{1,2})\.)+eth)(?:$|[/?:#].*)/i

export function extractEns(value){
  const matches = value.match(regexpEns)

  return (matches && matches[1]) || undefined
}

export function recognizeEnsOrSwarmHash(value) {
  return extractEns(value) || extractSwarmHash(value) || extractSwarmCid(value) || value
}

export function uuidV4() {
  const pattern = '10000000-1000-4000-8000-100000000000'

  return pattern.replace(/[018]/g, (s) => {
    const c = parseInt(s, 10)

    return (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  })
}

export function formatEnum(string) {
  return (string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()).replaceAll('_', ' ')
}

export function secondsToTimeString(seconds) {
  let unit = seconds

  if (unit < 120) {
    return `${seconds} seconds`
  }
  unit /= 60

  if (unit < 120) {
    return `${Math.round(unit)} minutes`
  }
  unit /= 60

  if (unit < 48) {
    return `${Math.round(unit)} hours`
  }
  unit /= 24

  if (unit < 14) {
    return `${Math.round(unit)} days`
  }
  unit /= 7

  if (unit < 52) {
    return `${Math.round(unit)} weeks`
  }
  unit /= 52

  return `${unit.toFixed(1)} years`
}

export function convertDepthToBytes(depth) {
  return 2 ** depth * 4096
}

export function convertAmountToSeconds(amount, pricePerBlock) {
  // TODO: blocktime should come directly from the blockchain as it may differ between different networks
  const blockTime = 5 // On mainnet there is 5 seconds between blocks

  // See https://github.com/ethersphere/bee/blob/66f079930d739182c4c79eb6008784afeeba1096/pkg/debugapi/postage.go#L410-L413
  return (amount * blockTime) / pricePerBlock
}

export function calculateStampPrice(depth, amount) {
  // See https://github.com/ethersphere/bee/blob/66f079930d739182c4c79eb6008784afeeba1096/pkg/debugapi/postage.go#L410-L413
  return new Token(amount * BigInt(2 ** depth)) // FIXME: the 2 ** depth should be performed on bigint already
}

export function shortenText(text, length = 20, separator = '[…]') {
  if (text.length <= length * 2 + separator.length) {
    return text
  }

  return `${text.slice(0, length)}${separator}${text.slice(-length)}`
}

const DEFAULT_POLLING_FREQUENCY = 1_000
const DEFAULT_STAMP_USABLE_TIMEOUT = 120_000


export async function waitUntilStampUsable(batchId,beeDebug,options){
  const timeout = options?.timeout || DEFAULT_STAMP_USABLE_TIMEOUT
  const pollingFrequency = options?.pollingFrequency || DEFAULT_POLLING_FREQUENCY

  for (let i = 0; i < timeout; i += pollingFrequency) {
    const stamp = await beeDebug.getPostageBatch(batchId)

    if (stamp.usable) return stamp
    await sleepMs(pollingFrequency)
  }

  throw new Error('Wait until stamp usable timeout has been reached')
}
