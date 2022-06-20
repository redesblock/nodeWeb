
<template>
<Page>
   <component :is="component" @changeUpload="onChange" @back="onBack" :fileList="fileLists"></component>
</Page>
</template>

<script setup>
import UploadList from "./upload-list.vue";
import UploadPreview from "./upload-preview.vue";
import { reactive, ref, computed } from "vue";

let upload = ref(null)
let fileLists = ref([])

let component = computed(() => {
    if(fileLists.value.length === 0) {
        return UploadList
    }else {
        return UploadPreview
    }
})

function onChange({file,fileList,event}) {
    console.log(file)
    console.log(fileList)
    fileLists.value = fileList
}

function onBack() {
    fileLists.value = []
}

</script>


<style scoped lang="scss">

</style>
