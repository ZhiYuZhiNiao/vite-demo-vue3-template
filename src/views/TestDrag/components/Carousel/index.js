import { uuidv4 } from '@/utils'
import { getComState } from '../index'

export const getConfig = () => ({
  componentName: /** @type {const} */('Carousel'),
  name: /** @type {const} */('轮播图'),
  contentFormLayout: [
    {
      label: /** @type {const} */('展示设置'),
      list: [
        {
          type: /** @type {const} */('RadioGroup'),
          options: getStyleOpts(),
          label: /** @type {const} */('选择风格'),
          key: /** @type {const} */('carouselStyle') /* 风格 */,
          value: /** @type {ReturnType<getStyleOpts>[number]['value']} */(1)
        }
      ],
      id: uuidv4()
    }
  ],
  styleFormLayout: [],
  state: getComState()
})

/**
 * @description 获取风格opts
 */
function getStyleOpts() {
  return [
    /** @type {const} */({ label: '样式一', value: 1, key: 1, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '样式二', value: 2, key: 2, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '样式三', value: 3, key: 3, disabled: /** @type {boolean} */(false) })
  ]
}
