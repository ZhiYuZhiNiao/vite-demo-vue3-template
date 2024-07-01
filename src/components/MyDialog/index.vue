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
import useDialog from '@/hook/useDialog'
// import useRequest from '@/hook/useRequest'
import useOptions from '@/hook/useOptions'
import { Get, Add, Edit, testReqFn2 } from '@/api/Goods'
// import { completeAssign } from '@/utils'
import { reactive, ref } from 'vue'


const props = defineProps({
  code: String
})

const emit = defineEmits(['success'])

const rules = createRules()
const { formModel, setFormRef, show, loading, onSave } = useDialog({
  initFormModel: {
    sName: '',
    sFace: '',
    get name() {
      return this.sName + 'zz'
    }
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
  formModel.value
}

const testData = ref({
  count: 0
})

const { dataList: opts } = useOptions(testReqFn2, {
  props: {
    label: 'sName',
    value: 'code'
  },
  deps: [testData]
})

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
    list: [{age: 1, name: ''}],
    get name() {
      return this.sName + '张三'
    }
  }
}

function createRules() {
  return /** @type {import('element-plus').FormRules<ReturnType<typeof createInitModel>>} */ ({
    sName: [
      { required: true, message: '请输入', trigger: 'blur'}
    ]
  })
}
</script>

<style scoped>
.my-dialog-container {
  font-size: 18px;
}
</style>
