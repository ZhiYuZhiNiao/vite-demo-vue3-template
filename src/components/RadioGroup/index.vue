<template>
  <el-radio-group v-model="_modelValue">
    <el-radio
      v-for="item of props.options"
      :key="item.key"
      :value="item.value"
      :disabled="item.disabled"
    >
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>

<script setup>
import { useVModel } from '@/hook'
const props = defineProps({
  modelValue: {
    type: /** @type {import('vue').PropType<string | number>} */(String),
    required: true
  },
  options: {
    type: /** @type {import('vue').PropType<import('@/hook/components/useOptions').Options>} */(Array),
    default: () => []
  }
})

const _modelValue = useVModel(props, 'modelValue')
</script>

<style lang="scss" scoped>
</style>
