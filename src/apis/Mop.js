import { Mop, MopDebug } from '@redesblock/mop.js'

export let mopApi = new Mop(localStorage.getItem('api') ?? import.meta.env.VITE_BASE_API)
export let mopDebugApi = new MopDebug(localStorage.getItem('debug_api') ?? import.meta.env.VITE_BASE_DEBUG_API)

export function useMopApi({api, debugApi} ={}) {
    let s_api = localStorage.getItem('api')
    let s_debug_api = localStorage.getItem('debug_api')
    mopApi = new Mop(api ?? s_api ?? import.meta.env.VITE_BASE_API)
    mopDebugApi = new MopDebug(debugApi ?? s_debug_api ?? import.meta.env.VITE_BASE_DEBUG_API)
}