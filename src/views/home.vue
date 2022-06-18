
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
             <span class="number">{{percentageText}}</span>
           </div>
         </div>
         <div>
           <h3>Connected Peers</h3>
           <div>
             <span class="number">{{topology.connected.score}}</span>
              <el-tooltip
                effect="dark"
                :content="topology.connected.explanation"
              >
             <el-icon class="right"><Warning /></el-icon>
            </el-tooltip>
           </div>
         </div>
         <div>
           <h3>Population</h3>
           <div>
             <span class="number">{{topology.population.score}}</span>
              <el-tooltip
                effect="dark"
                :content="topology.population.explanation"
              >
             <el-icon class="right"><Warning /></el-icon>
            </el-tooltip>
           </div>
         </div>
         <div>
           <h3>Depth</h3>
           <div>
             <span class="number">{{topology.depth.score}}</span>
              <el-tooltip
                effect="dark"
                :content="topology.depth.explanation"
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
          <Encipherment title="Bsc address" :str="appModule.address.ethereum"></Encipherment>
        </div>
        <div class="item">
          <Encipherment title="Chequebook address" :str="obj.chequebookAddress"></Encipherment>
        </div>
      </el-card>
    </Block>
  </Page>
</template>

<script setup>
import {
  Warning,
} from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from "vue";
import { getChequebookAddress, getTopology } from "@/apis/index";
import { useAppModule } from "@/store/appModule";
import Encipherment from "@/components/Encipherment.vue";
import { pickThreshold } from "@/utils/data";
const appModule = useAppModule();

let obj = reactive({
  chequebookAddress: '',
})

let topology = reactive({
  depth: {},
  population: {},
  connected: {},
})
let percentageText = ref(null)

const fetGetChequebookAddress = async () => {
  let res = await getChequebookAddress()
  if(res.status == 200) {
    obj.chequebookAddress = res.data.chequebookAddress
  }
}

const fetgetTopology = async () => {
  let res = await getTopology()
  if(res.status == 200) {
    topology.depth = pickThreshold('depth', res.data.depth)
    topology.population = pickThreshold('population', res.data.population)
    topology.connected = pickThreshold('connected', res.data.connected)
    const maximumTotalScore = Object.values(topology).reduce((sum, item) => sum + item.maximumScore, 0)
    const actualTotalScore = Object.values(topology).reduce((sum, item) => sum + item.score, 0)
    percentageText.value = Math.round((actualTotalScore / maximumTotalScore) * 100) + '%'
  }
}

onMounted(async() => {
  fetGetChequebookAddress()
  fetgetTopology()
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
