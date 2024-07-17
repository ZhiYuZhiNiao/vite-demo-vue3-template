import { getComState, createControlForm } from '../index'
import { uuidv4 } from '@/utils'
export const getConfig = () => ({
  componentName: /** @type {const} */('BottomNav'),
  name: /** @type {const} */('底部导航'),
  contentFormLayout: createContentFormLayout(),
  state: getComState('fromMiddle'),
  controlForm: createControlForm(createContentFormLayout)
})

function createContentFormLayout() {
  return [
    {
      label: /** @type {const} */('展示设置'),
      list: [
        {
          type: /** @type {const} */('RadioGroup'),
          options: getDisplayEffectOpts(),
          label: /** @type {const} */('展示效果'),
          key: /** @type {const} */('BottomNavDisplayEffect'),
          value: /** @type {ReturnType<getDisplayEffectOpts>[number]['value']} */(1)
        },
        {
          type: /** @type {const} */('RadioGroup'),
          options: getTypeOpts(),
          label: /** @type {const} */('导航类型'),
          key: /** @type {const} */('BottomNavType'),
          value: /** @type {ReturnType<getTypeOpts>[number]['value']} */(1)
        },
        {
          type: /** @type {const} */('RadioGroup'),
          options: getStyleOpts(),
          label: /** @type {const} */('导航样式'),
          key: /** @type {const} */('BottomNavStyle'),
          value: /** @type {ReturnType<getStyleOpts>[number]['value']} */(1)
        }
      ],
      id: uuidv4()
    }
  ]
}

/**
 * @description 获取展示效果opts
 */
function getDisplayEffectOpts() {
  return [
    /** @type {const} */({ label: '系统默认', value: 1, key: 1, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '自定义', value: 2, key: 2, disabled: /** @type {boolean} */(false) })
  ]
}

/**
 * @description 获取导航类型opts
 */
function getTypeOpts() {
  return [
    /** @type {const} */({ label: '底部固定', value: 1, key: 1, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '底部悬浮', value: 2, key: 2, disabled: /** @type {boolean} */(false) })
  ]
}

/**
 * @description 获取导航样式opts
 */
function getStyleOpts() {
  return [
    /** @type {const} */({ label: '图片+文字', value: 1, key: 1, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '文字', value: 2, key: 2, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '图片', value: 3, key: 3, disabled: /** @type {boolean} */(false) })
  ]
}

/** @typedef {ReturnType<getConfig>['controlForm']} ControlForm */
