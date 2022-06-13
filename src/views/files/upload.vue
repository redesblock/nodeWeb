<script setup>
defineProps({
  title: String
})

</script>

<template>
 <div class="block">
        <div>
           <span class="block-title">{{title}}</span>
        </div>
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.block {
    box-sizing: border-box;
    padding: 24px 21px 0 20px;
    margin-top: 16px;
    border-radius: 8px;
    background-color: white;
}
.block-title {
    font-weight: 600;
    font-size: 20px; 
    color: #6E4DFE; 
}
</style>
