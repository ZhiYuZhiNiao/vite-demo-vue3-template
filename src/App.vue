<template>
  <div class="app-container">
    <UTable :search-config="uTable.searchConfig" />
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import UTable from '@/components/UTable/index.vue'
const uTable = reactive({
  /** @type {import('@/components/UTable/type').SearchItemConfig[]} */
  searchConfig: [
    { type: 'input', key: 'name', value: '', props: { placeholder: '请输入名称搜索' }, formItemProps: { label: '名称' } },
    { type: 'select', key: 'type', value: null, props: { placeholder: '请选择类型' }, formItemProps: { label: '类型' }, options: [] },
    { type: 'date-picker', key: 'time', value: null, props: { placeholder: '请选择日期', type: 'daterange' }, formItemProps: { label: '日期' } }
  ]
})
</script>
<style lang="scss" scoped>
.app-container {
  margin: 100px auto;
}
</style>
