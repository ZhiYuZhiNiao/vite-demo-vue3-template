<template>
  <div class="phone-container" ref="phoneRef">
    <Vuedraggable
      v-model="selectedControls"
      itemKey="id"
      chosen-class="chosen-item"
      class="draggable-container"
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
  </div>
</template>

<script setup>
import ArticleList from '../components/ArticleList/index.vue'
import Carousel from '../components/Carousel/index.vue'
import GoodsList from '../components/GoodsList/index.vue'
import HotArea from '../components/HotArea/index.vue'
import NavGroup from '../components/NavGroup/index.vue'
import UserInfo from '../components/UserInfo/index.vue'
import Tip from '../components/Tip/index.vue'
import Vuedraggable from 'vuedraggable'

import { getConfig } from '../components/Tip'

import { ref, nextTick } from 'vue'
import { useVModel, useAddEventListener } from '@/hook'
import { useControls } from '@/store'
import { storeToRefs } from 'pinia'

defineOptions({
  components: {
    ArticleList, Carousel, GoodsList, HotArea, NavGroup, UserInfo, Tip
  }
})

const props = defineProps({
  modelValue: {
    type: /** @type {import('vue').PropType<ReturnType<typeof useControls>['selectedControls']>} */ (Array),
    required: true
  },
  outProps: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['update:modelValue'])

const selectedControls = useVModel(props, 'modelValue')

const { activeControl } = storeToRefs(useControls())

const phoneRef = ref(/** @type {HTMLElement | null} */(null))

const onClick = (item) => {
  console.log('点击了phone里面的控件拉')
  activeControl.value = item
}

const onStart = (e) => {
  console.log('phone-start-e = ', e)
  const { dataset } = e?.item ?? {}
  const { name } = dataset ?? {}
  const findItem = selectedControls.value.find(el => el.componentName === name)
  if (!findItem) {
    console.error('findItem 不存在')
    return
  }
  findItem.state = 'fromMiddle'
  activeControl.value = findItem.state
}

const onEnd = (e) => {
}

useAddEventListener(phoneRef, 'dragover', (e) => {
  // console.log('dragover')
  // console.log('e = ', e)
  // 阻止默认行为以允许放置
  e.preventDefault()
})

useAddEventListener(phoneRef, 'dragenter', (e) => {
  // console.log('dragenter')
  // console.log('e = ', e)
  /* 必须是从 middle-container 这个元素进入的, 否则无效 */
  console.log(e?.relatedTarget?.className.includes('middle-container'))
  if (!(e?.relatedTarget?.className.includes('middle-container'))) return

  /* 已经存在了也直接return */
  if (selectedControls.value.some(el => el.componentName === 'Tip')) return

  /* 被拖动元素样式改变 */
  /* 显示虚拟线, 可以放置该组件 */
  selectedControls.value = [...selectedControls.value, getConfig()]
  nextTick(() => {
    console.log('selectedControls.value', selectedControls.value[0])
  })
})

useAddEventListener(phoneRef, 'dragleave', (e) => {
  console.log('dragleave')
  console.log('e = ', e)
  /* 必须是从 middle-container 这个元素中离开的 */
  if (!(e?.relatedTarget?.className.includes('middle-container'))) return
  selectedControls.value = selectedControls.value.filter(el => el.componentName !== 'Tip')
})

useAddEventListener(phoneRef, 'drop', (e) => {
  // console.log('drop')
  // console.log('e = ', e)
  // 阻止默认行为（会作为某些元素的链接打开）
  e.preventDefault()
  if (activeControl.value.state !== 'fromLeft') return
  selectedControls.value = [...selectedControls.value, activeControl.value].filter(el => el.componentName !== 'Tip')
})
</script>

<style lang="scss" scoped>
.phone-container {
  width: 100%;
  height: 100%;
}
</style>
