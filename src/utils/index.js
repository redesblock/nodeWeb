
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
