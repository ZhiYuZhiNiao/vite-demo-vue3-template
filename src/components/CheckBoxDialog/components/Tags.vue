<template>
  <el-tag
    v-for="(tag, index) of tags"
    :key="tag.value"
    closable
    @close="onClose(index, tag)"
    v-bind="$attrs"
  >
    {{ showTag(tag) }}
  </el-tag>
</template>
<script setup>
import { useVModel } from '@/hook'
/**
 * @typedef {Object} Props
 * @property {{value: string, label: string, [x: string]: any}[]} modelValue
 * @property {(tag: Props['modelValue'][number]) => string} [showTagContent] - 显示标签内容的方法, 此方法返回的内容就是标签显示的内容
 */

/** @type {Readonly<Props>} */
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  showTagContent: {
    type: Function,
    default: null
  }
})

/**
 * @typedef {{
 *  (e: 'update:modelValue', val: Props['modelValue']): void
 *  (e: 'close', index: number, tag: Props['modelValue']): void
 * }} Emit
 */

/** @type {Emit} */
const emit = defineEmits(['update:modelValue', 'close'])

const tags = useVModel(props, 'modelValue', emit)

/**
 * @param {Props['modelValue'][number]} tag
 * @returns {string}
 */
const showTag = (tag) => {
  const { showTagContent } = props
  if (!showTagContent) return tag.label
  return showTagContent(tag)
}

/**
 * @param {number} index
 * @param {Props['modelValue'][number]} tag
 */
const onClose = (index, tag) => {
  tags.value = tags.value.filter(el => el.value !== tag.value)
  emit('close', index, tag)
}

</script>
<style lang="scss" scoped>
</style>
