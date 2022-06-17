<script setup>
defineProps({
  title: String
})

</script>

<template>
  <div class="block">
      <div class="title-box">
          {{title}}
      </div>
      <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.block {
    box-sizing: border-box;
    // padding: 24px 21px 0 20px;
    margin: 16px 0;
    border-radius: 8px;
}
.title-box {
  font-weight: 600;
  font-size: 20px; 
  color: #6E4DFE;
  margin-bottom: 20px;
}
</style>
