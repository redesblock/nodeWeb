
<template>
<el-card shadow="never" class="actions">
    <el-button> + ADD FILE </el-button>
    <el-button> + ADD FOLDER</el-button>
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
import Block  from "@/components/Block.vue";
import PTable from "@/components/PTable.vue";
import { reactive } from "vue";

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

</script>


<style scoped lang="scss">
.actions {
    text-align: center;
    margin: 0 20px;
}
</style>
