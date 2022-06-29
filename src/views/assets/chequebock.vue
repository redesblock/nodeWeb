<template>
<Page>
   <Block title="Chequebook">
    <template #button>
      <div>
        <el-button type="primary" @click="showWithdrawHandle">
          <el-icon><Upload /></el-icon>
          WITHDRAW
        </el-button>
        <el-button type="primary" @click="showDepositHandle"> 
          <el-icon><Download /></el-icon>
          DEPOSIT
        </el-button>
      </div>
    </template>
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
  <Fold :label="PEERS" marginTop="50px" show>
    <div class="list-total">
    <span>Uncashed Amount Total</span>
      <span>{{dataList.totalUncashed.toFixedDecimal()}} MOP</span>
    </div>
    <Fold :label="'peer ' + item.peer.slice(0, 8) + '[…]'" v-for="item in dataList.accounting">
      <div class="list-item">
        <Encipherment title="Peer ID" :str="item.peer"></Encipherment>
      </div>
      <div class="list-item">
        <span>Outstanding Balance</span>
        <span>{{item.balance.toFixedDecimal()}} MOP</span>
      </div>
      <div class="list-item">
        <span>Settlements Sent / Received</span>
        <span>-{{item.sent.toFixedDecimal()}} / {{item.received.toFixedDecimal()}} MOP</span>
      </div>
      <div class="list-item">
        <span>Total</span>
        <span>{{item.total.toFixedDecimal()}} MOP</span>
      </div>
      <div class="list-item">
        <span>Uncashed Amount</span>
        <span>{{item.uncashedAmount.toFixedDecimal()}} MOP</span>
      </div>
    </Fold>
  </Fold>
    
  <Modal 
  :stampModal="stampModal1" 
  @cancel="cancelHandle"
  @confirm="cancelHandle"
  :methodHandle="withdrawTokens"
  successMessage="Successful withdraw."
  errorMessage="error withdraw."
  title="Withdraw" 
  tips="Specify the anount of MOP you would like to withdraw frrom your NODE." 
  ></Modal>

  <Modal 
  @cancel="cancelHandle"
  @confirm="cancelHandle"
  :stampModal="stampModal2" 
  :methodHandle="depositTokens"
  successMessage="Successful deposit."
  errorMessage="Error with depositing"
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
import { getChequebookBalance, getAllSettlements, withdrawTokens, depositTokens, getAllBalances, getLastCashoutAction } from "@/apis/index";
import { makeRetriablePromise, unwrapPromiseSettlements, mergeAccounting } from "@/utils/index";
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

let cardObj = reactive({
  availableBalance: new Token(0),
  totalBalance:  new Token(0),
  totalReceived:  new Token(0),
  totalSent:  new Token(0),
})

let dataList = reactive({
  totalUncashed: new Token(0),
  settlements: [],
  balances: [],
  accounting: []
})

let PEERS = computed(() => {
  return `PEERS(${dataList.accounting.length})`
})


async function fetchGetBalance() {
  let data = await getChequebookBalance()
    cardObj.totalBalance = new Token(data.totalBalance)
    cardObj.availableBalance = new Token(data.totalBalance)
}

async function fetchGetSettlements() {
  let data = await getAllSettlements()
  cardObj.totalReceived = new Token(data.totalReceived)
  cardObj.totalSent = new Token(data.totalSent)
  dataList.settlements = data.settlements.map(item => {
    return {
      peer: item.peer,
      received: new Token(item.received),
      sent: new Token(item.sent),
    }
  })

  fetchGetLastCashoutAction(dataList)
}

async function fetchGetBalances() {
    let data = await getAllBalances()
    dataList.balances = data.balances.map(item => {
      return {
        peer: item.peer,
        balance: new Token(item.balance)
      }
    })
    fetchGetSettlements()
}

function fetchGetLastCashoutAction(settlements) {
    const promises = settlements.settlements
      .filter(({ received }) => received.toBigNumber.gt('0'))
      .map(({ peer }) => makeRetriablePromise(() => getLastCashoutAction(peer)))
    Promise.allSettled(promises).then(settlements => {
      const results = unwrapPromiseSettlements(settlements)
      let uncashedAmounts = results.fulfilled
      let accounting = mergeAccounting(dataList.balances, dataList.settlements, uncashedAmounts)

      accounting?.forEach(
          ({ uncashedAmount }) => (dataList.totalUncashed = new Token(dataList.totalUncashed.toBigNumber.plus(uncashedAmount.toBigNumber))),
      )
      dataList.accounting = accounting
    })
}

onMounted(() => {
  fetchGetBalances()
  fetchGetBalance()
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
