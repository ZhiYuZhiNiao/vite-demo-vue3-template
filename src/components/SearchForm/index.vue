<template>
  <ElForm
    v-bind="$attrs"
    :model="_modelValue"
  >
    <ElFormItem
      v-for="item of props.searchList"
      :key="item.key"
      v-bind="item.formItemProps"
    >
      <SearchFormItem
        :item="item"
        v-model="_modelValue[item.key]"
      />
    </ElFormItem>
  </ElForm>
</template>
<script setup>
// @ts-check
import SearchFormItem from '@/components/SearchForm/SearchFormItem/index.vue'
import { useVModel } from '@/hook'
import { ElFormItem } from 'element-plus'
/** @type {import('./type').Props} */
const props = (defineProps({
  searchList: Array,
  modelValue: Object
}))

/** @type {import('./type').Emit} */
const emit = defineEmits(['update:modelValue'])

const _modelValue = useVModel(props, 'modelValue', emit)

</script>
<style lang="scss" scoped>

</style>
