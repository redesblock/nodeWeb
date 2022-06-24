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
        url: getApi().debugApi + '/chequebook/balance'
    })
}
export function getReward () {
    return request({
        url: getApi().debugApi + '/node/storage'
    })
}
export function getRewardTransation () {
    return request({
        url: getApi().debugApi + '/node/storage/transaction'
    })
}
export function getPledge () {
    return request({
        url: getApi().debugApi + '/node/pledge'
    })
}
export function getPledgeTransations () {
    return request({
        url: getApi().debugApi + '/node/pledge/transaction'
    })
}
