<template>
  <el-tag
    v-for="(tag, index) of tags"
    :key="tag.value"
    closable
    @close="onClose(index, tag)"
  >
    {{ showTag(tag) }}
  </el-tag>
</template>
<script setup>
import { useVModel } from '@/hook/useVModel'
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

const emit = defineEmits(['update:modelValue', 'close'])

const tags = useVModel(props, 'modelValue', emit)

/**
 * @param {}
 */
const showTag = (tag) => {
  const { showTagContent } = props
  if (!showTagContent) return tag.label
  return showTagContent(tag)
}

const onClose = (index, tag) => {
  tags.value = tags.value.filter(el => el.value !== tag.value)
  emit('close', index, tag)
}

</script>
<style lang="scss" scoped>
</style>
