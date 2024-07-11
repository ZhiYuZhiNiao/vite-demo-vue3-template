<template>
  <ElForm>
    <FormTitle v-model="activeType" />
    <Item
      v-for="item of props.layoutList"
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
          v-model="com.value"
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

defineOptions({
  components: {
    CheckGroup, RadioGroup, Select
  }
})

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
