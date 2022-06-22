<template>
    <div style="display:inline-block;">
        <el-tooltip
            v-if="!!content"
            effect="dark"
            :content="content"
            :placement="placement"
        >
            <el-icon :size="size" @click="click">
                <slot></slot>
            </el-icon>
        </el-tooltip>


        <el-icon v-else :size="size" @click="click">
            <slot></slot>
        </el-icon>
    </div>
</template>
<script setup>

defineProps({
  content: String,
  placement: {
      type: String,
      default: 'top'
  },
  size: {
      type: String,
      default: '20px'
  }
})
const emit = defineEmits(['click'])

function click() {
    emit('click')
}
</script>
<style scoped lang="scss">

</style>
