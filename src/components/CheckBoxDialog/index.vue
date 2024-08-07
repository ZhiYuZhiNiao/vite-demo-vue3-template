<template>
  <el-dialog
    v-model="show"
    v-bind="$attrs"
    width="800px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @open="onOpen"
  >
    <div v-loading="loading" class="check-box-dialog--container">
      <div class="search-box">
        <el-row>
          <slot name="search" />
          <el-col :span="4">
            <el-button v-if="searchObj" style="margin-left: 10px;" type="primary" @click="onSearch">搜索</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="top-box">
        <div class="check-box">
          <MyCheckBox
            v-model="checkedCodes"
            :multiple="multiple"
            :showList="showList"
            @change="onCheckChange"
            @checkAll="onCheckAll"
          />
        </div>
        <div class="pagination-box">
          <el-pagination
            :total="pagination.total"
            :v-model:page-size="pagination.pageSize"
            :v-model:current-page="pagination.pageNum"
            :page-count="pagination.totalPage"
            background
            layout="prev, pager, next"
            @change="pagination.onChange"
          />
        </div>
      </div>
      <div class="bottom-box">
        <Tags
          v-model="tags"
          :showTagContent="showTagContent"
          @close="onTagClose"
        />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="onSave">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import MyCheckBox from './components/CheckBox.vue'
import Tags from './components/Tags.vue'
import { usePagination, useVModel } from '@/hook'
import { useTags } from './useTags'

/**
 * @typedef {Object} Props
 * @prop {boolean} show - 双向绑定的值, 控制对话框显示隐藏
 * @prop {string[]} modelValue - 双向绑定的值, 勾选项的code
 * @prop {boolean} multiple - 控制checkbox 是否多选的
 * @prop {{label:string,value:string,disabled:string}} props - 用于checkbox 内部使用的字段, 默认值就是对应的key名
 * @prop {(...args: any[]) => Promise<any>} reqListApi - 搜索之后的请求
 * @prop {Record<string, any>} searchObj
 */

/** @type {Props} */
const props = defineProps({
  show: [Boolean],
  modelValue: {
    type: Array,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: true
  },
  props: {
    type: Object,
    default: () => ({
      label: 'label',
      value: 'value',
      disabled: 'disabled'
    })
  },
  reqListApi: {
    type: Function,
    default: null
  },

  searchObj: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:show', 'update:modelValue', 'update:searchObj', 'success'])

const show = useVModel(props, 'show', emit)

const searchObj = useVModel(props, 'searchObj', emit)

const pagination = reactive(usePagination({
  onChange() {
    getCheckList()
  }
}))

const { setPageCount, setTotal } = pagination

const loading = ref(false)

/**
 * @type {import('vue').Ref<string[]>}
 */
const checkedCodes = ref([])

const checkList = ref(/** @type {Record<string, any>[]} */ ([]))

const showList = computed(() => {
  const { props: _props } = props
  return checkList.value.map(el => ({
    value: /** @type {string} */ (el[_props.value]),
    label: /** @type {string} */  (el[_props.label]),
    disabled: !!el[_props.disabled],
    ...el
  }))
})

// tags 就是 v-model 对应的值
const { tags, updateTags } = useTags(props, 'modelValue', emit, showList)

const onSave = () => {
  emit('success')
}

/**
 * @param {string[]} vals
 */
const onCheckChange = (vals) => {
  /* 当前勾选的tags */
  const curTags = showList.value.filter(el => vals.includes(el.value))
  updateTags(curTags)
}

/**
 * @param {boolean} val
 * @param {any[]} canCheckList
 */
const onCheckAll = (val, canCheckList) => {
  updateTags(val ? canCheckList : [])
}

const onTagClose = (index, tag) => {
  /* 关闭tag, checkCodes 也可能发生变化  */
  checkedCodes.value = checkedCodes.value.filter(val => val !== tag.value)
}

const onSearch = () => {
  getCheckList()
}

const onOpen = () => {
  getCheckList()
}

const getCheckList = async() => {
  if (!props.reqListApi) return false
  const { pageNum, pageSize } = pagination
  const params = {
    pageNum,
    pageSize,
    ...searchObj.value
  }
  loading.value = true
  const res = await props.reqListApi(params).finally(() => { loading.value = false })
  if (res?.dataList) {
    checkList.value = res.dataList
    setTotal(res.RecordCount)
    setPageCount(res.TotalPage)
  } else {
    checkList.value = []
  }

  const codes = tags.value.map(el => el.value)
  // 更新checkCodes字段, 当 list 更新
  checkedCodes.value = showList.value.filter(el => codes.includes(el.value)).map(el => el.value)
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
