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
    <el-checkbox v-for="item in canCheckList" :key="item.value" :label="item.value">
      {{ item.label || '' }}
    </el-checkbox>
  </el-checkbox-group>
</template>
<script setup>
import { computed, watchEffect } from 'vue'
import { useVModel } from '@/hook/useVModel.js'
import { useCheckBox } from './useCheckBox.js'

/**
 * @typedef Props
 * @property {readonly string[]} modelValue
 * @property {readonly {[key: string | symbol], value: string | number, label: string, disabled: boolean}[]} showList
 * @property {readonly boolean} multiple
 */

/**
 * @type {Props}
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
  }
})

const emit = defineEmits(['update:modelValue'])

// 这个放在use里面更好把, 不然不知道状态在哪里修改了
const checkedCodes = useVModel(props, 'modelValue', emit)

/* 全选与否的状态是根据当前可选项来的 */
const canCheckList = computed(() => props.showList.filter(el => !el.disabled))

const { isCheckAll, isIndeterminate, disableCheckAllBtn, updateCheckAllBtnState, onCheckAllChange } = useCheckBox(checkedCodes, canCheckList, emit)

/* canCheckList or checkedCodes 变化 手动更新全选按钮的状态 */
watchEffect(updateCheckAllBtnState)

</script>
<style lang="scss" scoped>
</style>
