<template>
<Page>
  <Fold label="Connettion to Hop  API">
    <div class="content">
        <div class="tips"> The connection to the Hop NODEs debug APIhas been successful</div>
        <h3>Hop  API</h3>
        <div>
            <el-input v-model.trim="api" placeholder="please enter" />
            <div style="margin-top: 10px;">
                <el-button @click="saveApi" type="primary" class="mgr10">save</el-button>
                <el-button @click="cancelApi">cancel</el-button>
            </div>
        </div>
    </div>
  </Fold>
  
  <Fold label="Connettion to Hop Debug API" marginTop="20px">
    <div class="content">
        <div class="tips"> The connection to the Hop NODEs debug APIhas been successful</div>
        <h3>Hop  Debug  API</h3>
        <div>
            <el-input v-model.trim="debugApi" placeholder="please enter" />
            <div style="margin-top: 10px;">
                <el-button @click="saveDebugApi" type="primary" class="mgr10">save</el-button>
                <el-button @click="cancelDebugApi">cancel</el-button>
            </div>
        </div>
    </div>
  </Fold>
  
  <Fold label="Hop Version" marginTop="20px">
    <div class="content">
        <div class="tips"> You are running the latest version of Hop.</div>
        <div class="list-item">
          <span>Your Version</span>
          <span>{{appModule.version}}</span>
        </div>
        <div class="list-item">
          <span>Latest Version</span>
          <span>{{appModule.latestVersion || '-'}}</span>
        </div>
    </div>
  </Fold>
  
  <Fold label="Connettion to Blockchain" marginTop="20px">
    <div class="content">
      <div class="tips">Your NODE is connected to the xDai blockchain</div>
      <Encipherment line v-if="appModule.address.ethereum" title="Ethereum Address" :str="appModule.address.ethereum"></Encipherment>
    </div>
  </Fold>
  
  <Fold label="Chequebook Deployment & Funding" marginTop="20px">
    <div class="content">
      <div class="tips">Your chequebook is deployed and funded</div>
      <Encipherment line title="Chequebook Address" :str="appModule.chequebookAddress"></Encipherment>
      <div style="margin-top: 10px;">
          <el-button type="primary">DEPOSIT</el-button>
      </div>
    </div>
  </Fold>
  
  <Fold label="Connettion to Peers" marginTop="20px">
    <div class="content">
        <div class="tips"> You are connected to other Hop NODEs</div>
        <div class="list-item">
          <span>Overall Health Indicator</span>
          <span>{{appModule.percentageText}}</span>
        </div>
        <div class="list-item">
          <span>Connected Peers</span>
          <div>
            <span style="padding-right:10px ;">{{appModule.topology.connected.score}}</span>
            <el-tooltip
                effect="dark"
                :content="appModule.topology.connected.explanation"
              >
              <el-icon class="right"><Warning /></el-icon>
            </el-tooltip>
          </div>
        </div>
        <div class="list-item">
          <span>Population</span>
          <div>
            <span style="padding-right: 10px;">{{appModule.topology.population.score}}</span>
            <el-tooltip
                effect="dark"
                :content="appModule.topology.population.explanation"
              >
              <el-icon class="right"><Warning /></el-icon>
            </el-tooltip>
          </div>
        </div>
        <div class="list-item">
          <span>Depth</span>
          <div>
            <span style="padding-right: 10px;">{{appModule.topology.depth.score}}</span>
            <el-tooltip
                effect="dark"
                :content="appModule.topology.depth.explanation"
              >
              <el-icon class="right"><Warning /></el-icon>
            </el-tooltip>
          </div>
        </div>
    </div>
  </Fold>
  
</Page>


</template>
<script setup>
import {
  Warning,
  CopyDocument
} from '@element-plus/icons-vue'

import { ref } from 'vue'
import Fold from "@/components/Fold.vue";
import Encipherment from "@/components/Encipherment.vue";
import { useApiConfig } from "@/store/api";
import { useAppModule } from "@/store/appModule";
const appModule = useAppModule()
const {api, debugApi, cancelApi, saveApi, cancelDebugApi, saveDebugApi} = useApiConfig()
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

.list-item {
   @include baseStyle($marginTop: 0px);
   padding: 0;
   margin: 0;
   border-top: 1px solid rgb(239, 239, 239);
}

.content {
    box-sizing: border-box;
    padding: 10px 30px;
    margin: 4px 0px;
    background-color: white;
    .tips {
      background-color: rgb(247, 247, 247);
      line-height: 50px;
      margin: -10px -30px 0 -30px;
      padding-left: 20px;
    }
}
</style>
