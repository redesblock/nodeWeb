import { mopApi, mopDebugApi } from "./Mop";

// connected 
export function isConnected () {
    return mopApi.isConnected()
    // const store = useAppModule()
    // return request({
    //     url: store.api + '/'
    // })
}
// 
export function getHealth () {
    // return request({
    //     url: getApi() + '/health'
    // })
    return mopDebugApi.getHealth()
}

export function getNodeAddresses () {
    return mopDebugApi.getNodeAddresses()
    // return request({
    //     url: getApi() + '/addresses'
    // })
}

export function getNodeInfo () {
    return mopDebugApi.getNodeInfo()
    // /node
}


export function getTopology () {
    return mopDebugApi.getTopology()
    // /topology
}

export function getPeers () {
    return mopDebugApi.getPeers()
    // /peers
}

export function getChequebookAddress () {
    return mopDebugApi.getChequebookAddress()
    // return request({
    //     url: getApi() + '/chequebook/address'
    // })
}

export function getLastCheques () {
    return mopDebugApi.getLastCheques()
    // return request({
    //     url: getApi() + '/chequebook/cheque'
    // })
}

export function getChainState () {
    return mopDebugApi.getChainState()
    // return request({
    //     url: getApi() + '/chainstate'
    // })
}


export function getChequebookBalance () {
    return mopDebugApi.getChequebookBalance()
    // return request({
    //     url: getApi() + '/chequebook/balance'
    // })
}

export function getAllBalances() {
    return mopDebugApi.getAllBalances()
    // return request({
    //     url: getApi() + '/balances'
    // })
}

export function getAllSettlements () {
    return mopDebugApi.getAllSettlements()
    // return request({
    //     url: getApi() + '/settlements'
    // })
}

export function getLastCashoutAction(peer) {
    return mopDebugApi.getLastCashoutAction(peer)
    // return request({
    //     url: getApi() + '/chequebook/cashout/' + peer
    // })
}

export function getAllVoucherBatch () {
    return mopDebugApi.getAllVoucherBatch()
    // return request({
    //     url: getApi() + '/stamps'
    // })
}

export function depositTokens (data) {
    return mopDebugApi.depositTokens(data.amount.toString())
    // return request({
    //     url: getApi() + '/chequebook/deposit',
    //     method: 'post',
    //     params: data
    // })
}

export function withdrawTokens (data) {
    return mopDebugApi.withdrawTokens(data.amount.toString())
    // return request({
    //     url: getApi() + '/chequebook/withdraw',
    //     method: 'post',
    //     params: data
    // })
}

export function createVoucherBatch (amount, depth, options) {
    return mopDebugApi.createVoucherBatch(amount.toString(), depth, options)
    // return request({
    //     url: getApi() + `/stamps/${params.Amount}/${params.Depth}?label=${params.Label}`,
    //     method: 'POST'
    // })
}

export function cashoutLastCheque(peerId) {
    return mopDebugApi.cashoutLastCheque(peerId)
}


// export function withDrawHandle(peerId) {
//     return mopDebugApi.cashoutLastCheque(peerId)
// }

