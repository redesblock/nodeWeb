import { defineStore } from 'pinia'
import { 
    getHealth, 
    getNodeAddresses, 
    getChequebookAddress,
    getTopology,
    isConnected
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
        percentageText: '',
        config: {
            api: sessionStorage.getItem('api') ?? import.meta.env.VITE_BASE_API,
            debugApi: sessionStorage.getItem('debug_api') ?? import.meta.env.VITE_BASE_DEBUG_API,
            env: import.meta.env.VITE_BASE_ENVIRONMENT || 'production'
        },
        
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
        async fetgetTopology(){
            let data = await getTopology()
            this.topology.depth = pickThreshold('depth', data.depth)
            this.topology.population = pickThreshold('population', data.population)
            this.topology.connected = pickThreshold('connected', data.connected)
            const maximumTotalScore = Object.values(this.topology).reduce((sum, item) => sum + item.maximumScore, 0)
            const actualTotalScore = Object.values(this.topology).reduce((sum, item) => sum + item.score, 0)
            this.percentageText = Math.round((actualTotalScore / maximumTotalScore) * 100) + '%'
        },
        initAppConfig({api, debugApi} = {}) {
            sessionStorage.setItem('api', api ?? import.meta.env.VITE_BASE_API)
            sessionStorage.setItem('debug_api', debugApi ?? import.meta.env.VITE_BASE_DEBUG_API)
            this.config.api = api ?? import.meta.env.VITE_BASE_API
            this.config.debugApi = debugApi ?? import.meta.env.VITE_BASE_DEBUG_API
            
            useBeeApi({api, debugApi})
        }
    }
  })