
<script setup>
import { ref, computed } from "vue";
import { split, isPrefixedHexString } from "@/utils/index";
import copy from 'copy-to-clipboard';
import {
  View,
  Hide,
  CopyDocument,
  Share
} from '@element-plus/icons-vue'
const props = defineProps({
  title: String,
  str: String,
  showCopy: {
    type: Boolean,
    default: true
  },
  line: {
    type: Boolean,
    default: false
  },
  share: {
    type: Boolean,
    default: false
  }
})
let show = ref(false)
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
  show.value = !show.value
}

function copyText() {
  copy(props.str)
}

function shareHandle() {
  window.open(props.str)
}

</script>

<template>
    <div :class="line ? 'line' : ''">
      <span class="label">{{title}}</span> 
      <el-icon :size="20" @click="showInfoHandle">
        <View v-if="!show" />
        <Hide v-else />
      </el-icon>
    </div>
    <p v-if="share">
      {{show ? str : spanText}}
      <Share @click="shareHandle" class="right" style="cursor:pointer;width: 1em; height: 1em; margin-right: 8px" />
      <el-icon style="padding-left: 20px;margin-right: 8px" v-if="showCopy" class="right" :size="20" @click="copyText"><CopyDocument /></el-icon>
    </p>
    <p v-else>
      {{show ? normalStr : spanText}}
      <el-icon style="padding-left: 20px;" v-if="showCopy" class="right" :size="20" @click="copyText"><CopyDocument /></el-icon>
    </p>
</template>

<style scoped lang="scss">
.line {
  padding-top: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgb(239, 239, 239);
}
.label {
  display: inline-block;
  vertical-align: top;
  padding-right: 30px;
}

</style>
