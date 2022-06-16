<template>
  <Block title="Rewards" class="container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="never" style="height: 164px;">
          <span>System Rewards</span>
          <h3>1000  Hop</h3>
        </el-card>
      </el-col>
      <el-col :span="12" :offset="1">
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
    <el-pagination
      class="pagination"
      v-model:currentPage="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      layout=" prev, pager, next, total, sizes, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </Block>
</template>

<script setup>
import Block from "@/components/Block.vue";
import {
  Share,
} from '@element-plus/icons-vue'
import { ref } from "vue";

const currentPage4 = ref(4)
const pageSize4 = ref(100)

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
</script>

<style scoped lang="scss">
@mixin baseStyle() {
  display: flex;
  justify-content: space-between;
  margin-right: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 1px;
  height: 70px;
  align-items: center;
  background-color: white;
}
.container {
  padding-left: 50px;
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
.pagination {
  float: right;
  margin-right: 50px;
  margin-top: 10px;
}
</style>
