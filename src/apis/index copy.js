import axios from "axios";
import { useAppModule } from "@/store/appModule";
const request = axios.create({})

function getApi() {
    const store = useAppModule()
    if(store.env === "development") {
        return store.debugApi
    }
    return store.api
}
export function getNodeAddresses () {
    return request({
        url: getApi() + '/addresses'
    })
}

export function getChequebookAddress () {
    return request({
        url: getApi() + '/chequebook/address'
    })
}

export function getTopology () {
    return request({
        url: getApi() + '/topology'
    })
}

export function getChequebookBalance () {
    return request({
        url: getApi() + '/chequebook/balance'
    })
}

export function getAllSettlements () {
    return request({
        url: getApi() + '/settlements'
    })
}

export function getLastCashoutAction(address) {
    return request({
        url: getApi() + '/chequebook/cashout/' + address
    })
}

export function getAllBalances() {
    return request({
        url: getApi() + '/balances'
    })
}

export function getAllPostageBatch () {
    return request({
        url: getApi() + '/stamps'
    })
}

export function depositTokens (data) {
    return request({
        url: getApi() + '/chequebook/deposit',
        method: 'post',
        params: data
    })
}

export function withdrawTokens (data) {
    return request({
        url: getApi() + '/chequebook/withdraw',
        method: 'post',
        params: data
    })
}

export function createPostageBatch (params) {
    return request({
        url: getApi() + `/stamps/${params.Amount}/${params.Depth}?label=${params.Label}`,
        method: 'POST'
    })
}
// 
export function getHealth () {
    return request({
        url: getApi() + '/health'
    })
}
// connected 
export function isConnected () {
    const store = useAppModule()
    return request({
        url: store.api + '/'
    })
}