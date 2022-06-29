<template>
  <Page>
    <Block title="Pledge">
      <template #button>
        <div>
          <el-button type="primary" @click="showPledgeHandle">PLEDGE </el-button>
          <el-button type="primary" @click="showReplaceHandle">REPLACE</el-button>
        </div>
      </template>
      <el-row>
        <el-col :span="12">
          <el-card shadow="never">
            <span>Total Balance</span>
            <h3>{{pledges.availablePledgedBalance.toFixedDecimal()}}  Hop</h3>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="never">
            <span>Pledged  Amount</span>
            <h3>{{pledges.pledgedBalance.toFixedDecimal()}}  Hop</h3>
          </el-card>
        </el-col>
      </el-row>
    </Block>
  <Block title="Transation">
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
  :tokenModal="showPledgeModal" 
  :methodHandle="postPledgeStake" 
  :amount="pledges.availablePledgedBalance" 
  compare
  successMessage="Successful Pledge  Amount."
  errorMessage="Error with Pledge  Amount"
  tips="Pledge Amount"></PToken>

  <PToken
  @cancel="cancelHandle"
  @confirm="confirmHandle"
  :tokenModal="showReplaceModal" 
  :methodHandle="postPledgeUnstake" 
  compare
  :amount="pledges.pledgedBalance"
  successMessage="Successful Release Amount."
  errorMessage="Error with Release Amount"
  tips="Release Amount"></PToken>
  </Page>
</template>

<script setup>

import Pagination from "@/components/pagination.vue";
import { ref, reactive, onMounted } from "vue";
import PToken from "@/components/Token.vue";
import { getPledge, getPledgeTransations, postPledgeStake, postPledgeUnstake } from "@/apis/http";
import Token from "@/utils/Token";
import { HOP_LINK_ORIGIN } from "@/utils/data";

let dataList = reactive({
  list: [],
  total: 0
})

let pledges = reactive({
  availablePledgedBalance: new Token('0'),
  pledgedBalance: new Token('0')
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
  window.open(`${HOP_LINK_ORIGIN}/tx/${reference}`, '_blank')
}

function cancelHandle() {
    showPledgeModal.value = false
    showReplaceModal.value = false
}

function confirmHandle() {
    showPledgeModal.value = false
    showReplaceModal.value = false
    fetchPledge()
    fetchPledgeTransations()
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
    pledges.availablePledgedBalance = new Token(res.data.availablePledgedBalance) 
    pledges.pledgedBalance = new Token(res.data.pledgedBalance) 
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

.list {
  @include baseStyle()
}
</style>
