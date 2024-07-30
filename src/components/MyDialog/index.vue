<template>
  <el-dialog
    v-model="show"
    title="Tips"
    width="500"
    v-bind="$attrs"
  >
    <el-form :ref="setFormRef" :model="formModel" :rules="rules">
      <el-form-item label="名称" prop="sName">
        <el-input v-model="formModel.sName" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button :loading="loading" @click="onTest">测试</el-button>
        <el-button :loading="loading" @click="show = false">取消</el-button>
        <el-button :loading="loading" @click="onSave" type="primary">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
// @ts-check
import { useDialog, useOptions } from '@/hook'
// import useRequest from '@/hook/useRequest'
import { Get, Add, Edit, GetPageToList } from '@/api/Goods'
// import { completeAssign } from '@/utils'
import { reactive, ref } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  code: String
})

// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['success'])

const rules = createRules()
const { formModel, setFormRef, show, loading, onSave } = useDialog({
  initFormModel: {
    sName: '',
    sFace: ''
  },
  Add,
  Edit,
  Get
})

// const resData = reactive(useDialog({
//   initFormModel: createInitModel(),
//   Get, Add, Edit
// }))

if ('code' in formModel.value) {
  //
}

const testData = ref({
  count: 0
})

const resData2 = reactive(useOptions(GetPageToList, {
  props: {
    label: 'sName',
    value: 'code'
  },
  deps: [testData]
}))

console.log(resData2)

// console.log('opts=', opts)

// const { dataList } = useRequest(Get, {
//   initDataList: createInitModel(),
//   formatDataListFn(data) {
//     return completeAssign(createInitModel(), data)
//   }
// })

const onTest = () => {
  testData.value.count++
}

function createInitModel() {
  return {
    sName: '',
    list: [{ age: 1, name: '' }],
    get name() {
      return this.sName + '张三'
    }
  }
}

console.log(createInitModel)

function createRules() {
  return /** @type {import('element-plus').FormRules<ReturnType<typeof createInitModel>>} */ ({
    sName: [
      { required: true, message: '请输入', trigger: 'blur' }
    ]
  })
}
</script>

<style scoped>
.my-dialog-container {
  font-size: 18px;
}
</style>
@/hook/components/useDialog@/hook/components/useOptions
