import { onBeforeUnmount, unref, watchEffect } from 'vue'

/**
 * @param {import('vue').MaybeRef<HTMLElement | null>} el
 * @param {Parameters<Element['addEventListener']>[0]} eventName
 * @param {Parameters<Element['addEventListener']>[1]} fn
 * @param {boolean} [flag]
 */
export default function useAddEventListener(el, eventName, fn, flag = false) {
  watchEffect(() => {
    unref(el)?.addEventListener(eventName, fn, flag)
  })

  onBeforeUnmount(() => {
    unref(el)?.removeEventListener(eventName, fn, flag)
  })
}
