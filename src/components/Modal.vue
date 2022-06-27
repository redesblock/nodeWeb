<template>
 <el-dialog v-model="stampModal" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" width="700px">
    <template #header>
      <span class="header">{{title}}</span>
    </template>
    <div class="tips">{{tips}}</div>
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      :size="formSize"
    >
      <el-form-item label="amount" prop="amount">
        <el-input-number
        v-model="ruleForm.amount"
        :min="0"
        :max="10"
        placeholder="amount"
        controls-position="right"
        size="large"
      />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelClick">Cancel</el-button>
        <el-button type="primary" @click="confirmClick">{{title}}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from 'element-plus'
import Token from "@/utils/Token";

const props = defineProps({
  stampModal: {
    type: Boolean,
    default: false
  },
  methodHandle: {
    type: Function,
    default: null
  },
  title: {
    type: String,
    default: ''
  },
  tips: {
    type: String,
    default: ''
  },
  successMessage: {
    type: String,
    default: ''
  },
  errorMessage: {
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
  if(typeof props.methodHandle == 'function') {
    try {
      let data = await props.methodHandle({amount: new Token(ruleForm.amount).toBigInt})
      ElMessage({
        message: `${props.successMessage} Transaction ${data}`,
        type: 'success',
      })
      emit('confirm', data)
    } catch (error) {
        ElMessage({
          message: `${props.errorMessage} Error: ${(error).message},`,
          type: 'eerror',
        })
    }
  }
}


</script>

<style scoped lang="scss">
.tips {
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 1.1em;
  padding-left: 40px;
}

.header{
  position: relative;
  padding-left: 20px;
  color: rgb(43, 43, 43);
  font-weight: bold;
}
.header::before {
  content: "";
    position: absolute;
    left: 6px;
    height: 16px;
    width: 4px;
    background-color: rgb(65, 124, 246);
  top: 1px;
}
</style>
