<template>
  <el-pagination
    class="pagination"
    v-bind="{
      ...pagination
    }"
    v-model:currentPage="pageOptions.pageNum"
    v-model:page-size="pageOptions.pageSize"
    :page-sizes="pagination.pageSizes || [10,30,50,100,500]"
    :layout="pagination.layout || 'total, prev, pager, next, sizes, jumper'"
    :total="dataList.total"
    :pager-count="pagination.paperCount || 7"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
/>
</template>
<script setup>
const props = defineProps({
  pagination: {
    type: Object,
    default: {
      pagerCount: 7,
      pageSizes: [10,30,50,100,500],
      layout: 'total, prev, pager, next, sizes, jumper',
    }
  },
  dataList: {
    type: Object,
    default: () => {
      return {
        list: [],
        total: 1000
      }
    }
  },
  pageOptions: {
    type: Object,
    default: () => {
      return {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
})

const emit = defineEmits(['onPageChange'])
function handleSizeChange(pageSize) {
  emit('onPageChange', {
    pageSize,
    pageNum: props.pageOptions.pageNum
  })
}
function handleCurrentChange(pageNum) {
  emit('onPageChange', {
    pageSize: props.pageOptions.pageSize,
    pageNum
  })
}

</script>
<style scoped lang="scss">
.pagination {
  float: right;
  margin-top: 10px;
}
</style>
