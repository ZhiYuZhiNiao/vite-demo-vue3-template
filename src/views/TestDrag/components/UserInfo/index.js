// @ts-check
import { uuidv4 } from '@/utils'
export const getConfig = () => ({
  componentName: /** @type {const} */('UserInfo'),
  name: /** @type {const} */('用户信息'),
  contentFormLayout: [
    {
      label: /** @type {const} */('展示设置'),
      list: [
        {
          type: /** @type {const} */('RadioGroup'),
          options: getStyleOpts(),
          label: /** @type {const} */('选择风格'),
          key: /** @type {const} */('userInfoStyle') /* 风格 */,
          value: /** @type {ReturnType<getStyleOpts>[number]['value']} */(1)
        },
        {
          type: /** @type {const} */('CheckGroup'),
          options: getShowTypesOpts(),
          label: /** @type {const} */('是否展示'),
          key: /** @type {const} */('userInfoShowTypes') /* 风格 */,
          value: /** @type {ReturnType<getShowTypesOpts>[number]['value'][]} */([])
        }
      ],
      id: uuidv4()
    }
  ],
  styleFormLayout: []
})

/**
 * @description 获取风格opts
 */
function getStyleOpts() {
  return [
    /** @type {const} */({ label: '样式一', value: 1, key: 1, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '样式二', value: 2, key: 2, disabled: /** @type {boolean} */(false) })
  ]
}

/**
 * @description 获取是否展示Opts
 */
function getShowTypesOpts() {
  return [
    /** @type {const} */({ label: '样式一', value: 1, key: 1, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '样式二', value: 2, key: 2, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '样式二', value: 3, key: 3, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '样式二', value: 4, key: 4, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '样式二', value: 5, key: 5, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '样式二', value: 6, key: 6, disabled: /** @type {boolean} */(false) })
  ]
}
