// @ts-check
import useRequest from '@/hook/utils/useRequest'
import { reactive, toRefs, computed, unref, getCurrentInstance } from 'vue'
import { completeAssign } from '@/utils'
import { ElMessage } from 'element-plus'

/**
 * @template InitFormModel
 * @template GetReqFn
 * @typedef {Object} Options - 参数配置
 * @prop {InitFormModel} initFormModel - 必传, formModel的初始值,必须传一个对象, 可以是Ref类型
 * @prop {string} [reqCode] - get接口携带的code参数, 如果没传递，则会去props中去取 code 属性
 * @prop {GetReqFn} [Get] - get请求接口方法, 如果不传递该参数，那么最后得到的 formModel 就是我们传入的 initFormModel
 * @prop {(...args: any[]) => Promise<ResData<any>>} Add - 必传 dd请求接口方法
 * @prop {(...args: any[]) => Promise<ResData<any>>} Edit - 必传 edit请求接口方法
 * @prop {() => boolean | Promise<boolean>} [beforeValidate] - 表单校验之前的校验方法 返回值是boolean, 如果返回false, 则不会执行后续操作
 * @prop {() => boolean | Promise<boolean>} [afterValidate] - 表单校验之后的校验方法 返回值是boolean, 如果返回false, 则不会执行后续操作
 * @prop {() => import('vue').MaybeRef<Record<string, any>>} [beforeSaveFormatReqParams] - 通过验证之后, 调用保存接口之前会执行该方法, 此方法的返回值(可以是Ref类型)会作为最终请求参数
*/

/**
 * @template {import('vue').MaybeRef<Record<string, any>>} InitFormModel
 * @template {(...args: any[]) => Promise<ResData<any>>} [GetReqFn=(...args: any[]) => Promise<ResData<InitFormModel>>]
 * @param {Options<InitFormModel, GetReqFn>} options - 参数配置如下:
* - 1. initFormModel: 表单初始值, 可以是Ref类型
* - 2. reqCode?: get接口携带的code参数, 如果没传递，则会去props中去取 code 属性
* - 3. Get?: get请求接口方法, 如果不传递该参数，那么最后得到的 formModel 就是我们传入的 initFormModel
* - 4. Add: add请求接口方法
* - 5. Edit: edit请求接口方法
* - 6. beforeValidate?: 表单校验之前的校验方法 返回值是boolean, 如果返回false, 则不会执行后续操作
* - 7. afterValidate?: 表单校验之后的校验方法 返回值是boolean, 如果返回false, 则不会执行后续操作
* - 8. beforeSaveFormatReqParams?: 通过验证之后, 调用保存接口之前会执行该方法, 此方法的返回值(可以是Ref类型)会作为最终请求参数
*/
export default function useDialog(options) {
  const context = getCurrentInstance()
  if (!context) throw new Error('useDialog() 只能在setup内执行!')
  const { initFormModel, Edit: editReqFn, Add: addReqFn, Get: getReqFn } = options
  if (Object.prototype.toString.call(initFormModel) !== '[object Object]') throw new Error('请传入initFormModel参数, 并且只能传入 {xx: xx} 形式的对象')
  const code = options.reqCode ?? /** @type {string | undefined} */(context.props.code)
  /* 存在get请求方法，但是又没有 code 参数, 直接报错; 如果get请求方法 or code 不存在, 则formModel 直接使用 initFormModel */
  if (getReqFn && code === undefined) {
    console.error('console.error: get请求方法需要请求参数-- "code" !!')
  }

  const state = reactive({
    show: true,
    formRef: /** @type {import('element-plus').FormInstance | null} */ (null)
  })
  /* get 和 save 操作 */
  const getState = handleGet(initFormModel, code, getReqFn)
  const { dataList: formModel } = getState
  const saveState = useRequest(code ? editReqFn : addReqFn, {
    immediate: false,
    reqParams: formModel
  })

  const loading = computed(() => [unref(getState.loading), unref(saveState.loading)].some(Boolean))

  /**
   * @description 保存事件
   */
  const onSave = async () => {
    const { beforeValidate = () => true, afterValidate = () => true, beforeSaveFormatReqParams } = options
    const isPass = await validate([beforeValidate, state.formRef?.validate ?? (() => false), afterValidate])
    if (!isPass) return
    await saveState.run(unref(beforeSaveFormatReqParams?.()) ?? formModel)
    ElMessage.success('操作成功')
    state.show = false
    context.emit('success')
  }

  const setFormRef = (val) => {
    state.formRef = val
  }

  /**
   * @param {(() => boolean | Promise<boolean>)[]} fns
   */
  async function validate(fns) {
    let isPass = true
    for (const fn of fns) {
      isPass = await fn()
      if (!isPass) return false
    }
    return isPass
  }

  return {
    ...toRefs(state),
    loading,
    formModel,
    setFormRef,
    onSave
  }
}

/**
 * @description get 请求的操作
 * @template InitFormModel
 * @template {(...args: any[]) => Promise<ResData<any>>} GetReqFn
 * @param {InitFormModel} initFormModel
 * @param {string | undefined} code
 * @param {GetReqFn} [getReqFn]
 */
function handleGet(initFormModel, code, getReqFn) {
  // code 和 get 接口同时都存在才会调用get 接口， 否则使用传入的 initFormModel
  // eslint-disable-next-line no-extra-parens
  if (!getReqFn || !code) getReqFn = /** @type {GetReqFn} */((params) => Promise.resolve({ dataList: initFormModel }))
  const { dataList, loading } = useRequest(getReqFn, {
    initDataList: initFormModel,
    reqParams: { code },
    /* get的时候进行赋值, 最后这个函数return 出去的值, 会被赋值到 useRequest 的返回值的 dataList 里面 */
    formatDataListFn(data) {
      return completeAssign({}, initFormModel, data)
    }
  })
  return {
    dataList, loading
  }
}

/**
 * @template T
 * @typedef {import('@/utils/request').ResData<T>} ResData
 */
