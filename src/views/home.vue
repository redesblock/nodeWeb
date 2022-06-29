
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
          <Encipherment showAmount :amount="bscAmount.toFixedDecimal()" @click="sharehandle" share title="Bsc address" :str="appModule.address.ethereum"></Encipherment>
        </div>
        <div class="item">
          <Encipherment showAmount :amount="chequebookAmount.toFixedDecimal()" @click="sharehandle" share title="Chequebook address" :str="appModule.chequebookAddress"></Encipherment>
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
import { getAddresseAmount, getChequebookAmount } from "@/apis/http";
import { onMounted, ref } from "vue";
import Token from "@/utils/Token";
import { HOP_LINK_ORIGIN } from "@/utils/data";

const appModule = useAppModule();

const bscAmount = ref(new Token('0'))
const chequebookAmount = ref(new Token('0'))


function sharehandle(reference) {
  window.open(`${HOP_LINK_ORIGIN}/address/${reference}`, '_blank')
}

async function fetchAddresseAmount() {
  let res = await getAddresseAmount()
  if(res.status == 200){
    bscAmount.value = new Token(res.data.balance)
  }
}

async function fetchChequebookAmount() {
  let res = await getChequebookAmount()
  if(res.status == 200) {
    chequebookAmount.value = new Token(res.data.totalBalance)
  }
}

onMounted(() => {
  fetchAddresseAmount()
  fetchChequebookAmount()
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
.item {
  padding-bottom: 20px;
}
.item:last-child {
  padding-bottom: 0px;
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
