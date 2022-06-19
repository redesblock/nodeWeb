
<template>
    <n-upload
        ref="upload"
        multiple
        :default-upload="false"
        :directory="directory"
        @change="debounceHandleChange"
        @error="handleError"
        @finish="handleFinish"
        @before-upload="debouncebeforeUpload"
        @preview="beforePreview"
        @remove="beforeRemove"
        :max="1e9"
        :show-file-list="false"
    >
        <n-upload-dragger>
            <el-button type="primary" @click="uploadFile">+ ADD FILE</el-button>
            <el-button type="primary" @click="uploadFolder">+ ADD FOLDER</el-button>

            <h3 class="tips">You can click the buttons above or simply drag and drop to add a file or folder.</h3>
        </n-upload-dragger>
    </n-upload>
    <div class="preview">

    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { debounce } from "lodash";
defineProps({
  text: String
})

onMounted(() => {
    console.log()
})
let upload = ref(null)
let fileList = ref([])
let directory = ref(true)
function uploadFile() {
    directory.value = false
    window.addEventListener(
      'focus',
      () => {
        setTimeout(() => {
            directory.value = true
        }, 100)
      },
      { once: true }
    )
}

function uploadFolder() {
    directory.value = true
}
function handleError(uploadFile) {
    console.log('handleError')
    console.log(uploadFile)
}
function handleFinish(uploadFile) {
    console.log('handleFinish')

    console.log(uploadFile)
    
}
let debouncebeforeUpload = debounce(beforeUpload, 300)

function beforeUpload(uploadFile) {
    console.log('beforeUpload')

    console.log(uploadFile)
    
}
function beforePreview(uploadFile) {
    console.log('beforePreview')

    console.log(uploadFile)
}
function beforeRemove(uploadFile) {
    console.log('beforeRemove')
    console.log(uploadFile)
    
}
let debounceHandleChange = debounce(handleChange, 300)

function handleChange(uploadFile, fileList, event) {
    console.log('handleChange')

    console.log(uploadFile)
    console.log(fileList)
    console.log(event)
    
}

</script>


<style scoped lang="scss">
:deep(.n-upload-dragger) {
    position: relative;
    padding: 64px;
}
.tips {
    position: absolute;
    left: 5px;
    bottom: -44px;
    color: #606060;
}
</style>
