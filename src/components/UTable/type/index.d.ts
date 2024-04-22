import { InputProps, cascaderProps, ISelectProps as SelectProps, DatePickerProps, FormItemProps } from 'element-plus'
import { TreeComponentProps as TreeProps } from 'element-plus/es/components/tree/src/tree.type'
import { ExtractPropTypes } from 'vue'

type TreeSelectProps = SelectProps & TreeProps
type CascaderProps = ExtractPropTypes<typeof cascaderProps>

type ElType = 'input' | 'cascader' | 'select' | 'date-picker' | 'tree-select'

// export type SearchItemConfig = ({
//   type: 'input',
//   props?: InputProps
// } | {
//   type: 'cascader',
//   props?: CascaderProps
// } | {
//   type: 'select',
//   props?: SelectProps,
//   options: any[]
// } | {
//   type: 'date-picker',
//   props?: DatePickerProps
// } | {
//   type: 'tree-select',
//   props?: TreeSelectProps
// }) & {
//   key: string,
//   value: any,
//   formItemProps?: FormItemProps
// }


export interface SearchItemConfig {
  type: ElType
  key: string
  value: any
  // el-form-item 可传入的 props
  formItemProps?: FormItemProps
  // 每一个表单项目可以传入的属性, 具体参考element-plus
  props: {
    [k: string]: any
    size?: InputProps['size']
    placeholder?: string
    disabled?: Boolean
  },
  options?: Record<string, any>[]
  fieldName?: {
    label: string
    value: string
    disabled: string
  }
}

export interface Props {
  searchConfig: SearchItemConfig[]
}