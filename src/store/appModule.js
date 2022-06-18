import { defineStore } from 'pinia'
import { getHealth } from "@/apis/index";
import semver from "semver";
export const useAppModule = defineStore('appModule', {
    state: () => {
     return {
        app: {
            apiVersion: '',
            debugApiVersion: '',
            status: '',
            version: '',
        },
        config: {
            api: sessionStorage.getItem('api') ?? import.meta.env.VITE_BASE_API,
            debugApi: sessionStorage.getItem('debug_api') ?? import.meta.env.VITE_BASE_DEBUG_API,
            env: import.meta.env.VITE_BASE_ENVIRONMENT || 'production'
        }
     }
    },
    getters: {
        version: (state) => semver.coerce(state.app.version).version,
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
        initAppConfig({api, debugApi} = {}) {
            sessionStorage.setItem('api', api ?? import.meta.env.VITE_BASE_API)
            sessionStorage.setItem('debug_api', debugApi ?? import.meta.env.VITE_BASE_DEBUG_API)
        }
    }
  })