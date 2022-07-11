
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

let show = ref(true)

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
    return splitValues.join("")
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

    <div v-if="share" :class="line ? 'line-str' : ''">
      {{show ? normalStr : spanText}}
      <Icon style="margin-left: 18px;" class="right" content="Share">
          <!-- <Share  /> -->
          <svg  @click="shareHandle(str)" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 19H5V5h7V3H3v18h18v-9h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></svg>
      </Icon>
    </div>

    <div v-else :class="line ? 'line-str' : ''">
      {{show ? normalStr : spanText}}
      <Icon style="margin-left: 18px;" content="Copy" v-if="showCopy" class="right" @click="copyText"><CopyDocument /></Icon>
    </div>
</template>

<style scoped lang="scss">
.line {
  padding-top: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgb(239, 239, 239);
}
.line-str {
  padding-top: 10px;
  padding-bottom: 10px;
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
