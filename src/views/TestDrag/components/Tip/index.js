import { getComState } from '../index'
export const getConfig = () => ({
  componentName: /** @type {const} */('Tip'),
  name: /** @type {const} */('虚拟提示组件'),
  state: getComState('fromMiddle')
})
