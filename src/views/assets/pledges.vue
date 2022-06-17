<template>
  <Page>
    <Block title="Pledge">
      <div style="text-align: right;" class="mgb20">
        <el-button type="primary">PLEDGE </el-button>
        <el-button type="primary">REPLACE</el-button>
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

.list {
  @include baseStyle()
}
</style>
