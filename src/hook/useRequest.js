// eslint-disable-next-line no-unused-vars
import { reactive, ref, watch, toRefs, watchEffect } from 'vue'

/**
 *
 * @param {(...args) => Promise} reqFn
 * @param {{
 *  auto: boolean,
 *  deps: Array | boolean,
 *  onSuccess: (res: object) => void,
 *  onError: (err: object) => void,
 *  onFinish: ({ res: object, err: object }) => void
 *  } | undefined
 * } opts
 * @property {boolean} auto 是否自动发起请求
 * @returns
 */
export default function(reqFn, opts) {
  const { auto = true, deps, onSuccess, onError, onFinish } = opts ?? {}
  const state = reactive({
    loading: false,
    res: undefined,
    err: undefined
  })

  const run = async (...args) => {
    console.log('args', args)
    state.loading = true
    console.log('loading = true')
    let res
    try {
      res = await reqFn(...args)
      state.res = res
      onSuccess?.(res)
      return state.res
    } catch (err) {
      state.err = err
      onError?.(err)
      return state.err
    } finally {
      state.loading = false
      onFinish?.({ res, err: state.err })
      console.log('loading = false')
    }
  }

  // 如果 deps 传入 true, 则自动使用请求参数作为依赖进行监听
  if (auto) {
    if (!Array.isArray(deps) && deps === true) {
      watchEffect(run)
    } else {
      watch(deps, () => {
        if (!auto) return
        run()
      }, { deep: true, immediate: true })
    }
  }

  const cancel = () => {}

  return {
    ...toRefs(state),
    run,
    cancel
  }
}
