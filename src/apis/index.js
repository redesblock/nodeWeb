import axios from "axios";
const request = axios.create({
    baseURL:'', // api的base_url
    timeout: 15000 // 请求超时时间
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
// 
export function getHealth () {
    return request({
        url: 'http://207.148.71.27:1635/health'
    })
}