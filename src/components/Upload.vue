
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { debounce } from "lodash";
defineProps({
  text: String
})
const emit = defineEmits(['change', 'error', 'finish', 'before-upload', 'preview', 'remove'])

onMounted(() => {
    console.log()
})

let upload = ref(null)
let directory = ref(true)
defineExpose({upload})

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
function handleError(options) {
    emit('error', options)
}
function handleFinish(options) {
    emit('finish', options)
}
let debouncebeforeUpload = debounce(beforeUpload, 300)

function beforeUpload(options) {
    emit('before-upload', options)
}
function beforePreview(options) {
    emit('preview', options)
}
function beforeRemove(options) {
    emit('remove', options)
}
let debounceHandleChange = debounce(handleChange, 300)

function handleChange(options) {
    emit('change', options)
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
