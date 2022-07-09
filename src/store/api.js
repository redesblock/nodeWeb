import { ref } from "vue";
import { useAppModule } from "@/store/appModule";

export function useApiConfig() {
    const store = useAppModule()
    let api = ref(store.api)
    let debugApi = ref(store.debugApi)
    function cancelApi() {
        api.value = sessionStorage.getItem('api')
    }
    function saveApi() {
        sessionStorage.setItem('api', api.value)
        store.initAppConfig({api: api.value})
        store.getAppConnected()
        store.getAppHealth()
    }
    function cancelDebugApi() {
        debugApi.value = sessionStorage.getItem('debug_api')
    }
    function saveDebugApi() {
        sessionStorage.setItem('debug_api', debugApi.value)
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