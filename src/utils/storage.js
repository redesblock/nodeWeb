export function shortenHash(hash, sliceLength = 8) {
    return `${hash.slice(0, sliceLength)}[…]${hash.slice(-sliceLength)}`;
}
export var HISTORY_KEYS;
(function (HISTORY_KEYS) {
    HISTORY_KEYS["UPLOAD_HISTORY"] = "UPLOAD_HISTORY";
    HISTORY_KEYS["DOWNLOAD_HISTORY"] = "DOWNLOAD_HISTORY";
})(HISTORY_KEYS || (HISTORY_KEYS = {}));

export function putHistory(key, hash, name) {
    const history = getHistorySafe(key);
    const existingIndex = history.findIndex(x => x.hash === hash);
    if (existingIndex !== -1) {
        history.splice(existingIndex, 1);
    }
    history.unshift({
        createdAt: Date.now(),
        hash,
        name,
    });
    if (history.length > 10) {
        history.length = 10;
    }
    localStorage.setItem(key, JSON.stringify(history));
}
export function getHistorySafe(key) {
    const items = localStorage.getItem(key);
    if (!items) {
        return [];
    }
    try {
        const parsed = JSON.parse(items);
        if (!Array.isArray(parsed) || !parsed.every(isHistoryItem)) {
            return [];
        }
        return parsed;
    }
    catch (_a) {
        return [];
    }
}
function isHistoryItem(x) {
    if (typeof x !== 'object' || x === null) {
        return false;
    }
    return 'createdAt' in x && 'hash' in x;
}
export function determineHistoryName(hash, indexDocument) {
    if (indexDocument === 'index.html') {
        return `Website ${shortenHash(hash, 4)}`;
    }
    else if (indexDocument) {
        return indexDocument;
    }
    return `Folder ${shortenHash(hash, 4)}`;
}