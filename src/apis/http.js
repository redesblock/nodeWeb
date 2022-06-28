import axios from "axios";
import { useAppModule } from "@/store/appModule";
const request = axios.create({})

function getApi() {
    const store = useAppModule()
    return store
}
export function getAddresseAmount () {
    return request({
        url: getApi().debugApi + '/node/balance'
    })
}
export function getChequebookAmount () {
    return request({
        url: getApi().debugApi + '/chequebook/transactions'
    })
}


export function getPledge () {
    return request({
        url: getApi().debugApi + '/pledge/balance'
    })
}
export function getPledgeTransations () {
    return request({
        url: getApi().debugApi + '/pledge/transactions'
    })
}

export function postPledgeStake (data) {
    return request({
        method: 'post',
        url: getApi().debugApi + '/pledge/stake/'+ data.amount
    })
}

export function postPledgeUnstake (data) {
    return request({
        method: 'post',
        url: getApi().debugApi + '/pledge/unstake/'+ data.amount
    })
}

/**
 * 
 * @param {*} account 
 * @returns 
 */
export function postRewardCash (data) {
    console.log(data)
    return request({
        method: 'post',
        url: getApi().debugApi + '/reward/cash/' + data.amount
    })
}

export function getReward () {
    return request({
        url: getApi().debugApi + '/reward/balance'
    })
}

export function getRewardTransation () {
    return request({
        url: getApi().debugApi + '/reward/transactions'
    })
}
