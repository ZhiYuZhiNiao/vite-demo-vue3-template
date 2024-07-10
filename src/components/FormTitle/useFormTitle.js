import { reactive, toRefs } from 'vue'

/**
 * @param {string} [title]
 */
export default function useFormTitle(title) {
  const entries = createEntries().map(([k, v]) => /** @type {[typeof k, import('typeTool').Writable<typeof v>]} */([k, { ...v }]))
  const state = reactive({
    m: new Map(entries),
    activeType: /** @type {ReturnType<createEntries>[number][0]} */('content'),
    title: title ?? ''
  })
  return {
    ...toRefs(state)
  }
}

function createEntries() {
  return [
    /** @type {const} */(['content', { value: 'content', label: '内容', activeColor: 'var(--el-color-primary)', color: 'var(--el-color-primary)' }]),
    /** @type {const} */(['style', { value: 'style', label: '样式', activeColor: 'var(--el-color-primary)', color: '#f9f9f9' }])
  ]
}
