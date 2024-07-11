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

import { ref } from 'vue'
import { useAddEventListener } from '@/hook'
import { useControls } from '@/store'
import { storeToRefs } from 'pinia'

defineOptions({
  components: {
    ArticleList, Carousel, GoodsList, HotArea, NavGroup, UserInfo, Tip
  }
})

const props = defineProps({
  // modelValue: {
  //   type: /** @type {import('vue').PropType<ReturnType<typeof useControls>['selectedControls']>} */ (Array),
  //   required: true
  // },
  outProps: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['update:modelValue'])

// const selectedControls = useVModel(props, 'modelValue')

const { activeControl, dragingControl, selectedControls } = storeToRefs(useControls())
const { add, del } = useControls()

const phoneRef = ref(/** @type {HTMLElement | null} */(null))

const tipControl = getConfig()

const onClick = (item) => {
  console.log('点击了phone里面的控件拉')
  activeControl.value = item
}

const onStart = (e) => {
  console.log('phone-start-e = ', e)
  const { dataset } = e?.item ?? {}
  const { name } = dataset ?? {}
  /* 不需要创建新的, 只需要还使用原来的就行 */
  const findItem = selectedControls.value.find(el => el.componentName === name)
  if (!findItem) {
    console.error('findItem 不存在')
    return
  }
  findItem.state = 'fromMiddle'
  dragingControl.value = findItem
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
  if (!(e?.relatedTarget?.className.includes('middle-container'))) return

  /* 已经存在了也直接return */
  if (selectedControls.value.some(el => tipControl.componentName)) return

  /* 被拖动元素样式改变 */
  /* 显示虚拟线, 可以放置该组件 */
  add(tipControl)
})

useAddEventListener(phoneRef, 'dragleave', (e) => {
  console.log('dragleave')
  console.log('e = ', e)
  /* 必须是从 middle-container 这个元素中离开的 */
  if (!(e?.relatedTarget?.className.includes('middle-container'))) return
  del(tipControl)
})

useAddEventListener(phoneRef, 'drop', (e) => {
  // console.log('drop')
  // console.log('e = ', e)
  // 阻止默认行为（会作为某些元素的链接打开）
  e.preventDefault()
  console.log('activeControl.value = ', dragingControl.value)
  if (dragingControl.value.state !== 'fromLeft') return
  add(dragingControl)
  del(tipControl)
})
</script>

<style lang="scss" scoped>
.phone-container {
  width: 100%;
  height: 100%;
}
</style>
