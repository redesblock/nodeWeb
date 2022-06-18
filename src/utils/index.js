import { BigNumber } from 'bignumber.js'

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
