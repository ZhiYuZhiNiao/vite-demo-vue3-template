<template>
  <ElForm>
    <FormTitle v-model="activeType" />
    <Item
      v-for="item of layoutList"
      :key="item.id"
      :title="item.label"
    >
      <ElFormItem
        v-for="com of item.list"
        :key="com.key"
        :label="com.label"
        :prop="item.key"
      >
        <component
          :is="com.type"
          :modelValue="com.value"
          @update:modelValue="onModelValueUpdate($event, com)"
          :options="com.options"
        />
      </ElFormItem>
    </Item>
  </ElForm>
</template>

<script setup>
import FormTitle from '@/components/FormTitle/index.vue'
import CheckGroup from '@/components/CheckGroup/index.vue'
import RadioGroup from '@/components/RadioGroup/index.vue'
import Select from '@/components/Select/index.vue'
import Item from './components/Item.vue'
import useFormTitle from '@/components/FormTitle/useFormTitle.js'
import { computed } from 'vue'
import { useVModel } from '@/hook'

defineOptions({
  components: {
    CheckGroup, RadioGroup, Select
  }
})

const props = defineProps({
  control: {
    type: /** @type {import('vue').PropType<import('@/store/modules/controls').ActiveControl>} */(Object),
    required: true
  },
  modelValue: {
    type: /** @type {import('vue').PropType<import('@/store/modules/controls').ActiveControl['controlForm']>} */(Object)
  }
})

defineEmits(['update:modelValue'])

const controlProps = useVModel(props, 'modelValue')

console.log(controlProps)

const { activeType } = useFormTitle()

const layoutList = computed(() => activeType.value === 'content' ? props.control.contentFormLayout : props.control.styleFormLayout)

const onModelValueUpdate = (val, com) => {
  com.value = val
  controlProps.value[com.key] = val
  console.log('controlProps = ', controlProps)
  console.log('props.control = ', props.control)
}
</script>

<style lang="scss">
</style>
