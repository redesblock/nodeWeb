<template>
  <Page>
    <Block title="Pledge">
      <div style="text-align: right;" class="mgb20">
        <el-button type="primary" @click="showPledgeHandle">PLEDGE </el-button>
        <el-button type="primary" @click="showReplaceHandle">REPLACE</el-button>
      </div>
      <el-row>
        <el-col :span="11">
          <el-card shadow="never">
            <span>Total Balance</span>
            <h3>{{pledges.cashBalance.toFixedDecimal()}}  Hop</h3>
          </el-card>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-card shadow="never">
            <span>Pledged  Amount</span>
            <h3>{{pledges.unCashBalance.toFixedDecimal()}}  Hop</h3>
          </el-card>
        </el-col>
      </el-row>
    </Block>
  <Block title="Transation">
    <div class="list" v-for="item in dataList.list">
      <span>{{item}}</span>
      <Icon content="Share" @click="shareHandle(item)"> <Share /></Icon>
    </div>
    <!-- <div class="list">
      <span>03ef42927e896883ec2666cb1f0b6d758136c7f08eebd8e620a44a820ea86d2fda</span>
      <Icon content="Share" @click="shareHandle()"> <Share /></Icon>
    </div> -->
    <Pagination
      :pageOptions="pageOptions"
      :total="dataList.total"
      @onPageChange="onPageChange"
    />
  </Block>


  <PToken
  @cancel="cancelHandle"
  @confirm="cancelHandle"
  :tokenModal="showPledgeModal" 
  successMessage="Successful Pledge  Amount."
  errorMessage="Error with Pledge  Amount"
  tips="Pledge Amount"></PToken>

  <PToken
  @cancel="cancelHandle"
  @confirm="cancelHandle"
  :tokenModal="showReplaceModal" 
  successMessage="Successful Release Amount."
  errorMessage="Error with Release Amount"
  tips="Release Amount"></PToken>
  </Page>
</template>

<script setup>
import {
  Share,
} from '@element-plus/icons-vue'
import Pagination from "@/components/pagination.vue";
import { ref, reactive, onMounted } from "vue";
import PToken from "@/components/Token.vue";
import { getPledge, getPledgeTransations } from "@/apis/http";
import Token from "@/utils/Token";
import { useAppModule } from "@/store/appModule";


const appModule = useAppModule();

let dataList = reactive({
  list: [],
  total: 0
})

let pledges = reactive({
  cashBalance: new Token('0'),
  unCashBalance: new Token('0')
})

let showPledgeModal = ref(false)
let showReplaceModal = ref(false)
let pageOptions = reactive({
    pageNum: 1,
    pageSize: 10
})

const onPageChange = (page) => {
  pageOptions = page
}

function shareHandle(reference) {
  window.open(`${appModule.api}/bzz/${reference}/`, '_blank')
}

function cancelHandle() {
    showPledgeModal.value = false
    showReplaceModal.value = false
}
function showPledgeHandle() {
    showPledgeModal.value = true
}
function showReplaceHandle() {
    showReplaceModal.value = true
}

async function fetchPledge() {
  let res = await getPledge()
  if(res.status == 200) {
    pledges.cashBalance = new Token(res.data.cashBalance) 
    pledges.unCashBalance = new Token(res.data.unCashBalance) 
  }
}

async function fetchPledgeTransations() {
  let res = await getPledgeTransations()
  if(res.status == 200) {
    dataList.list = res.data.txs || []
    dataList.total = dataList.list.length || 0
    console.log(res)
  }
}
onMounted(() => {
  fetchPledge()
  fetchPledgeTransations()
})
</script>

<style scoped lang="scss">
@mixin baseStyle() {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 1px;
  height: 70px;
  align-items: center;
  background-color: white;
}

.list {
  @include baseStyle()
}
</style>
