import { getComState, createControlForm } from '../index'
import { uuidv4 } from '@/utils'
export const getConfig = () => ({
  componentName: /** @type {const} */('Head'),
  name: /** @type {const} */('首页'),
  contentFormLayout: createContentFormLayout(),
  state: getComState('fromLeft'),
  controlForm: createControlForm(createContentFormLayout)
})

function createContentFormLayout() {
  return [
    {
      label: /** @type {const} */(''),
      list: [
        {
          type: /** @type {const} */('ElInput'),
          placeholder: /** @type {const} */('选填不超过30个字'),
          maxLength: 30,
          label: /** @type {const} */('页面标题'),
          key: /** @type {const} */('headTitle'),
          value: ''
        },
        {
          type: /** @type {const} */('ElSwitch'),
          label: /** @type {const} */('页面状态'),
          key: /** @type {const} */('HeadState'),
          value: true
        }
      ],
      id: uuidv4()
    }
  ]
}
