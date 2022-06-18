<template>
<Page>
   <Block title="Chequebook">
    <div class="mgb20" style="text-align: right;">
      <el-button type="primary" @click="showWithdrawHandle">
        <el-icon><Upload /></el-icon>
         WITHDRAW
      </el-button>
      <el-button type="primary" @click="showDepositHandle"> 
        <el-icon><Download /></el-icon>
        DEPOSIT
      </el-button>
    </div>
    <div class="board-card">
         <div>
           <div class="label">Total Balance</div>
            <span class="number">{{cardObj.totalBalance.toFixedDecimal()}} MOP</span>
         </div>
         <div>
           <div class="label">Available  Balance</div>
             <span class="number">{{cardObj.availableBalance.toFixedDecimal()}} MOP</span>
         </div>
         <div>
           <div class="label">Total Cheques Amount Sent</div>
             <span class="number">{{cardObj.totalSent.toFixedDecimal()}} MOP</span>
         </div>
         <div>
           <div class="label">Total Cheques Amount Received</div>
             <span class="number">{{cardObj.totalReceived.toFixedDecimal()}} MOP</span>
         </div>
         
    </div>
  </Block>
    <Fold :label="PEERS" marginTop="50px">
      <div class="list-total">
      <span>Uncashed Amount Total</span>
        <span>{{dataList.totalUncashed.toFixedDecimal()}} MOP</span>
      </div>
      <Fold :label="'peer ' + item.peer.slice(0, 8) + '[…]'" v-for="item in dataList.settlements">
        <div class="list-item">
          <Encipherment title="Peer ID" :str="item.peer"></Encipherment>
        </div>
        <div class="list-item">
          <span>Outstanding Balance</span>
          <span>0.0000000 MOP</span>
        </div>
        <div class="list-item">
          <span>Settlements Sent / Received</span>
          <span>-{{item.sent.toFixedDecimal()}} / {{item.received.toFixedDecimal()}} MOP</span>
        </div>
        <div class="list-item">
          <span>Total</span>
          <span>0.0000000 MOP</span>
        </div>
        <div class="list-item">
          <span>Uncashed Amount</span>
          <span>0.0000000 MOP</span>
        </div>
      </Fold>
    </Fold>
    
  <Modal 
  :stampModal="stampModal1" 
  @cancel="cancelHandle"
  @confirm="confirmHandle"
  title="Withdraw" 
  tips="Specify the anount of MOP you would like to withdraw frrom your NODE." 
  ></Modal>
  <Modal 
  @cancel="cancelHandle"
  @confirm="confirmHandle"
  :stampModal="stampModal2" 
  title="Deposit" 
  tips="Specify the anount of MOP you would like to deposit to your NODE."></Modal>
</Page>

</template>
<script setup>
import {
  Download,
  Upload
} from '@element-plus/icons-vue'
import Modal from "@/components/Modal.vue";
import Fold from "@/components/Fold.vue";
import Encipherment from "@/components/Encipherment.vue";
import { getBalance, getSettlements } from "@/apis/index";
import Token from "@/utils/Token";
import { ref, onMounted, reactive, computed } from "vue";
let stampModal1 = ref(false)
let stampModal2 = ref(false)

function showWithdrawHandle(params) {
  stampModal1.value = true
}
function showDepositHandle(params) {
  stampModal2.value = true
}

function cancelHandle() {
  stampModal1.value = false
  stampModal2.value = false
}
function confirmHandle() {
  stampModal2.value = false
}

let cardObj = reactive({
  availableBalance: new Token(0),
  totalBalance:  new Token(0),
  totalReceived:  new Token(0),
  totalSent:  new Token(0),
})

let dataList = reactive({
  totalUncashed: new Token(0),
  settlements: [],
})
let PEERS = computed(() => {
  return `PEERS(${dataList.settlements.length})`
})


async function fetchGetBalance() {
  let res = await getBalance()
  if(res.status == 200) {
    cardObj.totalBalance = new Token(res.data.totalBalance)
    cardObj.availableBalance = new Token(res.data.totalBalance)
  }
}

async function fetchGetSettlements() {
  let res = await getSettlements()
  if(res.status == 200) {
    cardObj.totalReceived = new Token(res.data.totalReceived)
    cardObj.totalSent = new Token(res.data.totalSent)
    dataList.settlements = res.data.settlements.map(item => {
      return {
        peer: item.peer,
        received: new Token(item.received),
        sent: new Token(item.sent),
      }
    })
  }
}

onMounted(() => {
  fetchGetBalance()
  fetchGetSettlements()
})
</script>

<style scoped lang="scss">
@mixin baseStyle($marginTop) {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: $marginTop;
  height: 50px;
  align-items: center;
  background-color: white;
}

.board-card {
  display: flex;
  &>div{
    flex: 1 1 0;
    height: 125px;
    background-color: white;
    padding: 0 20px;
    .number {
      font-size: 16px;
      font-weight: bold;
    }
  }
  &>div+div {
    margin-left: 15px;
  }
}
.list-total {
  @include baseStyle($marginTop: 10px);
  margin-bottom: 10px;
}
.list-item {
  @include baseStyle($marginTop: 1px);
}

.label {
  margin-top: 20px;
  margin-bottom: 25px;
}
</style>
