/**
 * @typedef FieldNameMapping
 * 定义选项数据字段名的映射对象，用于自定义与选项数据对应的字段名称。
 *
 * @property {string=} label
 * 选项显示标签对应的字段名。默认为 `'label'`。
 *
 * @property {string=} value
 * 选项值对应的字段名。默认为 `'value'`。
 *
 * @property {string=} disabled
 * 标记选项是否禁用的字段名。默认为 `'disabled'`。
 *
 * @property {string=} children
 * 子选项列表对应的字段名。适用于层级结构的选项数据，如级联选择器或树形选择器。默认为 `'children'`。
 */

/**
 * @typedef PropsType
 * 定义输入组件的通用属性集合，除自定义属性外，还包含特定预定义属性。
 *
 * @property {import('element-plus').InputProps['size']} [size]
 * 可选地指定输入组件的大小。有效值通常包括 'small', 'medium', 'large' 等。
 *
 * @property {string} [placeholder]
 * 输入框的提示文本，当输入框内容为空时显示。
 *
 * @property {boolean} [disabled=false]
 * 控制输入组件是否被禁用。默认为`false`（启用状态）。若为`true`，则禁用输入组件，用户无法与其交互。
 *
 * @property {boolean} [clearable=false]
 * 控制是否显示输入组件右侧的清除按钮。默认为`true`，表示启用清除功能。
 *
 * @property {import('type').CascaderProps | import('type').TreeSelectProps} [props]
 * 用于特定类型组件（如级联选择器或树形组件）的额外属性。具体参考Element Plus文档中的 `_CascaderProps` 或 `TreeProps` 类型定义。
 */

/** @typedef {'input' | 'cascader' | 'select' | 'date-picker' | 'tree-select'} ElType */

/**
 * @typedef {Object} SearchItemConfig
 * 描述一个适用于Element Plus组件的搜索项配置，用于输入表单中。它定义了与输入元素类型、外观、行为和数据处理相关的各种属性。
 *
 * @property {ElType} type
 * 指定作为搜索项使用的Element Plus组件类型。有效值由`ElType`枚举定义。
 *
 * @property {string} key
 * 表单上下文中搜索项的唯一标识符。此键用于引用和管理该项的状态。
 *
 * @property {*} value
 * 与搜索项关联的初始或当前值。该值的数据类型取决于组件的具体`type`。
 *
 * @property {import('element-plus').FormItemProps=} formItemProps
 * 一个可选对象，包含要直接传递给`el-form-item`组件的附加属性。这些属性自定义表单项容器的布局、验证和其他方面。
 *
 * @property {PropsType} props
 * 几个表单组件可传入的props属性, 具体可参考 element-plus文档
 *
 * @property {Array.<Record<string, any>>=} options
 * 若搜索项使用需要选项列表的组件（如下拉框、级联选择器或树形选择器），则提供一个对象数组，每个对象代表一个选项。选项的具体结构取决于实际应用需求和所使用的组件类型。
 *
 * @property {FieldNameMapping} fieldName
 * 用于自定义与选项数据对应的字段名称映射。若提供此对象，其属性包括（均为可选）：
*/

/**
 * @typedef {Object} Props
 * @property {SearchItemConfig[]} searchConfig
 * @property {{getListApi: (params: Record<string, any> | any[]) => Promise<any>, deleteApi: (params: Record<string, any> | any[]) => Promise<any>}} api
 */

export {}
