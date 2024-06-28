// @ts-check
import useRequest from './useRequest'
/**
 * @param {ReqFn} reqFn - 请求接口的函数
 * @param {Omit<import('./useRequest').Options, 'initDataList' | 'formatDataListFn'> & {props?: Props}} [options] -配置项具体如下:
 * @example
 *  1-- props 参数用于设置接口返回的label, value 等
 *  props?: {
 *  label?: string 默认值 'label'
 *  value?: string 默认值 'value'
 *  disabled?: string 默认值 'disabled'
 *  color?: string 默认值 'color'
 * }
 * 
 * 2-- immediate?: boolean
 * 3-- reqParams?: any 
 * 4-- deps?: any[]
 * 5-- onSuccess?: () => void
 * 6-- onError?: () => void
 * 7-- onFinally?: () => void
 */
export default function useOptions(reqFn, options) {
  const { props } = options ?? {}
  /** @type {Record<string, Partial<(typeof state)['dataList']['value'][number]>>} */
  let m = {}
  const state = useRequest(reqFn, {
    ...options,
    initDataList: [],
    formatDataListFn(dataList) {
      return (dataList ?? []).map(el => ({
        label: /** @type {string} */(el[props?.label ?? 'label']) ?? '',
        value: /** @type {string} */(el[props?.value ?? 'value']) ?? '',
        key: /** @type {string} */(el[props?.value ?? 'value']) ?? '',
        disabled: !!el[props?.disabled ?? 'disabled'],
        style: {
          color: /** @type {string} */(el[props?.color ?? 'color']) ?? ''
        }
      }))
    },
    onSuccess() {
      m = state.dataList.value.reduce((init, cur) => {
        init[cur.value] = cur
        return init
      }, {})
      options?.onSuccess?.()
    }
  })

  return {
    ...state,
    m
  }
}



























/**
 * @description - 用于设置接口返回的label, value 等值
 * @typedef {Object} Props
 * @prop {string} [label='label'] - label 默认值 = 'label'
 * @prop {string} [value='value'] - value 默认值 = 'value' (key字段就是用的value的值)
 * @prop {string} [disabled='disabled'] - disabled 默认值 = 'disabled'
 * @prop {string} [color='color'] - color 默认值 = 'color'
 */


/**
 * @template T
 * @typedef {import('vue').Ref<T>} Ref
 */

/**
 * @template T
 * @typedef {import('@/utils/request').ResData<T>} ResData
 */


/**
 * @typedef {Record<string, any> | any[]} Params
 */

/**
 * @typedef {(params?: Params) => Promise<ResData<any[]>>} ReqFn
 */