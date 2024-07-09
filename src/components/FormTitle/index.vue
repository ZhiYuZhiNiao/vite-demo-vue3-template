<template>
  <div class="form-title-container">
    <div class="title">{{ props.title }}</div>
    <div class="right-container">
      <div
        v-for="([k, v]) of m"
        :key="k"
        :style="{backgroundColor: v.color}"
        class="item"
        @click="onClick(k)"
      >
        {{ v.label }}
      </div>
    </div>
  </div>
</template>

<script setup name="FormTitle">
// @ts-check
import useFormTitle from './useFormTitle'
import { useVModel } from '@/hook'
import { notNullOrUndefined } from '@/utils'
const { m } = useFormTitle()
const props = defineProps({
  title: String,
  modelValue: {
    type: /** @type {import('vue').PropType<import('vue').UnwrapRef<ReturnType<typeof useFormTitle>['activeType']>>} */(String),
    required: true
  }
})

const emits = defineEmits(['update:modelValue', 'change'])

const activeType = useVModel(props, 'modelValue')
console.log('activeType', activeType)

/**
 * @param {typeof props['modelValue']} k
 */
const onClick = (k) => {
  if (activeType.value === k) return
  activeType.value = k
  m.value.forEach(el => { el.color = '#f9f9f9' })
  const activeItem = notNullOrUndefined(m.value.get(k))
  activeItem.color = activeItem.activeColor
  emits('change', k)
}
</script>

<style lang="scss" scoped>
.form-title-container {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  .right-container {
    display: flex;
    .item {
      width: 65px;
      height: 25px;
      line-height: 25px;
      text-align: center;
    }
  }
}
</style>
