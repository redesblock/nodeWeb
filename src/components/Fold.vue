
<template>
  <div class="list-box" @click="unfoldHandle" :style="{'margin-top': marginTop}">
    <div>
      <span v-if="isShowStatus" :class="isHealth ? 'success' : 'error'"></span>
      <span>{{label}}</span>
    </div>
    <el-icon>
      <ArrowRightBold v-if="!showMore" />
      <ArrowDownBold v-else />
    </el-icon>
  </div>
   <transition name="fade">
      <div v-if="showMore">
        <slot></slot>
      </div>
   </transition>
</template>
<script setup>
import { ref } from "vue";
import {
  ArrowRightBold,
  ArrowDownBold
} from '@element-plus/icons-vue'
const props = defineProps({
  label: String,
  marginTop: {
    type: String,
    default: '1px'
  },
  show: {
    type: Boolean,
    default: false
  },
  isShowStatus: {
    type: Boolean,
    default: false
  },
  isHealth: {
    type: Boolean,
    default: false
  },

})

let showMore = ref(props.show)
function unfoldHandle() {
  showMore.value = !showMore.value
}
</script>

<style scoped lang="scss">
@mixin baseStyle($marginTop) {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: $marginTop;
  height: 50px;
  align-items: center;
  background-color: white;
  cursor: pointer;
}

.list-box {
   @include baseStyle($marginTop: 50px);
}
</style>
