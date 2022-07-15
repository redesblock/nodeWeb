import { ref } from "vue";
import { useAppModule } from "@/store/appModule";

export function useApiConfig() {
    const store = useAppModule()
    let api = ref(store.api)
    let debugApi = ref(store.debugApi)
    function cancelApi() {
        api.value = localStorage.getItem('api')
    }
    function saveApi() {
        localStorage.setItem('api', api.value)
        store.initAppConfig({api: api.value})
        store.getAppConnected()
        store.getAppHealth()
    }
    function cancelDebugApi() {
        debugApi.value = localStorage.getItem('debug_api')
    }
    function saveDebugApi() {
        localStorage.setItem('debug_api', debugApi.value)
        store.initAppConfig({debugApi: debugApi.value})
        store.getAppConnected()
        store.getAppHealth()
    }
    return {
        api,
        debugApi,
        cancelApi,
        saveApi,
        cancelDebugApi,
        saveDebugApi
    }
}