<template>
    <el-drawer v-model="stampModal" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :size="700">
      <template #header>
        <span class="header">Buy New Vouchers</span>
      </template>
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
          <el-form-item label="Storage Size" prop="Depth">
            <!-- <el-input v-model.number="ruleForm.Depth" /> -->
            <el-input-number
            v-model="ruleForm.Depth"
            controls-position="right"
            style="width: 600px;"
          />
          <div style="width:600px;">
            <span>Corresponding file size:</span>
            <span class="right">{{getFileSize(ruleForm.Depth)}}</span>
          </div>
          </el-form-item>
          <el-form-item label="Storage TTL" prop="Amount">
            <el-input v-model="ruleForm.Amount" style="width: 600px;"  />
            <div style="width: 600px;">
              <span>Corresponding TTL (Time to live)</span>
              <span class="right">{{getTtl(ruleForm.Amount)}}</span>
            </div>
          </el-form-item>
          <el-form-item label="Storage Label" prop="Label">
            <el-input v-model="ruleForm.Label" style="width: 600px;" />
            <div style="width: 600px;">
              <span>Indicative Price</span>
              <span class="right">{{ ruleForm.Depth && ruleForm.Amount && getPrice(ruleForm.Depth, BigInt(ruleForm.Amount))}}</span>
            </div>
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
import { ref, reactive, watch } from "vue";
import { createPostageBatch } from "@/apis/index";
import { ElLoading, ElMessage } from 'element-plus'
import { calculateStampPrice, convertAmountToSeconds, convertDepthToBytes, secondsToTimeString } from "@/utils/index";
import { getHumanReadableFileSize } from "@/utils/file";
import {useAppModule} from "@/store/appModule";

const store = useAppModule()
defineProps({
  stampModal: {
    type: Boolean,
    default: false
  }
})

  function getFileSize(depth) {
    if (isNaN(depth) || depth < 16 || depth > 255) {
      return '-'
    }

    return `~${getHumanReadableFileSize(convertDepthToBytes(depth))}`
  }

    function getTtl(amount) {
    const isCurrentPriceAvailable = store.chainState && store.chainState.currentPrice

    if (amount <= 0 || !isCurrentPriceAvailable) {
      return '-'
    }

    const pricePerBlock = Number.parseInt(store.chainState.currentPrice, 10)

    return `${secondsToTimeString(
      convertAmountToSeconds(amount, pricePerBlock),
    )} (with price of ${pricePerBlock.toFixed(0)} per block)`
  }

  function getPrice(depth, amount) {
    const hasInvalidInput = amount <= 0 || isNaN(depth) || depth < 17 || depth > 255

    if (hasInvalidInput) {
      return '-'
    }

    const price = calculateStampPrice(depth, amount)

    return `${price.toSignificantDigits()} HOP`
  }

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
:deep(.el-input-number .el-input__inner) {
text-align: left;
}
</style>
