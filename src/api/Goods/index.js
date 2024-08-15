/**
 * @template [T=any]
 * @typedef {object} ResData<T>
 * @prop {T | null} dataList 主体数据
 * @prop {{} | null} [info]
 * @prop {number} [recordCount] 总记录条数
 * @prop {number} [totalPage] 总页数
 */

/**
 * @description - 商品表
 * @typedef {Object} Data
 *
 * @property {string} code - 商品主键。程序自增生成的32位字符串。
 * @property {string} fkCust - 客户编码。长度为4的字符串，为外键，参照TbCustomer表。
 * @property {string} sName - 商品名称。长度为50的字符串。
 * @property {string} sImg - 商品图片地址。长度为50的字符串。
 * @property {string} fkClassify - 所属分类。长度为4的字符串。
 * @property {string} sClassify - 分类名称
 * @property {string} fkMeal - 所属餐食。长度为4的字符串 使用竖线 | 分割 (split后是一个数组)
 * @property {string[]} [_fkMeal] - 所属餐食。fkMeal 使用竖线 | 分割之后的数组
 * @property {string} sMeal - 餐时名称
 * @property {string} sBatching - 配料信息。以Json形式存储的Text类型数据。
 * @prop {{code: string, unit: '克', name: string}[]} _sBatching - zzzzz
 * @prop {{age: number, name: string}[]} list -zzzzzzzzzzzz
 * @property {number | string} sPrice - 商品价格。长度为5的字符串。
 * @property {string} sDescription - 商品说明。Text类型数据。
 * @property {string} sRemark - 备注信息。Text类型数据。
 * @property {1 | 0 | null} nDelete - 标记删除状态。数值类型，1表示已删除 其他值或不存在表示未删除。
 * @property {string} tCreate - 创建时间。datetime类型，表示商品的创建时间。
 */

/**
 * @description -
 * @typedef {Object} Person
 * @property {string} code - 人员主键。程序自增生成的32位字符串。
 * @property {string} sName - 人员名称
 * @property {string} sFace - 人员头像
 * @prop {{age: number, name: string}[]} list -zzzzzzzzzzzz
 */

/**
 * @description 获取table数据
 * @param {{pageSize: number, pageNum: number, sName?: string}} data
 * @returns {Promise<import('@/utils/request').ResData<Data>>}
 */
export function GetPageList(data) {
  return Promise.resolve({
    dataList: Array.from({ length: 10 }, (_, i) => ({
      sName: `张三--${i}`,
      code: `${i}--code`
    }))
  })
}

/**
 * @returns {Promise<import('@/utils/request').ResData<Data>>}
 */
export function Get() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        info: null,
        dataList: {
          sName: '商品1',
          code: '001',
          sFace: 'xxxxxx'
        }
      })
    }, 2500)
  })
}

/**
 * @returns {Promise<import('@/utils/request').ResData<Person>>}
 */
export function Get2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        info: null,
        dataList: null
      })
    }, 2500)
  })
}

/**
 * @returns {Promise<import('@/utils/request').ResData<any>>}
 */
export function Add(data) {
  console.log('调用新增保存接口拉拉')
  console.log('data = ', data)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject('出错拉拉')
      resolve()
    }, 2500)
  })
}

/**
 * @returns {Promise<import('@/utils/request').ResData<any>>}
 */
export function Edit(data) {
  console.log('调用编辑保存接口拉拉')
  console.log('data = ', data)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2500)
  })
}
/**
 * @returns {Promise<import('@/utils/request').ResData<Data[]>>}
 */
export function testReqFn2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        info: null,
        dataList: []
      })
    }, 2500)
  })
}

/**
 *
 * @returns {Promise<import('@/utils/request').ResData<string>>}
 */
export function testReqFn3() {
  return Promise.resolve({
    info: {},
    dataList: '嘿嘿'
  })
}

/**
 *
 * @returns {Promise<import('@/utils/request').ResData<any>>}
 */
export function testReqFn4() {
  return Promise.resolve({
    info: {},
    dataList: '嘿嘿'
  })
}

/**
 *
 * @returns {Promise<import('@/utils/request').ResData<TT>>}
 */
export function testReqFn5() {
  return Promise.resolve({
    info: {},
    dataList: '嘿嘿'
  })
}
