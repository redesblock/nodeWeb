<template>
 <el-dialog v-model="tokenModal" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" width="400px">
    <!-- <template #header>
      <span class="header">{{title}}</span>
    </template> -->
    <div class="tips">{{tips}}</div>
    <el-form
      ref="ruleFormRef"
      :size="formSize"
    >
      <el-form-item class="label" label="HOP Token:" prop="token">
        <el-input
        v-model.trim="ruleForm.token"
        type="number"
        placeholder="place input token"
        controls-position="right"
        size="large"
      />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelClick">Cancel</el-button>
        <el-button type="primary" @click="confirmClick">{{confirmText}}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage, ElLoading } from 'element-plus'
import Token from "@/utils/Token";
import { BigNumber } from "bignumber.js";

const props = defineProps({
  tokenModal: {
    type: Boolean,
    default: false
  },
  methodHandle: {
    type: Function,
    default: null
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
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  amount: {
    type: Object,
    default: () =>{}
  },
  compare: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['cancel', 'confirm'])

const ruleForm = reactive({
  token: null,
})

const formSize = ref('default')

const cancelClick = () =>{
  ruleForm.token = null
  emit('cancel')
}

const confirmClick = async () => {
  
  
  if(props.compare) {
    if(ruleForm.token === '' || ruleForm.token === null) {
      return ElMessage({
        message: `${props.tips} Error: ${(props.tips)} can't is null`,
        type: 'error',
      })
    }

    if(ruleForm.token < 0) {
      return ElMessage({
        message: `${props.tips} Error: ${(props.tips)} can't less than 0`,
        type: 'error',
      })
    }
    if(ruleForm.token !==0 && BigNumber(ruleForm.token).isGreaterThan(props.amount.toBigInt)){
      return ElMessage({
        message: `${props.tips} Error: ${(props.tips)} can't greater than ${props.amount.toBigInt}`,
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
      let data = await props.methodHandle({amount: new Token(ruleForm.token).toBigInt})
      ElMessage({
        message: `${props.successMessage} Token: ${data.data.transactionHash}`,
        type: 'success',
      })
      loading.close()
      emit('confirm', data)
      ruleForm.token = null
    } catch (error) {
        const message = error?.response?.data?.message || error.message
        ElMessage({
          message: `${props.errorMessage} Error: ${(message)},`,
          type: 'error',
        })
      loading.close()
    }
  }
}


</script>

<style scoped lang="scss">
.tips {
  margin-bottom: 25px;
  margin-top: -20px;
  font-weight: bold;
  font-size: 1.1em;
  text-align: center;
}
.label {
  font-size: 18px;
  font-weight: bold;
}
</style>
