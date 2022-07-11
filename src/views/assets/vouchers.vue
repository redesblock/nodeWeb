<template>
  <Page>
    <Block title="Voucher">
      <template #button>
        <el-button type="primary" class="right mgb20" @click="addStampHandle"> 
        +
        Buy Voucher
       </el-button>
      </template>
      <el-table border :data="dataList.list" style="width: 100%">
        <el-table-column prop="label" label="Label" width="150"/>
        <el-table-column prop="batchID" label="ID">
          <template #default="scope">
            <div style="height: 50px;"><Encipherment title="ID" :str="scope.row.batchID"></Encipherment></div>
          </template>
        </el-table-column>
        <el-table-column prop="capacity" label="Capacity" width="260"/>
        <el-table-column prop="amount" label="TTL" width="180" />
        <el-table-column prop="blockNumber" label="Block" width="200" />
      </el-table>
    </Block>
  </Page>
  <Stamp 
  :stampModal="stampModal"
  @cancel="cancelHandle"
  @confirm="confirmHandle"
  ></Stamp>
</template>

<script setup>
import Stamp from "@/components/Stamp.vue";
import { getAllPostageBatch } from "@/apis/index";
import { getHumanReadableFileSize } from "@/utils/file";
import Encipherment from "@/components/Encipherment.vue";
import {
  Plus,
} from '@element-plus/icons-vue'
import { ref, onMounted, reactive } from "vue";
let stampModal = ref(false)
function addStampHandle() {
  stampModal.value = true
}
function cancelHandle() {
  stampModal.value = false
}
function confirmHandle() {
  stampModal.value = false
  fetchGetStamps()
}
let dataList = reactive({
  list: [],
  total: 0
})

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

function fetchGetStamps() {
  getAllPostageBatch().then(data => {
    dataList.list = data.map(enrichStamp)
    dataList.total = dataList.list.length
  })
  
}

onMounted(() => {
  fetchGetStamps()
})

</script>

<style scoped lang="scss">

</style>
