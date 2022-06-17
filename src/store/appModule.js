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
        }
     }
    },
    getters: {
        version: (state) => semver.coerce(state.app.version).version,
    },
    actions: {
        async getAppInfo() {
            let res = await getHealth()
            if(res.status == 200) {
                this.app = res.data
            }
        }
    }
  })