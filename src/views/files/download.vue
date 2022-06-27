
<template>
<Page>
    <el-card shadow="never" class="actions">
        <span> HOP FILE HASH</span>
        <el-input clearable style="width: calc(100% - 400px); margin-left: 18px;" placeholder="place input file hash" v-model.trim="input"></el-input>
        <div style="display: inline-block;" class="mgl20">
        <el-button type="primary" @click="downloadHandle"> 
             <el-icon style="font-size:15px ;"><Search /></el-icon>
             SEARCH</el-button>
        <el-button @click="cancelHandle"> 
            <el-icon style="font-size:15px ;"><Close /></el-icon>
             CANCEL</el-button>
        </div>
    </el-card>
    <Block title="Download History">
        <PTable
        border
        :columns="columns" 
        :dataList="dataList"
        :pageOptions="pageOptions">
            <template #hash="scope">{{scope.row.hash}}</template>
            <template #createdAt="scope">{{getPrettyDateString(new Date(scope.row.createdAt))}}</template>
        </PTable>
    </Block>
</Page>
</template>

<script setup>
import PTable  from "@/components/PTable.vue";
import { Search, Close } from "@element-plus/icons-vue";
import { reactive, ref, onMounted } from "vue";
import { getPrettyDateString, recognizeEnsOrSwarmHash } from "@/utils/index";
import { ManifestJs } from '@ethersphere/manifest-js'
import { putHistory,HISTORY_KEYS,determineHistoryName } from "@/utils/storage";
import { ElMessage } from 'element-plus'
import { beeApi } from "@/apis/Bee";
import { useRouter } from 'vue-router'

const router = useRouter()

let input = ref(null)
let dataList = reactive({
    list: [],
    total: 0,
})
dataList.total = dataList.list.length
let columns = reactive([{
  type: 'index',
  label: 'Number',  
  width: '120',
  align: 'center',
},{
    prop: 'name',
    label: 'File Name',
    align: 'center',
    width: '300',
},{
    prop: 'hash',
    label: 'File Hash',
    align: 'center',
},{
    prop:'createdAt',
    label: 'Upload Time',
    align: 'center',
    width: '240',
}])

let pageOptions = reactive({
    pageNum: 1,
    pageSize: 10
})

async function downloadHandle() {
    try {
        let identifier = recognizeEnsOrSwarmHash(input.value)
        const manifestJs = new ManifestJs(beeApi)
        const feedIdentifier = await manifestJs.resolveFeedManifest(identifier)

        if (feedIdentifier) {
        identifier = feedIdentifier
        }
        const isManifest = await manifestJs.isManifest(identifier)

        if (!isManifest) {
            throw Error('The specified hash does not contain valid content.')
        }
        const indexDocument = await manifestJs.getIndexDocumentPath(identifier)
        putHistory(HISTORY_KEYS.DOWNLOAD_HISTORY, identifier, determineHistoryName(identifier, indexDocument))
        router.push({
            path: '/files/upload/' + identifier,
        })
    } catch (error) {
        let message = typeof error === 'object' && error !== null && Reflect.get(error, 'message')

        if (message.includes('path address not found')) {
            message = 'The specified hash does not have an index document set.'
        }

        if (message.includes('Not Found: Not Found')) {
            message = 'The specified hash was not found.'
        }
        ElMessage({
            message: `Error: ${message || 'Unknown'}`,
            type: 'error'
        })
    }
}
function cancelHandle() {
    input.value = ''
}
onMounted(() => {
   let str = localStorage.getItem('DOWNLOAD_HISTORY')
   if(str) {
       dataList.list = JSON.parse(str) || []
       dataList.total = dataList.list.length || 0
   }
})
</script>


<style scoped lang="scss">

</style>
