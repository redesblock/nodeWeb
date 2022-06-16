<template>
<div class="list-box">
    <span>APISettings</span>
    <el-icon class="point"><ArrowRightBold /></el-icon>
</div>
<div class="content">
    <h3>Hop  API</h3>
    <div>
        <el-input v-model.trim="api" placeholder="please enter" />
        <div style="margin-top: 10px;">
            <el-button type="primary" class="mgr10">save</el-button>
            <el-button >cancel</el-button>
        </div>
    </div>
</div>
<div class="content">
    <h3>Hop  Debug  API</h3>
    <div>
        <el-input v-model.trim="debugapi" placeholder="please enter" />
        <div style="margin-top: 10px;">
            <el-button type="primary" class="mgr10">save</el-button>
            <el-button >cancel</el-button>
        </div>
    </div>
</div>
</template>
<script setup>
import {
  ArrowRightBold,
} from '@element-plus/icons-vue'
import { ref } from "vue";
let api = ref(null)
let debugapi = ref(null)

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
.list-box {
   @include baseStyle($marginTop: 10px);
}
.point {
    cursor: pointer;
}
.content {
    box-sizing: border-box;
    padding: 10px 30px;
    margin: 4px 30px;
    background-color: white;
}
</style>
