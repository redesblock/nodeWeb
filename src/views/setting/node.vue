<template>
<Page>
  <div class="list-box">
      <span> Connettion to Hop  API</span>
      <el-icon class="point"><ArrowRightBold /></el-icon>
  </div>
  <div class="content">
      <div class="tips"> The connection to the Hop NODEs debug APIhas been successful</div>
      <h3>Hop  API</h3>
      <div>
          <el-input v-model.trim="api" placeholder="please enter" />
          <div style="margin-top: 10px;">
              <el-button type="primary" class="mgr10">save</el-button>
              <el-button >cancel</el-button>
          </div>
      </div>
  </div>
  <div class="list-box">
      <span>Connettion to Hop Debug API</span>
      <el-icon class="point"><ArrowRightBold /></el-icon>
  </div>
  <div class="content">
      <div class="tips"> The connection to the Hop NODEs debug APIhas been successful</div>
      <h3>Hop  Debug  API</h3>
      <div>
          <el-input v-model.trim="api" placeholder="please enter" />
          <div style="margin-top: 10px;">
              <el-button type="primary" class="mgr10">save</el-button>
              <el-button >cancel</el-button>
          </div>
      </div>
  </div>

  <div class="list-box">
      <span>Hop Version</span>
      <el-icon class="point"><ArrowRightBold /></el-icon>
  </div>
  <div class="content">
      <div class="tips"> You are running the latest version of Hop.</div>
      <div class="list-item">
        <span>Your Version</span>
        <span>1.41</span>
      </div>
      <div class="list-item">
        <span>Latest Version</span>
        <span>1.40</span>
      </div>
  </div>


  <div class="list-box">
      <span>Connettion to Blockchain</span>
      <el-icon class="point"><ArrowRightBold /></el-icon>
  </div>
  <div class="content">
      <div class="tips">Your NODE is connected to the xDai blockchain</div>
      <div class="list-item">
        <span>Ethereum Address</span>
      </div>
      <div class="list-item">
        <span>0x75f59cd2b244baf23246e482b1008e0650c4d55d</span>
        <el-icon><CopyDocument /></el-icon>
      </div>
  </div>


  <div class="list-box">
      <span>Chequebook Deployment & Funding</span>
      <el-icon class="point"><ArrowRightBold /></el-icon>
  </div>
  <div class="content">
      <div class="tips">Your chequebook is deployed and funded</div>
      <div class="list-item">
        <span>Chequebook Address</span>
      </div>
      <div class="list-item">
        <span>0x5128C5d8d9bb73037f335D26d7dee6DBDfB82efA</span>
        <el-icon><CopyDocument /></el-icon>
      </div>
      <div style="margin-top: 10px;">
          <el-button type="primary">DEPOSIT</el-button>
      </div>
  </div>


  <div class="list-box">
      <span>Connettion to Peers</span>
      <el-icon class="point"><ArrowRightBold /></el-icon>
  </div>
  <div class="content">
      <div class="tips"> You are connected to other Hop NODEs</div>
      <div class="list-item">
        <span>Overall Health Indicator</span>
        <span>50%</span>
      </div>
      <div class="list-item">
        <span>Connected Peers</span>
        <div>
          65%
          <el-tooltip
              effect="dark"
              content="Top Left prompts info"
            >
            <el-icon class="right"><Warning /></el-icon>
          </el-tooltip>
        </div>
      </div>
      <div class="list-item">
        <span>Population</span>
        <div>
          65%
          <el-tooltip
              effect="dark"
              content="Top Left prompts info"
            >
            <el-icon class="right"><Warning /></el-icon>
          </el-tooltip>
        </div>
      </div>
      <div class="list-item">
        <span>Depth</span>
        <div>
          65%
          <el-tooltip
              effect="dark"
              content="Top Left prompts info"
            >
            <el-icon class="right"><Warning /></el-icon>
          </el-tooltip>
        </div>
      </div>
  </div>
</Page>


</template>
<script setup>
import {
  ArrowRightBold,
  Warning,
  CopyDocument
} from '@element-plus/icons-vue'
import { ref } from 'vue'

const api = ref(null)
</script>

<style scoped lang="scss">
.container {
  padding: 20px 30px 40px;
}
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
   @include baseStyle($marginTop: 20px);
}
.list-item {
   @include baseStyle($marginTop: 0px);
   padding: 0;
   margin: 0;
   border-top: 1px solid rgb(239, 239, 239);
}
.point {
    cursor: pointer;
}
.content {
    box-sizing: border-box;
    padding: 10px 30px;
    margin: 4px 30px;
    background-color: white;
    .tips {
      background-color: rgb(247, 247, 247);
      line-height: 50px;
      margin: -10px -30px 0 -30px;
      padding-left: 20px;
    }
}
</style>
