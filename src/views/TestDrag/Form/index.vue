<template>
  <ElForm>
    <FormTitle v-model="activeType" />
    <Item
      v-for="item of props.layoutList"
      :key="item.id"
      :title="item.title"
    >
      <ElFormItem
        v-for="com of item"
        :key="com.key"
        :label="com.label"
        :prop="item.key"
      >
        <component
          :is="com.type"
          v-model="com.value"
          :options="com.options"
        />
      </ElFormItem>
    </Item>
  </ElForm>
</template>

<script setup>
import FormTitle from '@/components/FormTitle/index.vue'
import Item from './components/Item.vue'
import useFormTitle from '@/components/FormTitle/useFormTitle.js'

const props = defineProps({
  layoutList: {
    type: Array,
    required: true
  }
})
const { activeType } = useFormTitle()
</script>

<style lang="scss">
</style>
