<template>
  <ElSelect v-model="_modelValue">
    <ElOption
      v-for="item of props.options"
      :key="item.key"
      :value="item.value"
      :label="item.label"
      :disabled="item.disabled"
    />
  </ElSelect>
</template>

<script setup>
import { useVModel } from '@/hook'
const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  options: {
    type: /** @type {import('vue').PropType<import('@/hook/components/useOptions').Options>} */(Array),
    default: () => []
  }
})

const _modelValue = useVModel(props, 'modelValue')
</script>
