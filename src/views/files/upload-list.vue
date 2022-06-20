
<template>
    <el-card shadow="never" class="card">
        <Upload
        ref="upload"
        @change="onChange"></Upload>
    </el-card>
    <Block title="pload History">
      <PTable
      border
      :columns="columns" 
      :dataList="dataList"
      :pageOptions="pageOptions">
        <template #hash="scope">{{scope.row.hash}}</template>
        <template #createdAt="scope">{{getPrettyDateString(new Date(scope.row.createdAt))}}</template>

      </PTable>
    </Block>
</template>

<script setup>
import PTable from "@/components/PTable.vue";
import Upload from "@/components/Upload.vue";
import { getPrettyDateString } from "@/utils/index";
import { reactive, ref, onMounted } from "vue";
const emit = defineEmits(['changeUpload','back'])
defineProps({
  fileList: Array
})

let upload = ref(null)
let fileLists = ref([])
let dataList = reactive({
    list: [],
    total: 0,
})


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

function onChange({file,fileList,event}) {
    console.log(file)
    console.log(fileList)
    fileLists.value = fileList
    upload.value.upload.clear()
    emit('changeUpload', {file,fileList,event})
}

onMounted(() => {
   let str = localStorage.getItem('UPLOAD_HISTORY')
   if(str) {
       dataList.list = JSON.parse(str) || []
       dataList.total = dataList.list.length || 0
   }
})
</script>


<style scoped lang="scss">
.card {
    padding-bottom: 10px;
}
</style>
