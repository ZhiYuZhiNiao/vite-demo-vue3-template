<template>
  <ElScrollbar height="667px" view-class="phone-view">
    <!--
      :filter=".unmover" 设置了unmover样式的元素不允许拖动 (主动的移动)
      :draggable=".item" 那些元素是可以被拖动的 (被动的移动)
    -->
    <Vuedraggable
      v-model="selectedControls"
      itemKey="id"
      group="list"
      chosen-class="chosen-item"
      class="draggable-container"
      filter=".unmover"
      draggable=".draggable"
      @start="onStart"
      @end="onEnd"
      @add="onAdd"
    >
      <!-- 记得测试一下vue里面这种传递会直接作用于内层的子元素 -->
      <template #item="/** @type {{ element: ReturnType<typeof useControls>['selectedControls'][number] }} */{element}">
        <component
          :is="element.componentName"
          :data-name="element.componentName"
          :style="getActiveControlStyle(element)"
          v-bind="props.controlProps"
          @click="onClick(element)"
        />
      </template>
    </Vuedraggable>
  </ElScrollbar>
</template>

<script setup>
import ArticleList from '../components/ArticleList/index.vue'
import Carousel from '../components/Carousel/index.vue'
import GoodsList from '../components/GoodsList/index.vue'
import HotArea from '../components/HotArea/index.vue'
import NavGroup from '../components/NavGroup/index.vue'
import UserInfo from '../components/UserInfo/index.vue'
import Tip from '../components/Tip/index.vue'
import Head from '../components/Head/index.vue'
import BottomNav from '../components/BottomNav/index.vue'
import Vuedraggable from 'vuedraggable'

import { useControls } from '@/store'
import { storeToRefs } from 'pinia'
import { useVModel } from '@/hook'

defineOptions({
  components: {
    ArticleList, Carousel, GoodsList, HotArea, NavGroup, UserInfo, Tip, Head, BottomNav
  }
})

const props = defineProps({
  modelValue: {
    type: /** @type {import('vue').PropType<ReturnType<typeof useControls>['selectedControls']>} */ (Array),
    required: true
  },
  controlProps: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['update:modelValue'])

const selectedControls = useVModel(props, 'modelValue')

const { activeControl } = storeToRefs(useControls())

/**
 * @param {ReturnType<typeof useControls>['selectedControls'][number]} control
 */
const getActiveControlStyle = (control) => {
  // ['Head', 'Tip', 'BottomNav'].includes(control.componentName) ||
  if (activeControl.value.componentName !== control.componentName) return {}
  return {
    border: '4px solid rgb(58, 55, 226)'
  }
}

const onClick = (item) => {
  console.log('点击了phone里面的控件拉')
  console.log('item = ', item)
  activeControl.value = item
}

const onStart = (e) => {

}

const onEnd = (e) => {
}

const onAdd = (e) => {
  const { newIndex } = e
  activeControl.value = selectedControls.value[newIndex]
  console.log('onAdd activeControl.value = ', activeControl.value)
}

</script>

<style lang="scss" scoped>
.el-scrollbar {
  :deep(.BottomNav-view-container) {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
.draggable-container {

}
</style>
