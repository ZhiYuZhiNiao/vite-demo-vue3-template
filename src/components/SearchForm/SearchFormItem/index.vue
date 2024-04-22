<template>
  <component
    :is="`el-${props.item.type}`"
    v-bind="{ ...props.item.props, ...placeholder }"
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
/** @type {import('./type').Props} */
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
    disabled: props.item.fieldName?.disabled ?? 'disabled'
  }
})
</script>
