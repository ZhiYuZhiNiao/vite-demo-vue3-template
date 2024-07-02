<template>
  <ElForm
    v-bind="$attrs"
    :model="_modelValue"
    inline
  >
    <ElFormItem
      v-for="item of props.searchList"
      :key="item.key"
      v-bind="item.formItemProps"
    >
      <SearchFormItem
        :item="item"
        v-model.trim="_modelValue[item.key]"
      />
    </ElFormItem>
    <ElFormItem>
      <ElButton @click="$emit('onSearch')">搜索</ElButton>
    </ElFormItem>
    <ElFormItem>
      <ElButton @click="$emit('onClear')">清空</ElButton>
    </ElFormItem>
  </ElForm>
</template>
<script setup>
// @ts-check
import SearchFormItem from '@/components/SearchForm/SearchFormItem/index.vue'
import { useVModel } from '@/hook'
import { ElFormItem } from 'element-plus'

/** @type {import('element-plus').FormProps & import('./indexType').Props} */
const props = (defineProps({
  searchList: Array,
  modelValue: Object,
  inline: {
    type: Boolean,
    default: true
  }
}))

/**
 * @type {{
 *  (e: 'update:modelValue', value: import('./indexType').Props['modelValue']): void
 *  (e: 'onSearch'): void
 *  (e: 'onClear'): void
 * }}
 */
const emit = defineEmits(['update:modelValue', 'onSearch', 'onClear'])

const _modelValue = useVModel(props, 'modelValue')

</script>
<style lang="scss" scoped>

</style>
