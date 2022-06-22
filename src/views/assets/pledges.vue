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
            <span>System Rewards</span>
            <h3>1000  Hop</h3>
          </el-card>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-card shadow="never">
            <span>System Rewards</span>
            <h3>1000  Hop</h3>
          </el-card>
        </el-col>
      </el-row>
    </Block>
  <Block title="Transation">
    <div class="list">
      <span>03ef42927e896883ec2666cb1f0b6d758136c7f08eebd8e620a44a820ea86d2fda</span>
      <Icon content="Share" @click="shareHandle()"> <Share /></Icon>
    </div>
    <div class="list">
      <span>03ef42927e896883ec2666cb1f0b6d758136c7f08eebd8e620a44a820ea86d2fda</span>
      <Icon content="Share" @click="shareHandle()"> <Share /></Icon>
    </div>
    <Pagination
      :pageOptions="pageOptions"
      :total="total"
      @onPageChange="onPageChange"
    />
  </Block>


  <Token
  @cancel="cancelHandle"
  @confirm="cancelHandle"
  :tokenModal="showPledgeModal" 
  :methodHandle="withDrawHandle"
  successMessage="Successful Pledge  Amount."
  errorMessage="Error with Pledge  Amount"
  tips="Pledge Amount"></Token>

  <Token
  @cancel="cancelHandle"
  @confirm="cancelHandle"
  :tokenModal="showReplaceModal" 
  :methodHandle="withDrawHandle"
  successMessage="Successful Release Amount."
  errorMessage="Error with Release Amount"
  tips="Release Amount"></Token>
  </Page>
</template>

<script setup>
import {
  Share,
} from '@element-plus/icons-vue'
import Pagination from "@/components/pagination.vue";
import { ref, reactive } from "vue";
import { withDrawHandle } from "@/apis/index";
import Token from "@/components/Token.vue";

let total = ref(0)
let showPledgeModal = ref(false)
let showReplaceModal = ref(false)
let pageOptions = reactive({
    pageNum: 1,
    pageSize: 10
})

const onPageChange = (page) => {
  console.log(page)
  pageOptions = page
}

function shareHandle() {
  
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
