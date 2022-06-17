<template>
  <Page>
    <Block title="Rewards">
      <el-row>
        <el-col :span="7">
          <el-card shadow="never" style="height: 164px;">
            <span>System Rewards</span>
            <h3>1000  Hop</h3>
          </el-card>
        </el-col>
        <el-col :span="14" :offset="3">
          <el-card shadow="never">
            <div class="title">Storage  Rewards</div>
            <div class="content">
              <div>
                <p>WithDraw  Rewards</p>
                <p class="amount">200  Mop</p>
              </div>
              <div>
                <p>WithDraw  Rewards</p>
                <p class="amount">200  Mop</p>
              </div>
              <el-button type="primary">WithDraw</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </Block>
    <Block title="Transation" class="container">
      <div class="list">
        <span>03ef42927e896883ec2666cb1f0b6d758136c7f08eebd8e620a44a820ea86d2fda</span>
        <Share style="cursor:pointer;width: 1em; height: 1em; margin-right: 8px" />
      </div>
      <div class="list">
        <span>03ef42927e896883ec2666cb1f0b6d758136c7f08eebd8e620a44a820ea86d2fda</span>
        <Share style="cursor:pointer;width: 1em; height: 1em; margin-right: 8px" />
      </div>
      <Pagination
      :pageOptions="pageOptions"
      :total="total"
      @onPageChange="onPageChange"
      />
    </Block>
  </Page>
</template>

<script setup>
import {
  Share,
} from '@element-plus/icons-vue'
import Pagination from "@/components/pagination.vue";
import { ref, reactive } from "vue";

let total = ref(0)
let pageOptions = reactive({
    pageNum: 1,
    pageSize: 10
})

const onPageChange = (page) => {
  console.log(page)
  pageOptions = page
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
