import { onBeforeUnmount, unref, watchEffect } from 'vue'

/**
 * @overload
 * @param {string} selector 选择器
 * @param {Parameters<Element['addEventListener']>[0]} eventName
 * @param {Parameters<Element['addEventListener']>[1]} fn
 * @param {Parameters<Element['addEventListener']>[2]} param
 * @returns {void}
 */

/**
 * @overload
 * @param {import('vue').MaybeRef<HTMLElement | null>} el Dom元素
 * @param {Parameters<Element['addEventListener']>[0]} eventName
 * @param {Parameters<Element['addEventListener']>[1]} fn
 * @param {Parameters<Element['addEventListener']>[2]} [param]
 * @returns {void}
 */

/**
 * @param {import('vue').MaybeRef<HTMLElement | null> | string} el
 * @param {Parameters<Element['addEventListener']>[0]} eventName
 * @param {Parameters<Element['addEventListener']>[1]} fn
 * @param {Parameters<Element['addEventListener']>[2]} [param]
 */
export default function useAddEventListener(el, eventName, fn, param) {
  const _el = unref(el)
  let htmlEl = null
  if (typeof _el === 'string') {
    const selector = _el
    htmlEl = document.querySelector(selector)
    htmlEl?.addEventListener(eventName, fn, param)
  } else {
    watchEffect(() => {
      unref(el)?.addEventListener(eventName, fn, param)
    })
  }
  onBeforeUnmount(() => {
    unref(el)?.removeEventListener(eventName, fn)
    htmlEl?.removeEventListener(eventName, fn)
  })
}
