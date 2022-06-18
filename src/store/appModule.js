import { defineStore } from 'pinia'
import { getHealth, getAddress, getChequebookAddress,getTopology } from "@/apis/index";
import { pickThreshold } from "@/utils/data";

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
        address: {
            overlay: '',
            underlay: [],
            ethereum: null,
            publicKey: null,
            pssPublicKey: null,
        },
        chequebookAddress: null,
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
        }
     }
    },
    getters: {
        version: (state) => semver.coerce(state.app.version).version,
        latestVersion: (state) => state.app.latestVersion,
        api: (state) => state.config.api,
        debugApi: (state) => state.config.debugApi,
        env: (state) => state.config.env,
    },
    actions: {
        async getAppInfo() {
            let res = await getHealth()
            if(res.status == 200) {
                this.app = res.data
            }
        },
        async getAppAddress() {
            let res = await getAddress()
            if(res.status == 200) {
                this.address = res.data
            }
        },
        async getAppChequebookAddress() {
            let res = await getChequebookAddress()
            if(res.status == 200) {
                this.chequebookAddress = res.data.chequebookAddress
            }
        },
        async fetgetTopology(){
            let res = await getTopology()
            if(res.status == 200) {
                this.topology.depth = pickThreshold('depth', res.data.depth)
                this.topology.population = pickThreshold('population', res.data.population)
                this.topology.connected = pickThreshold('connected', res.data.connected)
                const maximumTotalScore = Object.values(this.topology).reduce((sum, item) => sum + item.maximumScore, 0)
                const actualTotalScore = Object.values(this.topology).reduce((sum, item) => sum + item.score, 0)
                this.percentageText = Math.round((actualTotalScore / maximumTotalScore) * 100) + '%'
            }
        },
        initAppConfig({api, debugApi} = {}) {
            sessionStorage.setItem('api', api ?? import.meta.env.VITE_BASE_API)
            sessionStorage.setItem('debug_api', debugApi ?? import.meta.env.VITE_BASE_DEBUG_API)
        }
    }
  })