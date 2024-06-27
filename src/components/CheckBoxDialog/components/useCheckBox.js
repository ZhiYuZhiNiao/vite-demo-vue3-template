import { computed, ref } from 'vue'
import { useVModel } from '@/hook'

/**
 * @param {import('./CheckBox.vue').Props} props
 * @param {import('./CheckBox.vue').Props['showList']} canCheckList
 * @param {import('./CheckBox.vue').Emit} emit
 * @returns
 */
export function useCheckBox(props, canCheckList, emit) {
  const checkedCodes = useVModel(props, 'modelValue', emit)
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
    checkedCodes,
    updateCheckAllBtnState,
    onCheckAllChange
  }
}
