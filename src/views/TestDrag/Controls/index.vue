<template>
  <div class="controls-list-container">
    <Vuedraggable
      v-model="list"
      itemKey="componentName"
      chosen-class="chosen-item"
      class="draggable-container"
      @start="onStart"
      @end="onEnd"
    >
      <template #item="{element}">
        <div class="item left-control" :data-name="element.componentName" @click="onClick(element)">{{ element.name }}</div>
      </template>
    </Vuedraggable>
  </div>
</template>

<script setup>
import Vuedraggable from 'vuedraggable'
import { useControls } from '@/store'
import { storeToRefs } from 'pinia'
import { useVModel } from '@/hook'

const { dragingControl } = storeToRefs(useControls())
const { controlMap } = useControls()

const props = defineProps({
  modelValue: {
    type: /** @type {import('vue').PropType<ReturnType<typeof useControls>['controls']>} */(Array),
    required: true
  }
})

const list = useVModel(props, 'modelValue')

const onStart = (e) => {
  const { dataset } = e?.item ?? {}
  const { name } = dataset ?? {}
  console.log('controlMap', controlMap)
  /* 需要创建一个新的xx */
  const fn = controlMap[name]
  if (!fn) {
    console.error('fn 不存在')
    return
  }
  dragingControl.value = fn()
  dragingControl.value.state = 'fromLeft'
}
const onEnd = (e) => {
}

/**
 * @param {ReturnType<typeof useControls>['controls'][number]} item
 */
const onClick = (item) => {
  console.log('点击了左侧item = ', item)
  // 直接添加到中间
}
</script>

<style lang="scss" scoped>
.controls-list-container {
  .draggable-container {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 70px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border: 1px solid #000;
      margin-top: 15px;
      margin-right: 15px;
      &:hover {
        cursor: move;
        background-color: #f1f1f1;
      }
    }
    .chosen-item {
      border: solid 2px #3089dc;
    }
  }

}
</style>
