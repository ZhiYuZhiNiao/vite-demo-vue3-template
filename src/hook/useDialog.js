// @ts-check
import useRequest from './useRequest'
import { reactive, toRefs, computed, unref, getCurrentInstance } from 'vue'
import { completeAssign } from '@/utils'
import { ElMessage } from 'element-plus'


/**
 * @template {import('vue').MaybeRef<Record<string, any>>} InitFormModel
 * @template {(...args: any[]) => Promise<ResData<any>>} [GetReqFn=(...args: any[]) => Promise<ResData<InitFormModel>>]
 * @param {{
*  initFormModel: InitFormModel
*  reqCode?: string
*  Get?: GetReqFn
*  Add: (...args: any[]) => Promise<ResData<any>>
*  Edit: (...args: any[]) => Promise<ResData<any>>
*  beforeValidate?: () => boolean | Promise<boolean>
*  afterValidate?: () => import('vue').MaybeRef<Record<string, any>>
* }} options - 参数配置如下:
* - 1. initFormModel: 表单初始值
* - 2. reqCode?: get接口携带的code参数, 如果没传递，则会去props中去取 code 属性
* - 3. Get?: get请求接口方法, 如果不传递该参数，那么最后得到的 formModel 就是我们传入的 initFormModel
* - 4. Add: add请求接口方法
* - 5. Edit: edit请求接口方法
* - 6. beforeValidate?: 保存前额外的校验方法 返回值是boolean, 如果返回false, 则不会执行后续操作
* - 7. afterValidate?: 验证通过之后保存之前会调用的方法, 该方法的返回值会被用于保存接口的参数
*/
export default function useDialog(options) {
  const context = getCurrentInstance()
  if (!context) throw new Error('useDialog() 只能在setup内执行!')
  const { initFormModel, Edit: editReqFn, Add: addReqFn, Get: getReqFn } = options
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
    const { beforeValidate = () => true, afterValidate = () => undefined } = options
    const isPass = await state.formRef?.validate()
    const isPass2 = await beforeValidate()
    if (!isPass || !isPass2) return
    await saveState.run(afterValidate() ?? formModel)
    ElMessage.success('操作成功')
    state.show = false
    context.emit('success')
  }

  const setFormRef = (val) => {
    state.formRef = val
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
  if (!getReqFn || !code) getReqFn = /** @type {GetReqFn} */ ((params) => Promise.resolve({ dataList: initFormModel }))
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

