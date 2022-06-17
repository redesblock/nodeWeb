<script setup>
import Menu from "@/components/Menu.vue";
import { onMounted } from "vue";
import { useAppModule } from "@/store/appModule";
const appModule = useAppModule();


onMounted(async() => {
  console.log(useAppModule)

  appModule.getAppInfo()
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
