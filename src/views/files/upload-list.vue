
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
      </PTable>
    </Block>
</template>

<script setup>
import PTable from "@/components/PTable.vue";
import Upload from "@/components/Upload.vue";
import { reactive, ref } from "vue";
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
},{
    prop: 'age',
    label: 'File Hash',
    align: 'center',
},{
    prop:'address',
    label: 'Upload Time',
    align: 'center',
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

</script>


<style scoped lang="scss">
.card {
    padding-bottom: 10px;
}
</style>
