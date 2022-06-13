<template>
    <el-drawer title="Buy new Stamp" v-model="stampModal" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" size="70%">
      <template #default>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <el-form-item label="Depth" prop="Depth">
            <el-input v-model="ruleForm.Depth" />
          </el-form-item>
          <el-form-item label="Amount" prop="Amount">
            <el-input v-model="ruleForm.Amount" />
          </el-form-item>
          <el-form-item label="Label" prop="Label">
            <el-input v-model="ruleForm.Label" />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick(ruleFormRef)">cancel</el-button>
          <el-button type="primary" @click="confirmClick(ruleFormRef)">confirm</el-button>
        </div>
      </template>
    </el-drawer>
</template>

<script setup>
import { ref, reactive } from "vue";
defineProps({
  stampModal: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['cancel', 'confirm'])
const rules = reactive({
  Depth: [
    { required: true, message: 'Required field', trigger: 'blur' },
    { min: 16, max: 255, message: 'Length should be 16 to 255', trigger: 'blur' },
  ],
  Amount: [
    { required: true, message: 'Required field', trigger: 'blur' },
  ],
})

const ruleForm = reactive({
  Depth: null,
  Amount: null,
  Label: null,
})

const formSize = ref('default')
const ruleFormRef = ref(null)

const cancelClick = (formEl) =>{
  formEl.resetFields()
  emit('cancel')
}

const confirmClick = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit('confirm')
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
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
