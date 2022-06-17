
<template>
<Page>
    <el-card shadow="never" class="actions">
        <span> HOP FILE HASH</span>
        <el-input style="width:400px" v-model="input"></el-input>
        <div style="display: inline-block;" class="mgl20">
        <el-button> + ADD FILE </el-button>
        <el-button> + ADD FOLDER</el-button>
        </div>
    </el-card>
    <Block title="Download History">
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
import PTable  from "@/components/PTable.vue";
import { reactive, ref } from "vue";
let input = ref(null)
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
    label: 'Download Time',
    align: 'center',
}])

let pageOptions = reactive({
    pageNum: 1,
    pageSize: 10
})
</script>


<style scoped lang="scss">

</style>
