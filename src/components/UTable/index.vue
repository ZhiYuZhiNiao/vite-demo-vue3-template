<template>
  <div class="u-table-container">
    <div class="left-box">
      <slot name="left" />
    </div>
    <div class="main-box">
      <div class="search-box">
        <SearchForm
          v-model="searchForm"
          :search-list="props.searchConfig"
        />
      </div>
      <div class="table-box">
        <ElTable>

        </ElTable>
      </div>
      <div class="pagination-box">
        <el-pagination
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          background
          layout="total, sizes, prev, pager,next,jumper"
          :page-count="pageCount"
          :total="total"
          @change="onChange"
        />
      </div>
    </div>
    <div class="right-box">
      <slot name="right" />
    </div>
  </div>
</template>
<script setup>
// @ts-check
import { ref, watch, useAttrs } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { list2Obj, fliterAndSplitObjByKey } from '@/utils/index'
import { usePagination } from '@/hook'

/** @type {Readonly<import('./indexType').Props>} */
const props = (defineProps({
  searchConfig: Array,
  api: Object
}))

/**
 * @typedef {object} SlotsType
 * @prop {() => any} [left]
 * @prop {() => any} [right]
 */

/** @type {SlotsType} */
// eslint-disable-next-line no-unused-vars
const slots = defineSlots()

const attrs = useAttrs()
console.log('attrs', attrs)
const tableProps = fliterAndSplitObjByKey(attrs, 't-')
const formProps = fliterAndSplitObjByKey(attrs, 'f-')

const searchForm = ref(list2Obj(props.searchConfig))
const { pageNum, pageSize, pageCount, total, onChange, setPageCount, setTotal } = usePagination({
  onChange() {}
})

/** @type {import('vue').Ref<{[k: string]: any, code: string}[]>} */
const tableData = ref([])

async function getTableDate() {
  const { api } = props
  const res = await api?.getListApi?.(searchForm.value)
  if (res?.dataList) {
    tableData.value = res.dataList
  }
  if (res) {
    setPageCount(res.totalPage)
    setTotal(res.recordCount)
  }
}

getTableDate()

watch(searchForm, (newVal) => {
  console.log('newVal', newVal)
})

</script>
<style lang="scss" scoped>
.u-table-container {
  display: flex;
  &>.main-box {
    flex: 1;
  }
}
</style>
