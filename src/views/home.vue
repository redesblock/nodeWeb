
<template>
  <Page>
    <Block title="Hop Base NODE">
      <el-card shadow="never">
        <template #header>
          <div class="version">{{appModule.version}}</div>
        </template>
        <div class="item">
          <Encipherment
          title="Publick Key" :str="obj.publicKey"></Encipherment>
        </div>
        <div class="item">
          <Encipherment
          title="Pss Publick Key" :str="obj.pssPublicKey"></Encipherment>
        </div>
        <div class="item">
          <Encipherment
          title="NODE Peer Id" :str="obj.overlay"></Encipherment>
        </div>
      </el-card>
    </Block>
    <Block title="Hop NODE Connectivity">
      <el-card shadow="never">
       <div class="board-card">
         <div>
           <h3>Overall Health Indicator</h3>
           <div>
             <span class="number">50%</span>
           </div>
         </div>
         <div>
           <h3>Connected Peers</h3>
           <div>
             <span class="number">50%</span>
              <el-tooltip
                effect="dark"
                content="Top Left prompts info"
              >
             <el-icon class="right"><Warning /></el-icon>
            </el-tooltip>
           </div>
         </div>
         <div>
           <h3>Population</h3>
           <div>
             <span class="number">50%</span>
              <el-tooltip
                effect="dark"
                content="Top Left prompts info"
              >
             <el-icon class="right"><Warning /></el-icon>
            </el-tooltip>
           </div>
         </div>
         <div>
           <h3>Depth</h3>
           <div>
             <span class="number">50%</span>
              <el-tooltip
                effect="dark"
                content="Top Left prompts info"
              >
             <el-icon class="right"><Warning /></el-icon>
            </el-tooltip>
           </div>
         </div>
         
       </div>
      </el-card>
    </Block>
    <Block title="Blockchain">
      <el-card shadow="never">
        <div class="item">
          <Encipherment
          title="Bsc address" :str="obj.ethereum"></Encipherment>
        </div>
        <div class="item">
          <Encipherment
          title="Chequebook address" :str="obj.chequebookAddress"></Encipherment>
        </div>
      </el-card>
    </Block>
  </Page>
</template>

<script setup>
import {
  Warning,
} from '@element-plus/icons-vue'
import { onMounted, reactive } from "vue";
import { getAddress, getChequebookAddress } from "@/apis/index";
import { useAppModule } from "@/store/appModule";
import { split, isPrefixedHexString } from "@/utils/index";
import Encipherment from "@/components/Encipherment.vue";
const appModule = useAppModule();

let obj = reactive({
  pssPublicKey: '',
  publicKey: '',
  overlay: '',
  ethereum: '',
  underlay: [],
  chequebookAddress: '',
})

onMounted(async() => {
  let res = await getAddress()
  if(res.status == 200) {
    Object.keys(res.data).forEach(k => {
      obj[k] = res.data[k]
    })
  }

  let res2 = await getChequebookAddress()
  if(res2.status == 200) {
    obj.chequebookAddress = res2.data.chequebookAddress
  }
})
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
