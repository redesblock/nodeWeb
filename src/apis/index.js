import axios from "axios";
const request = axios.create({
    baseURL:'', // api的base_url
  })

export function getAddress () {
    return request({
        url: 'http://207.148.71.27:1635/addresses'
    })
}

export function getChequebookAddress () {
    return request({
        url: 'http://207.148.71.27:1635/chequebook/address'
    })
}

export function getTopology () {
    return request({
        url: 'http://207.148.71.27:1635/topology'
    })
}

export function getBalance () {
    return request({
        url: 'http://207.148.71.27:1635/chequebook/balance'
    })
}

export function getSettlements () {
    return request({
        url: 'http://207.148.71.27:1635/settlements'
    })
}

export function getStamps () {
    return request({
        url: 'http://207.148.71.27:1635/stamps'
    })
}

export function createStamps (params) {
    return request({
        url: `http://207.148.71.27:1635/stamps/${params.Amount}/${params.Depth}?label=${params.Label}`,
        method: 'POST'
    })
}
// 
export function getHealth () {
    return request({
        url: 'http://207.148.71.27:1635/health'
    })
}