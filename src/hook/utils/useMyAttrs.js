import { useAttrs } from 'vue'
/**
 * @description 可以把 useAttrs() 返回的对象的属性, 统一去除字符串 s 开头的字符串
 * @param {string} s
 * @example
 *
 * 函数传入't' { tName: '张三',tAge: 18 }, 最终函数返回 { name: '张三', age: 18 }
 */
export default function useMyAttrs(s) {
  if (!s) throw new Error('参数 s 不能为空!')
  const _attrs = useAttrs()
  return Object.keys(_attrs).reduce((init, key) => {
    if (key.charAt(0) !== s || key.length < 2) return init
    let k = key.slice(1)
    k = k.charAt(0).toLocaleLowerCase() + k.slice(1)
    init[k] = _attrs[key]
    return init
  }, {})
}
