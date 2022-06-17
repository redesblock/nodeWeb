
<script setup>
import { ref, computed } from "vue";
import { split, isPrefixedHexString } from "@/utils/index";
import {
  View,
  Hide
} from '@element-plus/icons-vue'
const props = defineProps({
  title: String,
  str: String
})
let status = ref(false)
const spanText = computed(() => {
  const splitValues = split(props.str)
  const hasPrefix = isPrefixedHexString(props.str)
  const spanText = `${hasPrefix ? `${splitValues[0]} ${splitValues[1]}` : splitValues[0]}[…]${
    splitValues[splitValues.length - 1]
  }`
  return spanText
})

const normalStr = computed(() => {
  const splitValues = split(props.str)
  return splitValues.join(" ")
})

function showInfoHandle() {
  status.value = !status.value
}

</script>

<template>
    <span class="label">{{title}}</span> 
    <el-icon :size="20" @click="showInfoHandle">
      <View v-if="!status" />
      <Hide v-else />
    </el-icon>
    <p>{{status ? normalStr : spanText}}</p>
</template>

<style scoped lang="scss">
.label {
  display: inline-block;
  vertical-align: top;
  padding-right: 30px;
}
</style>
