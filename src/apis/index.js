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
export function getAddress () {
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

export function getBalance () {
    return request({
        url: getApi() + '/chequebook/balance'
    })
}

export function getSettlements () {
    return request({
        url: getApi() + '/settlements'
    })
}

export function getChequebookCashout(address) {
    return request({
        url: getApi() + '/chequebook/cashout/' + address
    })
}

export function getBalances() {
    return request({
        url: getApi() + '/balances'
    })
}

export function getStamps () {
    return request({
        url: getApi() + '/stamps'
    })
}

export function postDeposit (data) {
    return request({
        url: getApi() + '/chequebook/deposit',
        method: 'post',
        params: data
    })
}

export function postWithdraw (data) {
    return request({
        url: getApi() + '/chequebook/withdraw',
        method: 'post',
        params: data
    })
}

export function createStamps (params) {
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
export function getConnected () {
    const store = useAppModule()
    return request({
        url: store.api + '/'
    })
}