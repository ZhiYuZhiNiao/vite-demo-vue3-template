/**
 * @template {Record<string, any>} T
 * @template {keyof T} K
 * @typedef {{[P in keyof T]: P extends K ? T[P] : T[P] | null}} 使其他属性变成可null类型
 */

/**
 * @template {any} T
 * @typedef { T extends `${infer F}${infer _}` ? F : string } 取出字符串的第一个字符
 */

/**
 * @template {any} T
 * @template {any} U
 * @typedef { T extends `${infer U1}${infer U2}${infer R}` ? `${U1}${U2}` extends U ? R : string } 取出字符串第三个字符开始往后的字符
 */

export {}
