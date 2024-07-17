import { uuidv4 } from '@/utils'
import { getComState, createControlForm } from '../index'
export const getConfig = () => ({
  componentName: /** @type {const} */('HotArea'),
  name: /** @type {const} */('热区'),
  contentFormLayout: createContentFormLayout(),
  state: getComState(),
  controlForm: createControlForm(createContentFormLayout)
})

function createContentFormLayout() {
  return [
    {
      label: /** @type {const} */('展示设置'),
      list: [
        {
          type: /** @type {const} */('UploadImgs'),
          label: /** @type {const} */(''),
          key: /** @type {const} */('hotAreaImgs') /* 风格 */,
          value: ''
        }
      ],
      id: uuidv4()
    }
  ]
}

/** @typedef {ReturnType<getConfig>['controlForm']} ControlForm */
