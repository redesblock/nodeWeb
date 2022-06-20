<template>
  <Page>
    <div class="block">
        <el-card shadow="never">
          <div class="file-box">
              <div class="img">
                  <img style="width: 100%;" v-if="previewUri" :src="previewUri">
                  <svg v-else-if="metadata.isWebsite" class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"></path></svg>
                  <svg v-else-if="metadata.type === 'folder'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
              </div>
              <div>
                  <p v-if="metadata.hash">Swarm Hash: {{shortenHash(metadata.hash)}}</p>
                  <p v-if="metadata.name">{{metadata?.type === 'folder' ? 'Folder Name' : 'Filename'}}: {{shortenText(metadata?.name)}}</p>
                  <p>Kind: {{metadata.type}}</p>
                  <p v-if="metadata.size">Size: {{getHumanReadableFileSize(metadata.size)}}</p>
                  <p v-if="metadata.type === 'folder'">Folder content: {{metadata.count}}</p>
              </div>
          </div>
        </el-card>

        <div>
            <el-card shadow="never" style="margin-top: 10px;">
              <Encipherment line title="Hop Hash：" :str="metadata.hash"></Encipherment>
            </el-card>
            <div class="list">
              <Encipherment share title="Share on Hop Gateway" :str="'https://gateway.ethswarm.org/access/'+metadata.hash"></Encipherment>
            </div>

            <div class="mgt20">
                <el-button type="primary" @click="download">       
                  <el-icon><Download /></el-icon> 
                  WODNLOAD
                </el-button>
                <el-button @click="goBack">
                  <el-icon><CloseBold /></el-icon>
                    Close
                </el-button>
            </div>
        </div>

    </div>
  </Page>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import { beeApi, beeDebugApi } from "@/apis/Bee";
import { getMetadata, getHumanReadableFileSize, packageFile, detectIndexHtml, getAssetNameFromFiles } from "@/utils/file";
import Encipherment from "@/components/Encipherment.vue";
import { shortenText  } from "@/utils/index";
import { config, META_FILE_NAME, PREVIEW_FILE_NAME } from "@/utils/data";
import { putHistory, HISTORY_KEYS, shortenHash, determineHistoryName } from "@/utils/storage";
import { ElMessage } from 'element-plus'
import { ManifestJs } from '@ethersphere/manifest-js'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { useAppModule } from "@/store/appModule";

import {
  CloseBold,
  Download
} from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const store = useAppModule()

const emit = defineEmits(['back', 'changeUpload'])
let metadata = ref({
  hash: ''
})
let previewUri = ref('')
let swarmEntries = ref({})

let uploadOrigin = { origin: 'UPLOAD' }

async function getDetail(reference) {
  const manifestJs = new ManifestJs(beeApi)
  const isManifest = await manifestJs.isManifest(reference)

  if (!isManifest) {
    ElMessage({
      message: 'The specified hash does not contain valid content.',
      type: 'error'
    })
    return
  }

  const entries = await manifestJs.getHashes(reference)
  const indexDocument = await manifestJs.getIndexDocumentPath(reference)
  console.log(indexDocument)

  const previewFile = entries[PREVIEW_FILE_NAME]

  delete entries[META_FILE_NAME]
  delete entries[PREVIEW_FILE_NAME]
  swarmEntries.value = entries

  const count = Object.keys(entries).length

  metadata.value ={
    hash: reference,
    size: 0,
    type: count > 1 ? 'folder' : 'unknown',
    name: reference,
    isWebsite: Boolean(indexDocument) && count > 1,
    count,
    indexDocument
  }

  try {
    const mtdt = await beeApi.downloadFile(reference, META_FILE_NAME)
    const remoteMetadata = mtdt.data.text()
    metadata.value = { ...metadata.value, ...(JSON.parse(remoteMetadata)) }
  } catch (e) {} // eslint-disable-line no-empty

  if (previewFile) {
    previewUri.value = (`${config.BEE_API_HOST}/bzz/${reference}/${PREVIEW_FILE_NAME}`)
  }
  
  console.log(metadata.value)

}

onMounted(() => {
  getDetail(route.params.hash)
  // console.log(route.params.hash)
})


async function download() {
  if (!beeApi) {
    return
  }
  const {hash: reference, indexDocument} = metadata.value
  putHistory(HISTORY_KEYS.DOWNLOAD_HISTORY, reference, determineHistoryName(reference, indexDocument))
  if (Object.keys(swarmEntries.value).length === 1) {
    window.open(`${store.api}/bzz/${reference}/`, '_blank')
  } else {
    const zip = new JSZip()
    for (const [path, hash] of Object.entries(swarmEntries.value)) {
      zip.file(path, await beeApi.downloadData(hash))
    }
    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, reference + '.zip')
  }
}
function goBack() {
    router.push({
      path: '/files/upload'
    })
}
</script>

<style scoped lang="scss">
@mixin baseStyle() {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 10px;
  height: 70px;
  align-items: center;
  background-color: white;
}
.block {
    box-sizing: border-box;
    // padding: 24px 21px 0 20px;
    margin: 16px 0;
    border-radius: 8px;
}
.title-box {
  font-weight: 600;
  font-size: 20px; 
  color: #6E4DFE;
  margin-bottom: 20px;
  cursor: pointer;
  &>span{
      padding-left: 15px;
      display: inline-block;
      vertical-align: top;
  }
}
.file-box {
    display: flex;
}
.img {
    display: flex;
    width: 160px;
    height: 160px;
    margin-right: 15px;
    background: repeating-linear-gradient( 45deg, #efefef, #efefef 4px, #ffffff 4px, #ffffff 8px );
    align-items: center;
    justify-content: center;
}
h3 {
    margin: 5px 0;
}
.list {
  @include baseStyle()
}
</style>
