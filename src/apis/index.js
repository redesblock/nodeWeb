import { beeApi, beeDebugApi } from "./Bee";

// connected 
export function isConnected () {
    return beeApi.isConnected()
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
    return beeDebugApi.getHealth()
}

export function getNodeAddresses () {
    return beeDebugApi.getNodeAddresses()
    // return request({
    //     url: getApi() + '/addresses'
    // })
}

export function getNodeInfo () {
    return beeDebugApi.getNodeInfo()
    // /node
}


export function getTopology () {
    return beeDebugApi.getTopology()
    // /topology
}

export function getPeers () {
    return beeDebugApi.getPeers()
    // /peers
}

export function getChequebookAddress () {
    return beeDebugApi.getChequebookAddress()
    // return request({
    //     url: getApi() + '/chequebook/address'
    // })
}

export function getLastCheques () {
    return beeDebugApi.getLastCheques()
    // return request({
    //     url: getApi() + '/chequebook/cheque'
    // })
}

export function getChainState () {
    return beeDebugApi.getChainState()
    // return request({
    //     url: getApi() + '/chainstate'
    // })
}


export function getChequebookBalance () {
    return beeDebugApi.getChequebookBalance()
    // return request({
    //     url: getApi() + '/chequebook/balance'
    // })
}

export function getAllBalances() {
    return beeDebugApi.getAllBalances()
    // return request({
    //     url: getApi() + '/balances'
    // })
}

export function getAllSettlements () {
    return beeDebugApi.getAllSettlements()
    // return request({
    //     url: getApi() + '/settlements'
    // })
}

export function getLastCashoutAction(peer) {
    return beeDebugApi.getLastCashoutAction(peer)
    // return request({
    //     url: getApi() + '/chequebook/cashout/' + peer
    // })
}

export function getAllPostageBatch () {
    return beeDebugApi.getAllPostageBatch()
    // return request({
    //     url: getApi() + '/stamps'
    // })
}

export function depositTokens (data) {
    return beeDebugApi.depositTokens(data.amount.toString())
    // return request({
    //     url: getApi() + '/chequebook/deposit',
    //     method: 'post',
    //     params: data
    // })
}

export function withdrawTokens (data) {
    return beeDebugApi.withdrawTokens(data.amount.toString())
    // return request({
    //     url: getApi() + '/chequebook/withdraw',
    //     method: 'post',
    //     params: data
    // })
}

export function createPostageBatch (amount, depth, options) {
    return beeDebugApi.createPostageBatch(amount.toString(), depth, options)
    // return request({
    //     url: getApi() + `/stamps/${params.Amount}/${params.Depth}?label=${params.Label}`,
    //     method: 'POST'
    // })
}

export function cashoutLastCheque(peerId) {
    return beeDebugApi.cashoutLastCheque(peerId)
}


// export function withDrawHandle(peerId) {
//     return beeDebugApi.cashoutLastCheque(peerId)
// }

