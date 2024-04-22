// @ts-check

/**
 * @param { Number } time
 * @returns { Promise<undefined> }
 */
export const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))

/**
 * @description 根据数组项目里面的属性来转成一个对象
 * @template {Record<string, any>} T
 * @template {keyof T} [K='key']
 * @template {keyof T} [U='value']
 * @param {T[]} list
 * @param {K | 'key'} propKey
 * @param {U | 'value'} propValue
 * @example
 * [{key: 'name', value: '张三'}, {key: 'age', value: 14}] => { name: '张三', age: 14 }
 */
export function list2Obj(list, propKey = 'key', propValue = 'value') {
  return list.reduce((init, cur) => {
    const k = cur[propKey]
    const v = cur[propValue]
    init[k] = v
    return init
  }, /** @type {{[k in T[K | 'key']]: T[U | 'value']}} */ ({}))
}
