import { getComState } from '../index'
export const getConfig = () => ({
  componentName: /** @type {const} */('Head'),
  name: /** @type {const} */('首页'),
  state: getComState('fromLeft')
})
