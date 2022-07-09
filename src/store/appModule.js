import { defineStore } from 'pinia'
import { 
    getHealth, 
    getNodeAddresses, 
    getChequebookAddress,
    getTopology,
    isConnected,
    getChainState
 } from "@/apis/index";
import { pickThreshold } from "@/utils/data";
import { useBeeApi } from "@/apis/Bee";
import semver from "semver";
export const useAppModule = defineStore('appModule', {
    state: () => {
     return {
        app: {
            apiVersion: '',
            debugApiVersion: '',
            status: '',
            version: '',
            latestVersion: '',
        },
        apiHealth: false,
        address: {
            overlay: '',
            underlay: [],
            ethereum: '',
            publicKey: '',
            pssPublicKey: '',
        },
        chequebookAddress: '',
        topology: {
            depth: {},
            population: {},
            connected: {},
        },
        topology_data: {
            depth: 0,
            population: 0,
            connected: 0,
        },
        percentageText: '',
        config: {
            api: sessionStorage.getItem('api') ?? import.meta.env.VITE_BASE_API,
            debugApi: sessionStorage.getItem('debug_api') ?? import.meta.env.VITE_BASE_DEBUG_API,
            env: import.meta.env.VITE_BASE_ENVIRONMENT || 'production'
        },
        chainState: {
            block: null,
            chainTip: null,
            currentPrice: "",
            totalAmount: "",
        }
        
     }
    },
    getters: {
        version: (state) => semver.coerce(state.app.version)?.version,
        latestVersion: (state) => state.app.latestVersion,
        status: (state) => state.app.status,
        api: (state) => state.config.api,
        debugApi: (state) => state.config.debugApi,
        env: (state) => state.config.env,
    },
    actions: {
        getAppConnected() {
            isConnected().then(res => {
                this.apiHealth = res
            }).catch(err => {
                this.apiHealth = false
            })
            
        },
        getAppHealth() {
            getHealth().then(data => {
                this.app = data
            }).catch(err => {
                this.app.status = 'error'
            })
            
        },
        async getAppAddress() {
            let data = await getNodeAddresses()
            this.address = data
        },
        async getAppChequebookAddress() {
            let data = await getChequebookAddress()
            this.chequebookAddress = data.chequebookAddress
        },
        async fetchChainState() {
            let data = await getChainState()
            this.chainState.block = data.block
            this.chainState.chainTip = data.chainTip
            this.chainState.currentPrice = data.currentPrice
            this.chainState.totalAmount = data.totalAmount
        },
        async fetgetTopology(){
            let data = await getTopology()
            console.log(data)
            this.topology.depth = pickThreshold('depth', data.depth)
            this.topology.population = pickThreshold('population', data.population)
            this.topology.connected = pickThreshold('connected', data.connected)
            const maximumTotalScore = Object.values(this.topology).reduce((sum, item) => sum + item.maximumScore, 0)
            const actualTotalScore = Object.values(this.topology).reduce((sum, item) => sum + item.score, 0)
            this.percentageText = Math.round((actualTotalScore / maximumTotalScore) * 100) + '%'
            this.topology_data.depth = data.depth
            this.topology_data.population = data.population
            this.topology_data.connected = data.connected
        },
        initAppConfig({api, debugApi} = {}) {
            console.log(api)
            console.log(debugApi)
            let s_api = sessionStorage.getItem('api')
            let s_debug_api = sessionStorage.getItem('debug_api')
            sessionStorage.setItem('api', api ?? s_api ?? import.meta.env.VITE_BASE_API)
            sessionStorage.setItem('debug_api', debugApi ?? s_debug_api ?? import.meta.env.VITE_BASE_DEBUG_API)
            this.config.api = api ?? s_api ?? import.meta.env.VITE_BASE_API
            this.config.debugApi = debugApi ?? s_debug_api ?? import.meta.env.VITE_BASE_DEBUG_API
            
            useBeeApi({api, debugApi})
        }
    }
  })