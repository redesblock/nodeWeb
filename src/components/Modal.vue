<template>
 <el-dialog :title="title" v-model="stampModal" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" width="60%">
    <h3>{{tips}}</h3>
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      :size="formSize"
    >
      <el-form-item label="amount" prop="amount">
        <el-input v-model="ruleForm.amount" placeholder="amount" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelClick">Cancel</el-button>
        <el-button type="primary" @click="confirmClick">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
defineProps({
  stampModal: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  tips: {
    type: String,
    default: ''
  },
})
const emit = defineEmits(['cancel', 'confirm'])

const ruleForm = reactive({
  amount: null,
})

const formSize = ref('default')

const cancelClick = () =>{
  emit('cancel')
}

const confirmClick = async () => {
  emit('confirm')
}


</script>

<style scoped lang="scss">
.block {
    box-sizing: border-box;
    padding: 24px 21px 0 20px;
    margin-top: 16px;
    border-radius: 8px;
    background-color: white;
}
.title-box {
  font-weight: 600;
  font-size: 20px; 
  color: #6E4DFE;
  margin-bottom: 20px;
}
</style>
