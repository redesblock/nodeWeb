<template>
  <el-table v-bind="$attrs" :data="dataList.list">
    <template v-for="item in columns" :key="item">
      <el-table-column v-if="item.type =='index' || item.type =='selection'" v-bind="item"></el-table-column>
      <el-table-column v-else v-bind="item" v-slot="scope">
        <slot :name="item.prop" :row="scope.row">
          <span>{{scope.row[item.prop]}}</span>
        </slot>
      </el-table-column>
    </template>
  </el-table>
  <Pagination
  :pagination="pagination"
  :pageOptions="pageOptions"
  :total="dataList.total"
  @onPageChange="onPageChange"
  ></Pagination>
</template>
<script setup>
import Pagination from "@/components/pagination.vue";
defineProps({
  pagination: {
    type: Object,
    default: {}
  },
  pageOptions: {
    type: Object,
    default: {}
  },
  columns: {
    type: Array,
    default: () => []
  },
  dataList: {
    type: Object,
    default: () => {}
  }
})
const emit = defineEmits(['onPageChange', 'confirm'])
function onPageChange(page) {
  emit('onPageChange', page)
}


</script>
<style scoped lang="scss">
.block {
    box-sizing: border-box;
    padding: 24px 21px 0 20px;
    margin-top: 16px;
    border-radius: 8px;
    // background-color: white;
}
.title-box {
  font-weight: 600;
  font-size: 20px; 
  color: #6E4DFE;
  margin-bottom: 20px;
}
</style>
