<template>
<Page>
    <Fold label="APISettings" status>
        <div class="content">
            <h3>Hop  API</h3>
            <div>
                <el-input v-model.trim="api" placeholder="please enter" />
                <div style="margin-top: 10px;">
                    <el-button @click="saveApi" type="primary" class="mgr10">save</el-button>
                    <el-button @click="cancelApi">cancel</el-button>
                </div>
            </div>
        </div>
        <div class="content">
            <h3>Hop  Debug  API</h3>
            <div>
                <el-input v-model.trim="debugApi" placeholder="please enter" />
                <div style="margin-top: 10px;">
                    <el-button @click="saveDebugApi" type="primary" class="mgr10">save</el-button>
                    <el-button @click="cancelDebugApi">cancel</el-button>
                </div>
            </div>
        </div>
    </Fold>
    
</Page>
</template>
<script setup>
import Fold from "@/components/Fold.vue";
import { ref } from "vue";
import { useAppModule } from "@/store/appModule";
const store = useAppModule()
let api = ref(store.api)
let debugApi = ref(store.debugApi)
function cancelApi() {
    api.value = sessionStorage.getItem('api')
}
function saveApi() {
    sessionStorage.setItem('api', api.value)
}
function cancelDebugApi() {
    debugApi.value = sessionStorage.getItem('debug_api')
    store.initAppConfig({api: api.value})
}
function saveDebugApi() {
    sessionStorage.setItem('debug_api', debugApi.value)
    store.initAppConfig({debugApi: debugApi.value})
}
</script>

<style scoped lang="scss">
.content {
    box-sizing: border-box;
    padding: 10px 30px;
    margin: 4px 0px;
    background-color: white;
}
</style>
