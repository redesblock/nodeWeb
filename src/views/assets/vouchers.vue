<template>
  <Page>
    <Block title="Vouchers">
      <el-button type="primary" class="right mgb20" @click="addStampHandle"> 
        <el-icon><Plus /></el-icon> 
        Buy Vouchers
      </el-button>
      <el-table border :data="dataList.list" style="width: 100%">
        <el-table-column prop="batchID" label="Voucher ID">
          <template #default="scope">
            <Encipherment title="Voucher ID" :str="scope.row.batchID"></Encipherment>
          </template>
        </el-table-column>
        <el-table-column prop="capacity" label="Vouchers Capacity" width="220"/>
        <el-table-column prop="amount" label="Vouchers TTL" width="160" />
        <el-table-column prop="blockNumber" label="Voucher Block" width="160" />
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
import { getStamps } from "@/apis/index";
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

async function fetchGetStamps() {
  let res = await getStamps()
  if(res.status == 200 ){
    dataList.list = res.data.stamps.map(enrichStamp)
    dataList.total = dataList.list.length
  }
}

onMounted(() => {
  fetchGetStamps()
})

</script>

<style scoped lang="scss">

</style>
