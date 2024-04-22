import { reactive, toRefs } from 'vue'

/**
 * @param {object} opts
 * @param {number} [opts.pageNum] 当前页码
 * @param {number} [opts.pageSize] 一页显示多少条数据
 * @param {number} [opts.pagerCount]  页码按钮的数量，当总页数超过该值时会折叠
 * @param {(pageNum: number, pageSize: number) => void} [opts.onChange]
 */
export default function usePagination(opts) {
  const { pageNum = 1, pageSize = 10, pagerCount = 7, onChange = () => {} } = opts ?? {}
  const pagination = reactive({
    pageNum,
    pageSize,
    pagerCount,
    total: 0, // 总条目数
    pageCount: 1 // 总页数
  })

  const fn = {}
  /**
   * @description 页码 或 pageSize 变化的时候触发
   * @param {number} pageNum
   * @param {number} pageSize
   */
  fn.onChange = (pageNum, pageSize) => {
    pagination.pageNum = pageNum
    pagination.pageSize = pageSize
    onChange(pageNum, pageSize)
  }

  /**
   * @param {number} val
   */
  fn.setTotal = (val) => { pagination.total = val }
  /**
   * @param {number} val
   */
  fn.setPageCount = (val) => { pagination.pageCount = val }

  return {
    ...toRefs(pagination),
    ...fn
  }
}
