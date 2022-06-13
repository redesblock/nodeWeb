<template>
  <Block title="Stamps">
    <el-button type="primary" class="right mgb20" @click="addStampHandle"> 
      <el-icon><Plus /></el-icon> 
      BUY NEW  STAMP
    </el-button>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Batch ID"  />
      <el-table-column prop="name" label="Stamp Depth"/>
      <el-table-column prop="address" label="Capacity" />
      <el-table-column prop="address" label="Amount" />
    </el-table>
  </Block>
  <Stamp 
  :stampModal="stampModal"
  @cancel="cancelHandle"
  @confirm="confirmHandle"
  ></Stamp>
</template>

<script setup>
import Block from "@/components/Block.vue";
import Stamp from "@/components/Stamp.vue";
import {
  Plus,
} from '@element-plus/icons-vue'
import { ref } from "vue";
let tableData = []
let stampModal = ref(false)
function addStampHandle() {
  stampModal.value = true
}
function cancelHandle() {
  stampModal.value = false
}
function confirmHandle() {
  stampModal.value = false
}
</script>

<style scoped lang="scss">

</style>
