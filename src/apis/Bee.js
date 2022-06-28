// import { Bee, BeeDebug } from '@ethersphere/bee-js'
import { Bee, BeeDebug } from 'han-hop-js'

export let beeApi = new Bee(sessionStorage.getItem('api') ?? import.meta.env.VITE_BASE_API)
export let beeDebugApi = new BeeDebug(sessionStorage.getItem('debug_api') ?? import.meta.env.VITE_BASE_DEBUG_API)

export function useBeeApi({api, debugApi} ={}) {
    beeApi = new Bee(api ?? import.meta.env.VITE_BASE_API)
    beeDebugApi = new BeeDebug(debugApi ?? import.meta.env.VITE_BASE_DEBUG_API)
}