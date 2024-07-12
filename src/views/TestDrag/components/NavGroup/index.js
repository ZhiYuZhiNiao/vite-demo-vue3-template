// @ts-check
import { uuidv4 } from '@/utils'
import { getComState, createControlForm } from '../index'

export const getConfig = () => ({
  state: getComState(),
  componentName: /** @type {const} */('NavGroup'),
  name: /** @type {const} */('导航组'),
  contentFormLayout: createContentFormLayout(),
  styleFormLayout: [],
  controlForm: createControlForm(createContentFormLayout)
})

function createContentFormLayout() {
  return [
    {
      label: /** @type {const} */('展示设置'),
      list: [
        {
          type: /** @type {const} */('RadioGroup'),
          options: getStyleOpts(),
          label: /** @type {const} */('导航样式'),
          key: /** @type {const} */('navGroupStyle'),
          value: /** @type {ReturnType<getStyleOpts>[number]['value']} */(1)
        },
        {
          type: /** @type {const} */('RadioGroup'),
          options: getSingleRowTypeOpts(),
          label: /** @type {const} */('单行显示'),
          key: /** @type {const} */('navGroupSingleRowType'),
          value: /** @type {ReturnType<getSingleRowTypeOpts>[number]['value']} */(1)
        },
        {
          type: /** @type {const} */('RadioGroup'),
          options: getShowStyleOpts(),
          label: /** @type {const} */('展示样式'),
          key: /** @type {const} */('navGroupShowStyle'),
          value: /** @type {ReturnType<getShowStyleOpts>[number]['value']} */(1)
        }
      ],
      id: uuidv4()
    }
  ]
}

/**
 * @description 获取导航样式opts
 */
function getStyleOpts() {
  return [
    /** @type {const} */({ label: '图片加文字', value: 1, key: 1, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '图片', value: 2, key: 2, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '文字', value: 3, key: 3, disabled: /** @type {boolean} */(false) })
  ]
}

/**
 * @description 获取导航样式opts
 */
function getSingleRowTypeOpts() {
  return [
    /** @type {const} */({ label: '3个', value: 1, key: 1, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '4个', value: 2, key: 2, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '5个', value: 3, key: 3, disabled: /** @type {boolean} */(false) })
  ]
}

/**
 * @description 获取展示样式opts
 */
function getShowStyleOpts() {
  return [
    /** @type {const} */({ label: '固定显示', value: 1, key: 1, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '分页滑动', value: 2, key: 2, disabled: /** @type {boolean} */(false) })
  ]
}
