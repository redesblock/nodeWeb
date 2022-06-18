<script setup>
import Menu from "@/components/Menu.vue";
import { onMounted } from "vue";
import { useAppModule } from "@/store/appModule";
const appModule = useAppModule();


onMounted(async() => {
  // 初始化数据
  appModule.initAppConfig()

  // 请求
  appModule.getAppConnected()
  appModule.getAppHealth()
  appModule.getAppAddress()
  appModule.getAppChequebookAddress()
  appModule.fetgetTopology()
  
})
</script>
<template>
<Menu></Menu>
</template>

<style>
#app {
  font-family: Work Sans,Montserrat,Nunito,Roboto,"Helvetica Neue",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
