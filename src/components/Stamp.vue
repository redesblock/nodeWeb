<template>
    <el-drawer title="Buy new Vouchers" v-model="stampModal" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" size="70%">
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
          <el-form-item label="Size" prop="Depth">
            <!-- <el-input v-model.number="ruleForm.Depth" /> -->
            <el-input-number
            v-model="ruleForm.Depth"
            controls-position="right"
          />
          </el-form-item>
          <el-form-item label="TTL" prop="Amount">
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
import { createPostageBatch } from "@/apis/index";
import { ElLoading, ElMessage } from 'element-plus'

defineProps({
  stampModal: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['cancel', 'confirm'])

const validateDepth = (rule, value, callback) => {
  if (!value) {
    callback(new Error('Required field'))
  } else if(value < 16) {
      callback(new Error('Minimal Size is 16'))
  }else if(value > 255) {
      callback(new Error('Maximal Size is 255'))
  }else {
      callback()
  }
}

const rules = reactive({
  Depth: [
    { required: true, validator: validateDepth},
  ],
  Amount: [
    { required: true, message: 'Required field', trigger: 'blur' },
  ],
})

const ruleForm = reactive({
  Depth: null,
  Amount: null,
  Label: '',
})

const formSize = ref('default')
const ruleFormRef = ref(null)

const cancelClick = (formEl) =>{
  formEl.resetFields()
  emit('cancel')
}

const confirmClick = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const loading = ElLoading.service({
        lock: true,
        text: 'Service Pending',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      let options = ruleForm.Label ? { label: ruleForm.Label } : undefined

      createPostageBatch(ruleForm.Amount, ruleForm.Depth, options).then(data => {
        ElMessage({
          message: `create successful: batchID ${data}`,
          type: 'success'
        })
        loading.close()
        emit('confirm', data)
      }).catch(err => {
        loading.close()

        ElMessage({
          message: `ERROR: ${err.message}`,
          type: 'error'
        })
      })
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
