
<template>
<Page>
    <el-card shadow="never" class="card">
        <Upload text="+ ADD FILE"></Upload>
    </el-card>
    <Block title="pload History">
    <PTable
    border
    :columns="columns" 
    :dataList="dataList"
    :pageOptions="pageOptions">
    </PTable>
    </Block>
</Page>
</template>

<script setup>
import PTable from "@/components/PTable.vue";
import Upload from "@/components/Upload.vue";
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
.card {
    padding-bottom: 10px;
}
</style>
