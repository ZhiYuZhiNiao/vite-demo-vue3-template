<template>
  <el-checkbox
    v-if="props.multiple"
    v-model="isCheckAll"
    :indeterminate="isIndeterminate"
    :disabled="disableCheckAllBtn"
    @change="onCheckAllChange"
    >
    全选
  </el-checkbox>
  <el-checkbox-group
    v-model="checkedCodes"
    v-bind="$attrs"
  >
    <el-checkbox
      v-for="item of props.options"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
    >
      {{ showLabel?.(item) ?? (item.label || '') }}
    </el-checkbox>
  </el-checkbox-group>
</template>
<script setup>
// @ts-check
import { computed, watchEffect } from 'vue'
import { useCheckBox } from '@/hook'

const props = defineProps({
  modelValue: {
    type: /** @type {import('vue').PropType<string[]>} */(Array),
    required: true
  },
  options: {
    type: /** @type {import('vue').PropType<import('@/hook/components/useOptions').Options>} */(Array),
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: false
  },
  showLabel: {
    type: Function,
    default: null
  }
})

defineEmits(['update:modelValue', 'checkAll'])

/* 全选与否的状态是根据当前可选项来的 */
const canCheckList = computed(() => props.options.filter(el => !el.disabled))

const { checkedCodes, isCheckAll, isIndeterminate, disableCheckAllBtn, updateCheckAllBtnState, onCheckAllChange } = useCheckBox(props, 'modelValue', canCheckList)

/* canCheckList or checkedCodes 变化 手动更新全选按钮的状态 */
watchEffect(updateCheckAllBtnState)

</script>
<style lang="scss" scoped>
</style>
