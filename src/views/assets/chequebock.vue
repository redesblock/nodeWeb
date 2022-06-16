<template>
<div class="container">
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
           <h3>Overall Health Indicator</h3>
            <span class="number">50%</span>
         </div>
         <div>
           <h3>Overall Health Indicator</h3>
             <span class="number">50%</span>
         </div>
         <div>
           <h3>Overall Health Indicator</h3>
             <span class="number">50%</span>
         </div>
         <div>
           <h3>Overall Health Indicator</h3>
             <span class="number">50%</span>
         </div>
         
       </div>
  </Block>
  <div class="list-box">
    <span>PEERS(160)</span>
    <el-icon><ArrowRightBold /></el-icon>
  </div>
  <div class="list-total">
    <span>Uncashed Amount Total</span>
    <span>1.0000000 MOP</span>
  </div>
  <div class="list-item">
    <span>peer oagjgjgk[....]</span>
    <el-icon><ArrowRightBold /></el-icon>
  </div>
  <div class="list-item">
    <span>Peer ID</span>
    <span>11030ec6[.....]369975b1</span>
  </div>
  <div class="list-item">
    <span>Outstanding Balance</span>
    <span>0.0000000 MOP</span>
  </div>
  <div class="list-item">
    <span>Settlements Sent / Received</span>
    <span>-0.0000000 / 0.0000000 MOP</span>
  </div>
  <div class="list-item">
    <span>Total</span>
    <span>0.0000000 MOP</span>
  </div>
  <div class="list-item">
    <span>Uncashed Amount</span>
    <span>0.0000000 MOP</span>
  </div>

    
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
</div>

</template>
<script setup>
import Block from "@/components/Block.vue";
import {
  ArrowRightBold,
  Download,
  Upload
} from '@element-plus/icons-vue'
import Modal from "@/components/Modal.vue";

import { ref } from "vue";
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
</script>

<style scoped lang="scss">
@mixin baseStyle($marginTop) {
  display: flex;
  justify-content: space-between;
  margin: 0 30px;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: $marginTop;
  height: 50px;
  align-items: center;
  background-color: white;
}
.container {
  height: 100vh;
  background-color: rgba(239, 239, 239, 1);
}
.board-card {
  display: flex;
  &>div{
    flex: 1 1 0;
    margin: 0 10px;
    height: 125px;
    background-color: white;
    padding: 0 20px;
    .number {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
.list-box {
   @include baseStyle($marginTop: 50px);
}
.list-total {
  @include baseStyle($marginTop: 10px);
  margin-bottom: 10px;
}
.list-item {
  @include baseStyle($marginTop: 1px);
}
</style>
