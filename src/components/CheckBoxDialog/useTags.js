import { useVModel } from '@/hook/useVModel'
import { computed, toValue } from 'vue'

export function useTags(props, propsKey, emit, showList) {
  const tags = useVModel(props, propsKey, emit)
  const prevTags = computed(() => {
    const codes = tags.value.map(el => el.value)
    return showList.value.filter(el => codes.includes(el.value))
  })

  /**
   *
   * @param {{value: string, label: string, disabled: boolean, [key: string]: any}[]} curTags
   */
  function updateTags(curTags) {
    // 每次改变都需要进行比较然后更新, 就是上一次check-box 中勾选的 和 这一次 check-box 中勾选的进行比较,
    const { addItems, delItems } = diffTags(prevTags, curTags)
    tags.value = getTags(addItems, delItems, tags.value)
  }

  function getTags(addItems, delItems, tags) {
    tags = [...tags, ...addItems]
    // this.checkedItems = [...new Set(this.checkedItems)]
    const delCodes = delItems.map(el => el.value)
    tags = tags.filter(el => {
      return !delCodes.includes(el.value)
    })
    return tags
  }

  function diffTags(prevItems, curItems) {
    prevItems = toValue(prevItems)
    curItems = toValue(curItems)
    const addItems = []
    const delItems = []
    const curCodes = curItems.map(el => el.value)
    const prevCodes = prevItems.map(el => el.value)
    // prevCodes 中有的, curCodes 中没有的就是减少的
    for (const prevItem of prevItems) {
      if (!(curCodes.includes(prevItem.value))) {
        delItems.push(prevItem)
      }
    }
    // curCodes 中有的, prevCodes 中没有的就是新增的
    for (const curItem of curItems) {
      if (!(prevCodes.includes(curItem.value))) {
        addItems.push(curItem)
      }
    }
    return {
      addItems,
      delItems
    }
  }
  return {
    tags,
    updateTags
  }
}
