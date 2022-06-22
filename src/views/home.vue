
<template>
  <Page>
    <Block title="Hop Base NODE">
      <el-card shadow="never">
        <template #header>
          <div class="version">{{appModule.version}}</div>
        </template>
        <div class="item">
          <Encipherment title="Publick Key" :str="appModule.address.publicKey"></Encipherment>
        </div>
        <div class="item">
          <Encipherment title="Pss Publick Key" :str="appModule.address.pssPublicKey"></Encipherment>
        </div>
        <div class="item">
          <Encipherment title="NODE Peer Id" :str="appModule.address.overlay"></Encipherment>
        </div>
      </el-card>
    </Block>
    <Block title="Hop NODE Connectivity">
      <el-card shadow="never">
       <div class="board-card">
         <div>
           <h3>Overall Health Indicator</h3>
           <div>
             <span class="number">{{appModule.percentageText}}</span>
           </div>
         </div>
         <div>
           <h3>Connected Peers</h3>
           <div>
             <span class="number">{{appModule.topology.connected.score}}</span>
              <Icon
                class="right"
                placement="bottom"
                :content="appModule.topology.connected.explanation"
              >
              <Warning />
            </Icon>
           </div>
         </div>
         <div>
           <h3>Population</h3>
           <div>
             <span class="number">{{appModule.topology.population.score}}</span>
              <Icon
                class="right"
                placement="bottom"
                :content="appModule.topology.population.explanation"
              >
              <Warning />
            </Icon>
           </div>
         </div>
         <div>
           <h3>Depth</h3>
           <div>
             <span class="number">{{appModule.topology.depth.score}}</span>
              <Icon
                class="right"
                placement="bottom"
                :content="appModule.topology.depth.explanation"
              >
              <Warning />
            </Icon>
           </div>
         </div>
         
       </div>
      </el-card>
    </Block>
    <Block title="Blockchain">
      <el-card shadow="never">
        <div class="item">
          <Encipherment @click="sharehandle" share title="Bsc address" :str="appModule.address.ethereum"></Encipherment>
        </div>
        <div class="item">
          <Encipherment share title="Chequebook address" :str="appModule.chequebookAddress"></Encipherment>
        </div>
      </el-card>
    </Block>
  </Page>
</template>

<script setup>
import {
  Warning,
} from '@element-plus/icons-vue'
import Icon from "@/components/Icon.vue";
import { useAppModule } from "@/store/appModule";
import Encipherment from "@/components/Encipherment.vue";
const appModule = useAppModule();



function sharehandle(reference) {
  window.open(`${appModule.api}/bzz/${reference}/`, '_blank')
}
</script>

<style scoped lang="scss">
.version {
  text-align: right;
  font-weight: bold;
  font-size: 17px;
}
.item + .item {
  border-top: 1px solid var(--el-card-border-color);
  padding-top: 20px;
}
.board-card {
  display: flex;
  &>div{
    flex: 1 1 0;
    margin: 0 10px;
    height: 125px;
    background-color: #F8F9FD;
    padding: 0 20px;
    .number {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
