// @ts-check
import { uuidv4 } from '@/utils'

export const getConfig = () => ({
  componentName: /** @type {const} */('ArticleList'),
  name: /** @type {const} */('文章列表'),
  contentFormLayout: [
    {
      label: /** @type {const} */('展示设置'),
      list: [
        {
          type: /** @type {const} */('RadioGroup'),
          options: getStyleOpts(),
          label: /** @type {const} */('选择风格'),
          key: /** @type {const} */('articleListStyle') /* 风格 */,
          value: /** @type {ReturnType<getStyleOpts>[number]['value']} */(1)
        }
      ],
      id: uuidv4()
    },
    {
      label: /** @type {const} */('文章设置'),
      list: [
        {
          type: /** @type {const} */('Select'),
          options: getClassOpts(),
          label: /** @type {const} */('文章分类'),
          key: /** @type {const} */('articleListClass'),
          value: /** @type {ReturnType<getClassOpts>[number]['value']} */(1)
        },
        {
          type: /** @type {const} */('ElInputNumber'),
          placeholder: '',
          label: /** @type {const} */('文章数量'),
          key: /** @type {const} */('articleListNum'),
          value: /** @type {number | undefined} */(undefined)
        }
      ],
      id: uuidv4()
    },
    {
      label: /** @type {const} */('列表设置'),
      list: [
        {
          type: /** @type {const} */('CheckGroup'),
          options: getIsShowOpts(),
          label: /** @type {const} */('是否显示'),
          key: /** @type {const} */('articleListIsShow'),
          value: /** @type {ReturnType<getIsShowOpts>[number]['value'][]} */([])
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
    /** @type {const} */({ label: '大图展示', value: 1, key: 1, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '两列展示(纵向)', value: 2, key: 2, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '两列展示(横向)', value: 3, key: 3, disabled: /** @type {boolean} */(false) })
  ]
}

/**
 * @description 获取文章分类opts
 */
function getClassOpts() {
  return [
    /** @type {const} */({ label: '好物推荐', value: 1, key: 1, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '购物心得', value: 2, key: 2, disabled: /** @type {boolean} */(false) })
  ]
}

/**
 * @description 获取是否显示opts
 */
function getIsShowOpts() {
  return [
    /** @type {const} */({ label: '时间日期', value: 1, key: 1, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '浏览量', value: 2, key: 2, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '点赞', value: 3, key: 3, disabled: /** @type {boolean} */(false) })
  ]
}
