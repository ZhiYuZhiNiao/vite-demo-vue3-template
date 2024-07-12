export type 取出字符串的第一个字符<T> = 
  T extends `${infer F}${infer _}` 
  ? F 
  : string

export type 取出字符串第三个字符开始往后的字符<T, U> = 
  T extends `${infer U1}${infer U2}${infer R}` 
  ? `${U1}${U2}` extends U 
  ? R 
  : string 
  : string

export type 使其他属性变成可null类型<T extends Record<string, any>, K extends keyof T> = {[P in keyof T]: P extends K ? T[P] : T[P] | null}

export type Merge<F extends object, S extends object> = {[P in keyof S]: S[P]} & Omit<F, keyof S>

export type Merges<T extends object, S extends object[]> = S extends [infer First, ...infer Rest] ? Merge<T, Merges<First, Rest>>: T

// 可以把类型提示给扩展开，递归式得全部都展开
export type Expand<T> = T extends object ? T extends infer O ? {[K in keyof O]: Expand<O[K]>} : never : T
// 浅层的只扩展第一层
export type ShallowExpand<T> = T extends infer O ? {[K in keyof O]: O[K]} : never

export type CheckNever<T> = T extends never ? 'yes' : 'no'
export type CheckAny<T> = CheckNever<T> extends 'no' ? '不是Any' : '是Any'

export type 取出Map的Key类型<T extends Map<any, any>> = T extends Map<infer U, any> ? U : never

export type Writable<T> = { -readonly [P in keyof T]: T[P] }

export type CreateControlForm<T extends Function> = {
  [K in ReturnType<T>[number]['list'][number]['key']]: ReturnType<T>[number]['list'][number]['value']
}