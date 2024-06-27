import { computed, getCurrentInstance } from 'vue'
// @ts-check

/**
 * @description 如果传入的是一个对象, 若这个对象某个属性变化了会触发更新赋值整个对象
 * @template {{[key: string]: any}} T
 * @template {keyof T} K
 * @param {T} props
 * @param {K} key
 */
export default function useVModel(props, key) {
  const context = getCurrentInstance()
  if (!context) throw new Error('useVModel() 只能在setup内执行!')
  return computed({
    /**
     * @returns {T[K]}
     */
    get() {
      const target = props[key]
      if (Object.prototype.toString.call(target) !== '[object Object]') return target
      return new Proxy(target, {
        set(raw, k, newVal) {
          context.emit?.(`update:${key}`, { ...raw, [k]: newVal })
          return true
        }
      })
    },
    set(val) { context.emit?.(`update:${key}`, val) }
  })
}
