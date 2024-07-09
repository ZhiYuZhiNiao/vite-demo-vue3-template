import { computed, ref, getCurrentInstance, unref, toRefs } from 'vue'
import { useVModel } from '@/hook'

/**
 * @template T
 * @template {keyof T} K
 * @param {T} props - 组件的props
 * @param {K} key - 双向绑定的codes, props的属性
 * @param {import('vue').MaybeRef<import('@/hook/components/useOptions').Options>} canCheckList
 * @returns
 */
export default function useCheckBox(props, key, canCheckList) {
  const context = getCurrentInstance()
  if (!context) throw new Error('useVModel() 只能在setup内执行!')
  const _canCheckList = unref(canCheckList)
  const checkedCodes = /** @type {import('vue').WritableComputedRef<T[K]>} */(useVModel(props, key))
  const isCheckAll = ref(false)
  const isIndeterminate = ref(false)
  const disableCheckAllBtn = computed(() => !_canCheckList.length)

  /**
   * @description checkedCodes or canCheckList 变化, 手动更新全选按钮的状态
   */
  const updateCheckAllBtnState = () => {
    isCheckAll.value = _canCheckList.length ? _canCheckList.length === checkedCodes.value.length : false
    isIndeterminate.value = checkedCodes.value.length > 0 && checkedCodes.value.length < _canCheckList.length
  }

  /**
   *
   * @param {boolean} val
   */
  const onCheckAllChange = (val) => {
    isIndeterminate.value = false
    checkedCodes.value = val ? _canCheckList.map(el => el.value) : []
    context.emit('checkAll', val, [..._canCheckList])
  }

  return {
    ...toRefs({
      isCheckAll,
      isIndeterminate,
      disableCheckAllBtn,
      checkedCodes
    }),
    updateCheckAllBtnState,
    onCheckAllChange
  }
}
