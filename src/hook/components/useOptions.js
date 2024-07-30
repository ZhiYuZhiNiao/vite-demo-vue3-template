// @ts-check
import useRequest from '../utils/useRequest'
/**
 * @template {ReqFn} _ReqFn
 * @param {_ReqFn} reqFn - 请求接口的函数
 * @param {Omit<import('../utils/useRequest').Options, 'initDataList' | 'formatDataListFn'> & {props?: Props<_ReqFn>}} [options] -配置项具体如下:
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
    /** @param {any[] | null} dataList */
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
 * @template {ReqFn} T
 * @typedef {Object} Props
 * @prop {keyof 取出ReqFn中的dataList类型<T>[number]} [label='label'] - label 默认值 = 'label'
 * @prop {keyof 取出ReqFn中的dataList类型<T>[number]} [value='value'] - value 默认值 = 'value' (key字段就是用的value的值)
 * @prop {keyof 取出ReqFn中的dataList类型<T>[number]} [disabled='disabled'] - disabled 默认值 = 'disabled'
 * @prop {keyof 取出ReqFn中的dataList类型<T>[number]} [color='color'] - color 默认值 = 'color'
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
 * @typedef {(params?: Params) => Promise<ResData<any[] | null>>} ReqFn
 */

/**
 * @typedef {{ label: string, value: number|string, key: number|string, disabled: boolean}[]} Options
 */

/**
 * @template T
 * @typedef {T extends (...args: any[]) => Promise<ResData<infer DataList>> ? Exclude<DataList, null> : any} 取出ReqFn中的dataList类型
 */
