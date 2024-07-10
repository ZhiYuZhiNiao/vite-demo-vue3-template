module.exports = {
  // 表示代码运行的环境可能是浏览器 | es2021 | node
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  // 扩展配置, 表示这份代码将使用 Vue 3 的基本插件配置以及标准配置。
  extends: ['plugin:vue/vue3-essential', 'standard'],
  overrides: [],
  // 这个属性指定了解析器的选项。这里的 ecmaVersion: 'latest'
  // 表示将使用最新的 ECMAScript 版本进行解析，sourceType: 'module' 表示这是一份模块化的源代码
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  // 这个属性指定了启用的插件。这里的 ['vue'] 表示启用了 Vue 插件。
  plugins: ['vue'],
  // 这里的 'vue/multi-word-component-names': 'off' 表示禁用了多单词组件名
  // 'vue/comment-directive': 'off' 表示禁用了注释指令的规则。
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/comment-directive': 'off',
    'space-before-function-paren': 0, // 函数名后不保留空格
    'vue/require-component-is': 'off'
  }
}
