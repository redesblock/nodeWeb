<template>
  <Page>
    <Block title="Reward">
      <el-row>
        <el-col :span="6">
          <el-card shadow="never" class="content">
            <span>Available Balance</span>
            <h3>{{reward.mopBalance.toFixedDecimal()}}  MOP</h3>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="never" class="content">
            <span>System Rewards</span>
            <h3>{{reward.systemBalance.toFixedDecimal()}}  MOP</h3>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="never" class="content">
            <span>WithDraw Rewards</span>
            <h3>{{reward.cashBalance.toFixedDecimal()}}  MOP</h3>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="never" class="content">
            <el-button class="btn" @click="showModal" type="primary">WithDraw</el-button>
            <span>Uncash Rewards</span>
            <h3>{{reward.unCashBalance.toFixedDecimal()}}  MOP</h3>
          </el-card>
        </el-col>
      </el-row>
    </Block>
    <Block title="Transation" class="container">
      <div class="list" v-for="item in dataList.list">
        <span>{{item}}</span>
        <Icon content="Share">
          <svg  @click="shareHandle(item)" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 19H5V5h7V3H3v18h18v-9h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></svg>
        </Icon>
      </div>
      <Pagination
      :pageOptions="pageOptions"
      :total="dataList.total"
      @onPageChange="onPageChange"
      />
    </Block>

  <PToken
  @cancel="cancelHandle"
  @confirm="confirmHandle"
  :tokenModal="tokenModal"
  :methodHandle="postRewardCash" 
  successMessage="Successful WithDraw."
  errorMessage="Error with WithDraw"
  tips="WithDraw  Storage Rewards"></PToken>
  </Page>
</template>

<script setup>

import Pagination from "@/components/pagination.vue";
import PToken from "@/components/Token.vue";
import { ref, reactive, onMounted } from "vue";
import { getReward, getRewardTransation, postRewardCash, getAddresseAmount } from "@/apis/http";
import Token from "@/utils/Token";
import { MOP_LINK_ORIGIN } from "@/utils/data";

let dataList = reactive({
  list: [],
  total: 0
})
let tokenModal = ref(false)
let pageOptions = reactive({
    pageNum: 1,
    pageSize: 10
})

let reward = reactive({
  mopBalance: new Token('0'),
  cashBalance: new Token('0'),
  systemBalance: new Token('0'),
  unCashBalance: new Token('0'),
})

const onPageChange = (page) => {
  console.log(page)
  pageOptions = page
}

function shareHandle(reference) {
  window.open(`${MOP_LINK_ORIGIN}/tx/${reference}`, '_blank')
}

function cancelHandle(params) {
  tokenModal.value = false
}
function confirmHandle(params) {
  tokenModal.value = false
  fetchReward()
  fetchRewardTransation()
}
function showModal(params) {
  tokenModal.value = true
}

async function fetchReward() {
  let res = await getReward()
  if(res.status == 200) {
    reward.cashBalance = new Token(res.data.cashBalance) 
    reward.systemBalance = new Token(res.data.systemBalance) 
    reward.unCashBalance = new Token(res.data.unCashBalance) 
  }
}

async function fetchRewardTransation() {
  let res = await getRewardTransation()
  if(res.status == 200) {
    dataList.list  = res.data.txs || []
    dataList.total = dataList.list.length || 0
  }
}

async function fetchAddresseAmount() {
  let res = await getAddresseAmount()
  if(res.status == 200) {
    reward.mopBalance = new Token(res.data.mopBalance) 
  }
}


onMounted(() => {
  fetchReward()
  fetchAddresseAmount()
  fetchRewardTransation()
})
</script>

<style scoped lang="scss">
.main {
  width: 70%;
  min-width: 850px;
  margin: 0 auto;
  margin-top: 80px;
}
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

.title {
  border-bottom: 1px dashed rgb(215, 215, 215);
  text-align: center;
  padding-bottom: 20px;
}
.content {
  height: 164px;
  box-sizing:border-box; 
  padding-top: 39px;
  text-align: center;
  position: relative;
}
.amount {
  font-weight: bold;
}

.list {
  @include baseStyle()
}
.btn {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 5px;
  margin-right: 10px;
}
</style>
