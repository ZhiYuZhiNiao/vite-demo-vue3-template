import { getComState } from '../index'
export const getConfig = () => ({
  componentName: /** @type {const} */('BottomNav'),
  name: /** @type {const} */('底部导航'),
  state: getComState('fromMiddle')
})
