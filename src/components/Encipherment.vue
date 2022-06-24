
<script setup>
import { ref, computed } from "vue";
import { split, isPrefixedHexString } from "@/utils/index";
import copy from 'copy-to-clipboard';
import Icon from "./Icon.vue";
import {
  View,
  Hide,
  CopyDocument,
  Share
} from '@element-plus/icons-vue'
const emit = defineEmits(['click'])

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
  },
  showAmount: {
    type: Boolean,
    default: false
  },
  amount: {
    type: [Number, String],
    default: 0
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
  if (props.str.startsWith('http')) {
    return props.str
  }else {
    const splitValues = split(props.str)
    return splitValues.join(" ")
  }
})

const content = computed(() => {
    if(show.value) return 'click hide content'
     return 'click show content'
})

function showInfoHandle() {
  show.value = !show.value
}

function copyText() {
  copy(props.str)
}

function shareHandle(params) {
  emit('click', params)
}

</script>

<template>
    <div :class="line ? 'line' : ''">
      <span class="label">{{title}}</span> 
      <Icon @click="showInfoHandle" :content="content">
        <View v-if="!show" />
        <Hide v-else />
      </Icon>
      <Icon v-if="share && showCopy" style="padding-left: 20px;" content="Copy" @click="copyText"><CopyDocument /></Icon>
      <span v-if="showAmount" class="right amount">Amount: {{amount}}</span>
    </div>

    <p v-if="share">
      {{show ? normalStr : spanText}}
      <Icon style="margin-left: 18px;" class="right" content="Share">
          <Share @click="shareHandle(str)"  />
      </Icon>
    </p>

    <p v-else>
      {{show ? normalStr : spanText}}
      <Icon style="margin-left: 18px;" content="Copy" v-if="showCopy" class="right" @click="copyText"><CopyDocument /></Icon>
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
.amount {
  font-weight: bold;
}
</style>
