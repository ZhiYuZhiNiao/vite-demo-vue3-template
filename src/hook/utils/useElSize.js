import { unref, watchEffect, onBeforeUnmount, toRefs, onMounted, ref } from 'vue'
/**
 * @overload
 * @param {string} selector 选择器
 * @returns {import('vue').ToRefs<DOMRectReadOnly>}
 */

/**
 * @overload
 * @param {import('vue').MaybeRef<HTMLElement | null>} el dom元素
 * @returns {import('vue').ToRefs<DOMRectReadOnly>}
 */

/**
 * @param {import('vue').MaybeRef<HTMLElement | null> | string} el
 */
export default function useElSize(el) {
  const _el = unref(el)
  const state = ref(/** @type {DOMRectReadOnly} */({}))
  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      // 每个entry代表一个被观察的元素
      // entry.contentRect包含了元素的尺寸信息
      console.log('Element:', entry.target)
      console.log('Element size:', entry.contentRect.height)
      state.value = { ...entry.contentRect }
      // 在这里执行你需要的操作
    }
  })

  if (typeof _el === 'string') {
    let htmlEl = null
    onMounted(() => {
      htmlEl = document.querySelector(_el)
      htmlEl && resizeObserver.observe(htmlEl)
    })
    onBeforeUnmount(() => {
      htmlEl && resizeObserver.unobserve(htmlEl)
    })
  } else {
    watchEffect(() => {
      unref(el) && resizeObserver.observe(unref(el))
    })
    onBeforeUnmount(() => {
      unref(el) && resizeObserver.unobserve(unref(el))
    })
  }
  return {
    ...toRefs(state.value)
  }
}
