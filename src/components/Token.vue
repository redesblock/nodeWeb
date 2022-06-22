<template>
 <el-dialog v-model="tokenModal" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" width="400px">
    <div class="tips">{{tips}}</div>
    <el-form
      ref="ruleFormRef"
      :size="formSize"
    >
      <el-form-item class="label" label="HOP Token:" prop="token">
        <el-input
        v-model.trim="ruleForm.token"
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
import { ElMessage } from 'element-plus'
import Token from "@/utils/Token";

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
  }
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
        message: `${props.successMessage} Token: ${data}`,
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
