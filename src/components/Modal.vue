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
        placeholder="amount"
        :controls="false"
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
import { ElMessage, ElLoading } from 'element-plus'
import Token from "@/utils/Token";

const props = defineProps({
  stampModal: {
    type: Boolean,
    default: false
  },
  amount: {
    type: Object,
    default: () =>{}
  },
  compare: {
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
  if(props.compare) {
    if(ruleForm.amount === '' || ruleForm.amount === null) {
      return ElMessage({
        message: `${props.title} Error: ${(props.title)} can't is null`,
        type: 'error',
      })
    }

    if(ruleForm.amount < 0) {
      return ElMessage({
        message: `${props.title} Error: ${(props.title)} can't less than 0`,
        type: 'error',
      })
    }
    if(ruleForm.amount !==0 && Token.fromDecimal(ruleForm.amount).amount.isGreaterThan(props.amount.toBigInt)){
      return ElMessage({
        message: `${props.title} Error: ${(props.title)} can't greater than ${props.amount.toFixedDecimal()}`,
        type: 'error',
      })
    }
  }
  if(typeof props.methodHandle == 'function') {
    const loading = ElLoading.service({
        lock: true,
        text: 'Service Pending',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    try {
      let data = await props.methodHandle({amount: Token.fromDecimal(ruleForm.amount).amount})
      ElMessage({
        message: `${props.successMessage} Transaction ${data}`,
        type: 'success',
      })
      ruleForm.amount = null
      emit('confirm', data)
      loading.close()
    } catch (error) {
        ElMessage({
          message: `${props.errorMessage} Error: ${(error).message},`,
          type: 'error',
        })
        loading.close()
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
