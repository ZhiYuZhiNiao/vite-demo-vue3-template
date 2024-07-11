<template>
  <ElScrollbar height="667px" view-class="phone-view">
    <Vuedraggable
      v-model="selectedControls"
      itemKey="id"
      group="list"
      chosen-class="chosen-item"
      class="draggable-container"
      filter=".unmover"
      @start="onStart"
      @end="onEnd"
    >
      <template #item="{element}">
        <component
          :is="element.componentName"
          :data-name="element.componentName"
          v-bind="props.outProps"
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

defineOptions({
  components: {
    ArticleList, Carousel, GoodsList, HotArea, NavGroup, UserInfo, Tip, Head, BottomNav
  }
})

const props = defineProps({
  outProps: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['update:modelValue'])

const { activeControl, selectedControls } = storeToRefs(useControls())

const onClick = (item) => {
  console.log('点击了phone里面的控件拉')
  activeControl.value = item
}

const onStart = (e) => {

}

const onEnd = (e) => {
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
