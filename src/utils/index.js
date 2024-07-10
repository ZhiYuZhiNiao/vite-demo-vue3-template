// @ts-check

/**
 * @param { Number } time
 * @returns { Promise<undefined> }
 */
export const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))

/**
 * @description 根据数组项目里面的属性来转成一个对象
 * @template {Record<string, any>} T
 * @template {keyof T} [K='value']
 * @param {T[]} list
 * @param {K} [propKey]
 */
// @ts-ignore
export function list2Obj(list, propKey = 'value') {
  return list.reduce((init, cur) => {
    const k = cur[propKey]
    const v = cur
    init[k] = v
    return init
  }, /** @type {{[k in T[K]]: T}} */ ({}))
}

// const obj = list2Obj([
//   /** @type {const} */({ value: '0', label: '哈哈0' }),
//   /** @type {const} */({ value: '1', label: '哈哈1' }),
//   /** @type {const} */({ value: '2', label: '哈哈2' })
// ])

/**
 * @template {Record<string, any>} T
 * @template {keyof T} K
 * @template {`${import('typeTool').取出字符串的第一个字符<K>}${'-'}`} U
 * @template {import('typeTool').取出字符串第三个字符开始往后的字符<K, U>} V
 * @param {T} obj
 * @param {U} key
 * @example
 * obj = {'f-c': '哈哈', 't-name': '嘿嘿', 'p-age': '细细'}
 * fliterAndSplitObjByKey(obj, 't-') => {'name': '嘿嘿'}
 */
export function fliterAndSplitObjByKey(obj, key) {
  const result = /** @type {{[k in V]: T[K]}} */ ({})
  for (const k of Object.keys(obj)) {
    if (k.includes(key)) {
      const [, _k] = k.split(`${key}`)
      result[_k] = obj[k]
    }
  }
  return result
}

/**
 * @description 类似 Object.assign (不同点在于对象内部的 get set 都可以复制过去)
 * @template  T
 * @template {any[]} S
 * @param {T} target
 * @param  {S} sources
 */
export function completeAssign(target, ...sources) {
  sources.forEach((source) => {
    const descriptors = Object.keys(source).reduce((descriptors, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key)
      return descriptors
    }, {})

    // 默认情况下，Object.assign 也会复制可枚举的 Symbol 属性
    Object.getOwnPropertySymbols(source).forEach((sym) => {
      const descriptor = Object.getOwnPropertyDescriptor(source, sym)
      if (descriptor?.enumerable) {
        descriptors[sym] = descriptor
      }
    })
    Object.defineProperties(target, descriptors)
  })
  // @ts-ignore
  return /** @type {import('typeTool').ShallowExpand<import('typeTool').Merges<T, S>>} */(target)
}

/**
 * @description 去除联合类型中的 null or undefined类型
 * @template T
 * @param {T} value
 * @returns {NonNullable<T>}
 */
// @ts-ignore
export const notNullOrUndefined = value => value

/**
 * @returns {string}
 */
export function uuidv4() {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}
