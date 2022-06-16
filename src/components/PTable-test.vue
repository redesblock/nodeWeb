
<template>
<el-card shadow="never" class="actions">
    <el-button> + ADD FILE </el-button>
    <el-button> + ADD FOLDER</el-button>
</el-card>
<Block title="pload History">
    <!-- <el-table border :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Batch ID"  />
        <el-table-column prop="name" label="Stamp Depth"/>
        <el-table-column prop="address" label="Capacity" />
        <el-table-column prop="address" label="Amount" />
    </el-table>
<Pagination
:pageOptions="pageOptions"
@onPageChange="onPageChange"
>

</Pagination> -->
<PTable
:columns="columns" 
:dataList="dataList"
:pageOptions="pageOptions">
     <template #expand="{row}">
     <div>
         <p>{{row}}</p>
         <p>{{row.name}}</p>
         <p>{{row.age}}</p>
         <p>{{row.address}}</p>
     </div>
     </template>
     <template #name="scope">{{scope.row}}</template>
     <!-- <template #age="scope">{{scope.row}}</template> -->
     <template #address="scope">{{scope.row}}</template>
</PTable>
</Block>
</template>

<script setup>
import Block  from "@/components/Block.vue";
import Pagination from "@/components/pagination.vue";
import PTable from "@/components/PTable.vue";
import { reactive, ref } from "vue";

let dataList = reactive({
    list: [{age:11, name: '效果',address: '手机话费还款时间'},{age:12, name: '效果',address: '手机话费还款时间'},{age:13, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'},{age:11, name: '效果',address: '手机话费还款时间'}],
    total: 0,
})
dataList.total = dataList.list.length
let columns = reactive([{
    type: 'selection',
    label: '选择',
},{
  type: 'expand',
  label: '扩展',  
  prop: 'expand',
},{
  type: 'index',
  label: '序号',  
},{
    prop: 'name',
    label: '姓名',
},{
    prop: 'age',
    label: '年龄',
},{
    fixed: 'right',
    prop:'address',
    label: '地址'
}])
const currentPage4 = ref(4)
const pageSize4 = ref(100)
let pageOptions = reactive({
    pageNum: 1,
    pageSize: 10
})

const onPageChange = (page) => {
  console.log(page)
  pageOptions = page
}
const handleSelectionChange = (page) => {
    console.log(page)
}

const tableRowClassName = ({
  row,
  rowIndex,
}) => {
    console.log(rowIndex)
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}

</script>


<style scoped lang="scss">
.actions {
    text-align: center;
    margin: 0 20px;
}
:deep(.el-table .warning-row ){
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
:deep(.el-table .success-row) {
  background-color: var(--el-color-success-light-9);
}
</style>
