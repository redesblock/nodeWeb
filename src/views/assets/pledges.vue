<template>
  <Block title="Pledge" class="container">
    <div class="btn-box">
      <el-button type="primary">PLEDGE </el-button>
      <el-button type="primary">REPLACE</el-button>
    </div>
    <el-row>
      <el-col :span="10">
        <el-card shadow="never">
          <span>System Rewards</span>
          <h3>1000  Hop</h3>
        </el-card>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-card shadow="never">
           <span>System Rewards</span>
           <h3>1000  Hop</h3>
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
  margin-right: 160px;
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

.list {
  @include baseStyle()
}
.pagination {
  float: right;
  margin-right: 146px;
  margin-top: 10px;
}
.btn-box {
  margin-right: 160px;
  margin-bottom: 20px;
  text-align: right;
}
</style>
