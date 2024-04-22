import { computed, ref } from 'vue'

/**
 * @template T
 * @typedef {import('vue/dist/vue').ComputedRef<T>} ComputedRef
 */

/**
 * @param {import('vue/dist/vue').WritableComputedRef<string[]>} checkedCodes
 * @param {ComputedRef<{[key: string | symbol], value: string | number, label: string, disabled: boolean}[]>} canCheckList
 * @returns
 */
export function useCheckBox(checkedCodes, canCheckList, emit) {
  const isCheckAll = ref(false)
  const isIndeterminate = ref(false)
  const disableCheckAllBtn = computed(() => !canCheckList.value.length)

  /**
   * @description checkedCodes or canCheckList 变化, 手动更新全选按钮的状态
   */
  const updateCheckAllBtnState = () => {
    isCheckAll.value = canCheckList.value.length ? canCheckList.value.length === checkedCodes.value.length : false
    isIndeterminate.value = checkedCodes.value.length > 0 && checkedCodes.value.length < canCheckList.value.length
  }

  /**
   *
   * @param {boolean} val
   */
  const onCheckAllChange = (val) => {
    isIndeterminate.value = false
    checkedCodes.value = val ? canCheckList.value.map(el => el.value) : []
    emit('checkAll', val, [...canCheckList.value])
  }

  return {
    isCheckAll,
    isIndeterminate,
    disableCheckAllBtn,
    updateCheckAllBtnState,
    onCheckAllChange
  }
}
