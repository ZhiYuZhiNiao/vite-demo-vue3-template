/**
 * @description fromLeft, fromMiddle 代表当前被拖动控件是从哪个区域被拖动的
 * @param {'fromLeft' | 'fromMiddle'} [state]
 */
export function getComState(state = 'fromLeft') {
  return state
}

/**
 * @template {Function} F
 * @param {F} createContentFormLayout
 * @returns {import('typeTool').CreateControlForm<createContentFormLayout>}
 */
export function createControlForm(createContentFormLayout) {
  const obj = {}
  for (const el of createContentFormLayout()) {
    for (const it of el.list) {
      obj[it.key] = it.value
    }
  }
  return obj
}
