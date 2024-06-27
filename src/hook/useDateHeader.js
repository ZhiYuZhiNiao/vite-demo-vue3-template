import { ref } from 'vue'

/** @typedef {ReturnType<createDateList>} DateItem */

/**
 * @description
 * @param {Date | string} date
 * @param {number} count 共显示几个日期
 */
export function useDateHeader(date, count = 7) {
  /** @type {import('vue').Ref<DateItem>} */
  const dateList = ref([])
  getCurDateList(date, count)
  /**
   * @param {Date | string} date
   * @param {number} count 共显示几个日期
   */
  function getCurDateList(date, count = 7) {
    const _date = new Date(date)
    const leftCount = Math.floor((count - 1) / 2)
    _date.setDate(_date.getDate() - leftCount)
    const firstDate = new Date(_date)
    const res = createDateList(firstDate, count)
    dateList.value = res
  }

  /**
   * @description 上一周
   */
  function prevWeek() {
    const [{ date: _firstDate }] = dateList.value
    _firstDate.setDate(_firstDate.getDate() - 7)
    const firstDate = new Date(_firstDate)
    dateList.value = createDateList(firstDate, 7)
  }

  /**
   * @description 下一周
   */
  function nextWeek() {
    const { date: _lastDate } = dateList.value.pop()
    _lastDate.setDate(_lastDate.getDate() + 1)
    const firstDate = new Date(_lastDate)
    dateList.value = createDateList(firstDate, 7)
  }

  return {
    dateList,
    getCurDateList,
    prevWeek,
    nextWeek
  }
}

/**
 * @description 生成dateList的方法
 * @param {Date} firstDate
 * @param {number} count
 * @returns
 */
function createDateList(firstDate, count) {
  const res = []
  for (let i = 0; i < count; i++) {
    const item = {
      isToady: false,
      date: new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + i),
      content: ''
    }
    if (item.date.getDate() === new Date().getDate()) item.isToady = true
    res.push(item)
  }
  return res
}

/** @enum {'日' | '一' | '二' | '三' | '四' | '五' | '六'} */
export const WeekMap = Object.freeze({
  0: '日',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六'
})
