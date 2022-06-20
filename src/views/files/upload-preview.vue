<template>
  <div class="block">
      <div class="title-box" @click="goBack">
          <el-icon size="31px"><Back /></el-icon>
          <span>Upload</span>
      </div>
      <el-card shadow="never">
         <div class="file-box">
            <div class="img">
                <img style="width: 100%;" v-if="previewUri" :src="previewUri">
                <svg v-else-if="metadata.isWebsite" class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"></path></svg>
                <svg v-else-if="metadata.type === 'folder'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
            </div>
            <div>
                <p v-if="metadata.name">{{metadata?.type === 'folder' ? 'Folder Name' : 'Filename'}}: {{shortenText(metadata?.name)}}</p>
                <p>Kind: {{metadata.type}}</p>
                <p v-if="metadata.size">Size: {{getHumanReadableFileSize(metadata.size)}}</p>
                <p v-if="metadata.type === 'folder'">Folder content: {{metadata.count}}</p>
            </div>
         </div>
      </el-card>

      <div>
          <h3>You need a postage vouchers to upload.</h3>
          <el-card shadow="never">
            <el-select  
            v-model="batchID" 
            @change="selectChange"
            placeholder="Select" 
            >
                <el-option
                    v-for="item in stampList"
                    :key="item.batchID"
                    :value="item.batchID"
                    :label="item.batchID.slice(0, 8)"
                >{{item.batchID.slice(0, 8)}}</el-option>
            </el-select>

            <el-button class="mgl20" type="primary" @click="addStampHandle">
                <el-icon><Plus /></el-icon> 
                Buy Vouchers
            </el-button>
          </el-card>

          <el-card shadow="never" style="margin-top: 10px;">
            <h3>Associated postage vouchers:</h3>
            <h4>{{batchID && batchID.slice(0, 8)}}</h4>
          </el-card>
          <div class="mgt20">
              <el-button type="primary" @click="uploadFiles">       
                <el-icon><Select /></el-icon> 
                UPLOAD TO YOUR NODE
              </el-button>
              <el-button @click="goBack">
                <el-icon><CloseBold /></el-icon>
                  CANCEL
              </el-button>
          </div>
      </div>

      <Stamp 
        :stampModal="stampModal"
        @cancel="cancelHandle"
        @confirm="confirmHandle"
      ></Stamp>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import { beeApi, beeDebugApi } from "@/apis/Bee";
import { getMetadata, getHumanReadableFileSize, packageFile, detectIndexHtml, getAssetNameFromFiles } from "@/utils/file";
import Stamp from "@/components/Stamp.vue";
import { shortenText,waitUntilStampUsable  } from "@/utils/index";
import { resize,  } from "@/utils/image";
import { PREVIEW_DIMENSIONS, META_FILE_NAME, PREVIEW_FILE_NAME } from "@/utils/data";
import { getAllPostageBatch } from "@/apis/index";
import { putHistory, HISTORY_KEYS } from "@/utils/storage";
import { ElMessage } from 'element-plus'

import {
  Back,
  Plus,
  CloseBold,
  Select,
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  fileList: Array
})
const emit = defineEmits(['back', 'changeUpload'])
let metadata = ref({})
let previewUri = ref('')
let previewBlob

let uploadOrigin = { origin: 'UPLOAD' }
const router = useRouter()

function enrichStamp(postageBatch) {
  const { depth, bucketDepth, utilization } = postageBatch

  const usage = utilization / Math.pow(2, depth - bucketDepth)
  const usageText = `${Math.ceil(usage * 100)}%`
  const capacity = `${getHumanReadableFileSize(2 ** depth * 4096 * usage)} / ${getHumanReadableFileSize(2 ** depth * 4096)}`
  return {
    ...postageBatch,
    usage,
    usageText,
    capacity
  }
}
let stampList = ref([])
let batchID = ref(null)
let stamp = ref({})
let stampModal = ref(false)
function addStampHandle() {
  stampModal.value = true
}
function cancelHandle() {
  stampModal.value = false
}
function confirmHandle(val) {
  console.log(val)
  stampModal.value = false
  batchID.value = val
  fetchGetStamps()
}

function selectChange(item) {
    stamp.value = stampList.value.find(stamp => stamp.batchID == item)
    console.log(stamp)

}
function fetchGetStamps() {
  getAllPostageBatch().then(data => {
    stampList.value = data.map(enrichStamp)
  })
  
}

onMounted(() => {
    fetchGetStamps()
    let files = props.fileList.map(item => item.file)
    metadata.value = getMetadata(files)

    if (files.length !== 1 || !files[0].type.startsWith('image')) return

    resize(files[0], PREVIEW_DIMENSIONS.maxWidth, PREVIEW_DIMENSIONS.maxHeight).then(blob => {
      console.log(blob)
      previewUri.value = URL.createObjectURL(blob) // NOTE: Until it is cleared with URL.revokeObjectURL, the file stays allocated in memory
      previewBlob = blob
    })
})

async function uploadFiles() {
    const files = props.fileList.map(item =>item.file)
    let fls = files.map(f => packageFile(f)) // Apart from packaging, this is needed to not modify the original files array as it can trigger effects
    let indexDocument = undefined // This means we assume it's folder

    if (files.length === 1) indexDocument = files[0].name
    else if (files.length > 1) {
      const idx = detectIndexHtml(files)

      // This is a website
      if (idx) {
        // The website is in some directory, remove it
        if (idx.commonPrefix) {
          const substrStart = idx.commonPrefix.length
          indexDocument = idx.indexPath.slice(substrStart)
          fls = files.map(f => {
            const path = (f.path).slice(substrStart)

            return packageFile(f, path)
          })
        } else {
          // The website is not packed in a directory
          indexDocument = idx.indexPath
        }
      }
    }
    const lastModified = files[0].lastModified

    // We want to store only some metadata
    const mtd = {
      name: metadata.value.name,
      size: metadata.value.size,
    }
    console.log(mtd)
    // Type of the file only makes sense for a single file
    if (files.length === 1) mtd.type = metadata.value.type

    const metafile = new File([JSON.stringify(mtd)], META_FILE_NAME, {
      type: 'application/json',
      lastModified,
    })
    fls.push(packageFile(metafile))

    console.log(previewBlob)

    if (previewBlob) {
      const previewFile = new File([previewBlob], PREVIEW_FILE_NAME, {
        type: 'image/jpeg',
        lastModified,
      })
      fls.push(packageFile(previewFile))
    }

    if (beeDebugApi) {
      await waitUntilStampUsable(stamp.value.batchID, beeDebugApi)
    }

    console.log(fls)
    console.log(indexDocument)

    beeApi
      .uploadFiles(stamp.value.batchID, fls, { indexDocument })
      .then(hash => {
        console.log(hash)
        putHistory(HISTORY_KEYS.UPLOAD_HISTORY, hash.reference, getAssetNameFromFiles(files))
        if (uploadOrigin.origin === 'UPLOAD') {
            router.push({
                path: '/files/upload/' + hash.reference,
            })
        }
      })
      .catch(e => {
        ElMessage({
            message: `Error uploading: ${e.message}`,
            type: 'error'
        })
      })
    

}

function goBack() {
    emit('back')
}
</script>

<style scoped lang="scss">
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
</style>
