// import { Bee, BeeDebug } from '@ethersphere/bee-js'
import { Bee, BeeDebug } from 'han-hop-js'

export let beeApi = new Bee(localStorage.getItem('api') ?? import.meta.env.VITE_BASE_API)
export let beeDebugApi = new BeeDebug(localStorage.getItem('debug_api') ?? import.meta.env.VITE_BASE_DEBUG_API)

export function useBeeApi({api, debugApi} ={}) {
    let s_api = localStorage.getItem('api')
    let s_debug_api = localStorage.getItem('debug_api')
    beeApi = new Bee(api ?? s_api ?? import.meta.env.VITE_BASE_API)
    beeDebugApi = new BeeDebug(debugApi ?? s_debug_api ?? import.meta.env.VITE_BASE_DEBUG_API)
}