<template>
  <div class="phone-container">
    <component
      v-for="item of selectedControls"
      :key="item.name"
      :is="item.componentName"
    />
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import ArticleList from '../components/ArticleList/index.vue'
import Carousel from '../components/Carousel/index.vue'
import GoodsList from '../components/GoodsList/index.vue'
import HotArea from '../components/HotArea/index.vue'
import NavGroup from '../components/NavGroup/index.vue'
import UserInfo from '../components/UserInfo/index.vue'

import { useVModel } from '@/hook'

const props = defineProps({
  modelValue: {
    type: /** @type {import('vue').PropType<import('../Controls/useControls.js').Controls>} */ (Array),
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const selectedControls = useVModel(props, 'modelValue')
console.log(selectedControls)
</script>

<style lang="scss" scoped>
</style>
