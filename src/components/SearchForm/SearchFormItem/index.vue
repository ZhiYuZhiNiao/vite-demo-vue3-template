<template>
  <component
    :is="`el-${props.item.type}`"
    v-bind="{ ...computedProps, ...placeholder }"
    :style="props.item.type === 'select' ? { width: '190px' } : {}"
  >
    <template v-if="props.item.type === 'select'">
      <component
        :is="`el-option`"
        v-for="(option, index) of (props.item.options ?? [])"
        :key="`option--${index}`"
        :label="option[fieldName.label]"
        :value="option[fieldName.value]"
        :disabled="!!option[fieldName.disabled]"
      />
    </template>
  </component>
</template>
<script setup>
import { computed } from 'vue'
// @ts-check
/** @type {import('./indexType').Props} */
const props = (defineProps({
  item: Object
}))

const placeholder = computed(() => {
  const itemProps = props.item.props
  if (['datetimerange', 'daterange', 'monthrange'].includes(itemProps?.type)) {
    return {
      rangeSeparator: itemProps?.rangeSeparator ?? '至',
      startPlaceholder: itemProps?.startPlaceholder ?? '开始时间',
      endPlaceholder: itemProps?.endPlaceholder ?? '结束时间'
    }
  }
  const placeholder = itemProps?.placeholder ?? (props.item.type === 'input' ? '请输入' : '请选择')
  return { placeholder }
})

const fieldName = computed(() => {
  return {
    label: props.item.fieldName?.label ?? 'label',
    value: props.item.fieldName?.value ?? 'value',
    disabled: props.item.fieldName?.disabled ?? 'disabled',
    children: props.item.fieldName?.children ?? 'children'
  }
})

const computedProps = computed(() => {
  const elType = props.item.type
  const disabled = fieldName.value.disabled
  const label = fieldName.value.label
  const value = fieldName.value.value
  const children = fieldName.value.children
  let cascaderProps = props.item.props?.props ?? {}
  cascaderProps = { ...cascaderProps, disabled, label, value, children }
  const res = {
    ...props.item.props
  }
  if (elType === 'cascader') {
    res.props = cascaderProps
  }
  return res
})
</script>
