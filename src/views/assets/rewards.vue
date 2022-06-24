<template>
  <Page>
    <Block title="Rewards">
      <el-row>
        <el-col :span="7">
          <el-card shadow="never" style="height: 164px;box-sizing:border-box; padding-top: 39px;">
            <span>System Rewards</span>
            <h3>{{reward.systemBalance.toFixedDecimal()}}  Hop</h3>
          </el-card>
        </el-col>
        <el-col :span="14" :offset="3">
          <el-card shadow="never">
            <div class="title">Storage  Rewards</div>
            <div class="content">
              <div>
                <p>WithDraw  Rewards</p>
                <p class="amount">{{reward.cashBalance.toFixedDecimal()}}  Mop</p>
              </div>
              <div>
                <p>Uncash  Rewards</p>
                <p class="amount">{{reward.unCashBalance.toFixedDecimal()}}  Mop</p>
              </div>
              <el-button @click="showModal" type="primary">WithDraw</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </Block>
    <Block title="Transation" class="container">
      <div class="list" v-for="item in dataList.list">
        <span>{{item}}</span>
        <Icon content="Share" @click="shareHandle(item)"> <Share /></Icon>
      </div>
      <!-- <div class="list">
        <span>{{item}}</span>
        <Icon content="Share" @click="shareHandle(item)"> <Share /></Icon>
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
  :tokenModal="tokenModal" 
  successMessage="Successful WithDraw."
  errorMessage="Error with WithDraw"
  tips="WithDraw  Storage Rewards"></PToken>
  </Page>
</template>

<script setup>
import {
  Share,
} from '@element-plus/icons-vue'
import Pagination from "@/components/pagination.vue";
import PToken from "@/components/Token.vue";
import { ref, reactive, onMounted } from "vue";
import { getReward, getRewardTransation } from "@/apis/http";
import Token from "@/utils/Token";
import { useAppModule } from "@/store/appModule";

const appModule = useAppModule();


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
  cashBalance: new Token('0'),
  systemBalance: new Token('0'),
  unCashBalance: new Token('0'),
})

const onPageChange = (page) => {
  console.log(page)
  pageOptions = page
}

function shareHandle(reference) {
  window.open(`${appModule.api}/bzz/${reference}/`, '_blank')
}

function cancelHandle(params) {
  tokenModal.value = false
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


onMounted(() => {
  fetchReward()
  fetchRewardTransation()
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

.title {
  border-bottom: 1px dashed rgb(215, 215, 215);
  text-align: center;
  padding-bottom: 20px;
}
.content {
  display: flex;
  align-content: space-between;
  align-items: baseline;
  div {
    flex: 1 1 0;
  }
}
.amount {
  font-weight: bold;
}

.list {
  @include baseStyle()
}
</style>
