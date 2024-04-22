import { InputProps, cascaderProps, ISelectProps as SelectProps, DatePickerProps, FormItemProps } from 'element-plus'
import { TreeComponentProps as TreeProps } from 'element-plus/es/components/tree/src/tree.type'
import { ExtractPropTypes } from 'vue'

type TreeSelectProps = SelectProps & TreeProps
type CascaderProps = ExtractPropTypes<typeof cascaderProps>

export {
  InputProps,
  SelectProps,
  DatePickerProps,
  TreeSelectProps,
  CascaderProps
}