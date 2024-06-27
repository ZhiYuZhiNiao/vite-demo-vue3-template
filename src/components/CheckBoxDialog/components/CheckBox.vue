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
    <el-checkbox v-for="item of props.showList" :key="item.value" :label="item.value" :disabled="item.disabled">
      {{ showLabel?.(item) ?? (item.label || '') }}
    </el-checkbox>
  </el-checkbox-group>
</template>
<script setup>
import { computed, watchEffect } from 'vue'
import { useCheckBox } from './useCheckBox.js'

/**
 * @typedef {Object} Props
 * @property {string[]} modelValue - 双向绑定的勾选项的codes
 * @property {{[key: string]: any, value: string, label: string, disabled: boolean}[]} showList
 * @property {boolean} multiple
 */

/**
 * @type {Readonly<Props>}
 */
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  showList: {
    type: Array,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: true
  },
  showLabel: {
    type: Function,
    default: null
  }
})

/**
 * @typedef {{
 *  (e: 'update:modelValue', value: Props['modelValue']): void
 *  (e: 'checkAll', val: boolean, list: Props['showList']): void
 * }} Emit
 */

/** @type {Emit} */
const emit = defineEmits(['update:modelValue', 'checkAll'])

/* 全选与否的状态是根据当前可选项来的 */
const canCheckList = computed(() => props.showList.filter(el => !el.disabled))

const { checkedCodes, isCheckAll, isIndeterminate, disableCheckAllBtn, updateCheckAllBtnState, onCheckAllChange } = useCheckBox(props, canCheckList, emit)

/* canCheckList or checkedCodes 变化 手动更新全选按钮的状态 */
watchEffect(updateCheckAllBtnState)

</script>
<style lang="scss" scoped>
</style>
