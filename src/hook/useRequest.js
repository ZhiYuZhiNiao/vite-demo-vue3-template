// @ts-check
import { GetPageList, testReqFn2, Add } from '@/api/Goods'
import { reactive, toRefs, unref, ref, watch } from 'vue'

/**
 * @template [InitDataList=undefined]
 * @template [FormatReturnType=undefined]
 * @template [DataList=undefined]
 * @typedef {Object} Options
 * @prop {MaybeRef<Params>} [reqParams] - 请求携带得参数 可以是Ref类型
 * @prop {InitDataList} [initDataList] - dataList的初始值, 可以是Ref类型
 * @prop {MaybeRef<boolean>} [immediate=true] - 是否执行useRequest的时候立即发送请求, 默认值true, 可以是Ref类型
 * @prop {any[]} [deps] - 依赖项, 存放响应式依赖的数组 某个依赖发生变化则再次执行run方法发送请求
 * @prop {(dataList: FormatDataList<DataList, UnwrapRef<InitDataList>, undefined>) => FormatReturnType} [formatDataListFn] - 不管请求成功还是失败都会调用该方法
 * - 该函数的返回值会赋值给 resData里面的 dataList (如果该函数返回 null or undefined 则返回值不会赋值给 dataList)
 * @prop {() => void} [onSuccess]
 * @prop {() => void} [onError]
 * @prop {() => void} [onFinally]
 */

/**
 * @template {(...args: any[]) => Promise<ResData<unknown>>} ReqFn
 * @template [InitDataList=undefined]
 * @template [FormatReturnType=undefined]
 * @template [DataList=取出ReqFn中的dataList类型<ReqFn>]
 * @param {ReqFn} reqFn
 * @param {Options<InitDataList, FormatReturnType, DataList>} [options]
 */
export default function useRequest(reqFn, options) {
  options = options ?? {}
  const { initDataList, formatDataListFn, onSuccess, onError, onFinally } = options
  const reqParams = unref(options.reqParams)
  const immediate = unref(options.immediate ?? true)
  const deps = unref(options.deps ?? [])

  /** @type {ResData<FormatDataList<DataList, UnwrapRef<InitDataList>, UnwrapRef<FormatReturnType>>> & {loading: boolean, isError: boolean}} */
  // @ts-ignore
  const resData = (reactive({
    dataList: initDataList,
    loading: false,
    isError: false
  }))

  let abortController = /** @type {AbortController | null} */(null)

  /**
   * @description 手动执行发送请求, 若传递参数则该参数会作为请求参数(若未传递则使用options中的-reqParams)
   * @param {MaybeRef<Params>} [params] 请求携带的参数 可以是Ref类型
   */
  const run = async (params) => {
    // console.log('run, 执行啦啦啦')
    try {
      params = unref(params) ?? reqParams
      abortController = new AbortController()
      resData.loading = true
      const _resData = /** @type {ResData<DataList> | null} */(await reqFn(params, abortController.signal))
      if (!_resData || _resData?.dataList === null || _resData?.dataList === undefined) {
        console.error('console.error: 后端返回的 resData or dataList 为 null !!')
      }
      resData.isError = false
      Object.assign(resData, _resData)
      // @ts-ignore
      resData.dataList = formatDataListFn?.(resData.dataList) ?? resData.dataList
      onSuccess?.()
      return Promise.resolve(resData.dataList)
    } catch (error) {
      resData.isError = true
      // console.error(error)
      // @ts-ignore
      resData.dataList = formatDataListFn?.(resData.dataList) ?? resData.dataList
      onError?.()
      return Promise.reject(error)
    } finally {
      resData.loading = false
      onFinally?.()
    }
  }


  /**
   * @description 取消当前正在发送的请求
   * @param {string} [reason]
   */
  const cancel = (reason) => {
    /*  当 abort() 被调用时，fetch() promise 将会抛出 DOMException 类型的 Error（名称为 AbortError） (就是如果没有传递reason, 默认会抛出的这个错) */
    abortController?.abort(reason)
  }


  watch(deps.map(unref), () => {
    run()
  }, {
    deep: true,
    immediate
  })

  return {
    ...toRefs(resData),
    run,
    cancel
  }
}


/* test------------------------------------------------------ */

const resData = reactive(useRequest(testReqFn2, {
  initDataList: [],
}))

const initDataList = {
  name: ''
}

const { dataList: d2 } = (useRequest(GetPageList, {
  initDataList: initDataList,
  formatDataListFn(dataList) {
    return {
      obj: {
        a: ref(1)
      }
    }
  },
  immediate: false
}))

;( async() => {
  // const dataList = await resData2.run()
})()

const { dataList } = reactive(useRequest(GetPageList, {
  formatDataListFn(data) {
    return data?._sBatching ?? []
  }
}))




/**
 * @template [T=undefined]
 * @typedef {import('@/utils/request').ResData<T>} ResData
 */

/**
 * @typedef {Record<string, any> | any[]} Params - 请求参数类型
 */


/**
 * @template T
 * @typedef {import('vue').MaybeRef<T>} MaybeRef
 */

/**
 * @template T
 * @typedef {import('vue').UnwrapRef<T>} UnwrapRef
 */


/**
 * @template T
 * @typedef {T extends (...args: any[]) => Promise<ResData<infer DataList>> ? DataList : any} 取出ReqFn中的dataList类型
 */

/**
 * @template T
 * @typedef {import('typeTool').CheckAny<T>} CheckAny
 */

/**
 * @template DataList
 * @template DefaultValue
 * @template FormatFnReturn
 * @template [G = DataList | DefaultValue]
 * @template [_DataList=CheckAny<DataList> extends '是Any' 
    ? DefaultValue extends undefined 
    ? any 
    : G 
    : DefaultValue extends undefined 
    ? Exclude<DataList, null> | undefined 
    : DataList extends any[] 
    ? DefaultValue extends never[] 
    ? Exclude<DataList, null> 
    : G 
    : DataList extends Record<string, any> 
    ? DefaultValue extends any[] 
    ? G 
    : {} extends DefaultValue
    ? Partial<Exclude<DataList, null>> 
    : G 
    : G]
 * @typedef {FormatFnReturn extends undefined | null | void ? _DataList : FormatFnReturn} FormatDataList
 */