/**
 * @description 商品列表
 * @typedef {Object} Data
 * @prop {string} code - 数据id 唯一
 * @prop {string} sName - 产品名称
 * @prop {string} sNum - 产品编号
 * @prop {string} fkClass - 产品类型
 * @prop {string} sGoodsImgs - 产品图片 json []
 * @prop {string} sDetailImgs - 详情图片 json []
 * @prop {boolean} isHasRelatedGoods - 是否有关联产品
 * @prop {string} fkRelatedGoods - 关联产品code
 * @prop {string} fkIndustry - 所属行业
 * @prop {import('typeTool').获取Map类型中得key联合类型<getGradeTypeMap>} nGrade
 * - 产品等级 1 高级, 2 中级, 3 低级
 * @prop {string} sParams - 产品参数 json []
 * @prop {string} sSpec - 产品规格 json []
 * @prop {SpecType} Spec
 * @prop {import('typeTool').获取Map类型中得key联合类型<typeof getApprovalStatusMap>} nAudit
 * - 审批状态: 1 待审批, 2 审批通过, 3 审批拒绝
 * @prop {import('typeTool').获取Map类型中得key联合类型<getStateMap>} nState
 * - 产品状态: 1 上架, 2 下架
 */

import request from '@/utils/request'
import { jsonParse } from '@/utils'
// import { pageList, action, get } from './Mock'
// import i18n from '@/lang/index'
// eslint-disable-next-line no-unused-vars
// import { getApprovalStatusMap } from '@/api'
// const $t = i18n.global.t

/** @description 产品状态 */
export const getStateMap = () => new Map([
  /** @type {const} */([1, { label: '上架', value: 1 }]),
  /** @type {const} */([2, { label: '下架', value: 2 }])
])

export const getSupplyTypeMap = () => new Map([
  /** @type {const} */([1, { label: '平台', value: 1 }]),
  /** @type {const} */([2, { label: '供应商', value: 2 }])
])

export const getGradeTypeMap = () => new Map([
  /** @type {const} */([1, { label: '高级', value: 1 }]),
  /** @type {const} */([2, { label: '中级', value: 2 }]),
  /** @type {const} */([3, { label: '低级', value: 3 }])
])

/**
 * @description 解析参数
 * @param {string} val
 * @returns {{label: string, value: string, key: string}[]}
 */
export const jsonParseParams = (val) => jsonParse(val, [])

/**
 * @description 规格对象
 * @typedef {Object} SpecType
 * @prop {string} key - 唯一标识
 * @prop {string} sImg - 规格图片, 只能上传一张
 * @prop {string} sContent - 规格内容
 * @prop {undefined | number} nPlatformPrice - 平台价格
 * @prop {undefined | number} nSellingPrice - 销售价格
 * @prop {boolean} isDefault - 是否默认
 */

/**
 * @description 解析规格
 * @param {string} val
 * @returns {SpecType[]}
 */
export const jsonParseSpec = (val) => jsonParse(val, [])

/** @type {Data} */
// const item = {
//   code: 'zz',
//   sName: '比亚迪',
//   sNum: '9527',
//   nNum: 22,
//   nAudit: 1,
//   nState: 1,
//   sContacts: '张三',
//   sPhone: '18888888888'
// }

/** @returns {Promise<import('@/utils/request').ResData<Data[]>>} */
export const GetPageToList = (data) => {
  return request({
    url: '/GoodsList/GetPageToList',
    method: 'post',
    data
  })
}

/** @returns {Promise<import('@/utils/request').ResData<Data>>} */
export const Get = (params) => {
  return request({
    url: '/GoodsList/Get',
    params
  })
}
/** @returns {Promise<import('@/utils/request').ResData>} */
export const Edit = (data) => {
  return request({
    url: '/GoodsList/Edit',
    method: 'post',
    data
  })
}

/** @returns {Promise<import('@/utils/request').ResData>} */
export const Add = (data) => {
  return request({
    url: '/GoodsList/Add',
    method: 'post',
    data
  })
}

export const Delete = (data) => {
  return request({
    url: '/GoodsList/Delete',
    method: 'post',
    data
  })
}
