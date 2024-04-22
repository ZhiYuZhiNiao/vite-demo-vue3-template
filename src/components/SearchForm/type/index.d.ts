import { SearchItemConfig } from '@/components/UTable/type'

export interface Props {
  readonly searchList: SearchItemConfig[]
  readonly modelValue: Record<string, any>
}

export interface Emit {
  (e: `update:modelValue`, value: Props['modelValue']): void
}