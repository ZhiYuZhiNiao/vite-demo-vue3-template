// @ts-check
export const getConfig = () => ({
  componentName: /** @type {const} */('GoodsList'),
  name: /** @type {const} */('商品列表'),
  contentFormLayout: [
    {
      label: /** @type {const} */('列表设置'),
      list: [
        {
          type: /** @type {const} */('RadioGroup'),
          options: getStyleOpts(),
          label: /** @type {const} */('选择风格'),
          key: /** @type {const} */('goodsListStyle') /* 风格 */,
          value: /** @type {ReturnType<getStyleOpts>[number]['value']} */(1)
        }
      ]
    },
    {
      label: /** @type {const} */('商品设置'),
      list: [
        {
          type: /** @type {const} */('Select'),
          options: getSelectMethodOpts(),
          label: /** @type {const} */('选择方式'),
          key: /** @type {const} */('goodsListSelectMethod'),
          value: /** @type {ReturnType<getSelectMethodOpts>[number]['value']} */(1)
        },
        {
          type: /** @type {const} */('UploadImgs'),
          label: /** @type {const} */('选择商品'),
          key: /** @type {const} */('goodsListImgs'),
          value: /** @type {string[]} */([])
        }
      ]
    },
    {
      label: /** @type {const} */('显示内容'),
      list: [
        {
          type: /** @type {const} */('RadioGroup'),
          options: getShowContentOpts(),
          label: /** @type {const} */('展示内容'),
          key: /** @type {const} */('goodsListShowContent'),
          value: /** @type {ReturnType<getShowContentOpts>[number]['value'][]} */([])
        }
      ]
    }
  ],
  styleFormLayout: []
})

/**
 * @description 获取风格opts
 */
function getStyleOpts() {
  return [
    /** @type {const} */({ label: '单列展示', value: 1, key: 1, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '两列展示(纵向)', value: 2, key: 2, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '三列展示', value: 3, key: 3, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '两列展示(横向)', value: 4, key: 4, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '大图展示', value: 5, key: 5, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '左右滑动展示', value: 6, key: 6, disabled: /** @type {boolean} */(false) })
  ]
}

/**
 * @description 获取选择方式Opts
 */
function getSelectMethodOpts() {
  return [
    /** @type {const} */({ label: '指定商品', value: 1, key: 1, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '指定品牌', value: 2, key: 2, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '指定分类', value: 3, key: 3, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '商品标签', value: 4, key: 4, disabled: /** @type {boolean} */(false) })
  ]
}

/**
 * @description 获取展示内容Opts
 */
function getShowContentOpts() {
  return [
    /** @type {const} */({ label: '商品名称', value: 1, key: 1, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '商品标签', value: 2, key: 2, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '商品价格', value: 3, key: 3, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '商品销量', value: 4, key: 4, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '商品评分', value: 5, key: 5, disabled: /** @type {boolean} */(false) }),
    /** @type {const} */({ label: '会员价格', value: 6, key: 6, disabled: /** @type {boolean} */(false) })
  ]
}
