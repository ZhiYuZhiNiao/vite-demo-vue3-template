<template>
  <div class="phone-container">
    <component
      v-for="item of selectedControls"
      :key="item.name"
      :is="item.componentName"
      v-model="item.value"
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
import { useControls } from '@/store'

const { createSelectedControls } = useControls()

const props = defineProps({
  modelValue: {
    type: /** @type {import('vue').PropType<ReturnType<typeof createSelectedControls>>} */ (Array),
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const selectedControls = useVModel(props, 'modelValue')
</script>

<style lang="scss" scoped>
</style>
