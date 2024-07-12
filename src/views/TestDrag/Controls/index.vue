<template>
  <div class="controls-list-container">
    <Vuedraggable
      v-model="controls"
      :sort="false"
      :group="{ name: 'list', pull: 'clone' }"
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

const props = defineProps({
  modelValue: {
    type: /** @type {import('vue').PropType<ReturnType<typeof useControls>['controls']>} */ (Array),
    required: true
  }
})

defineEmits(['update:modelValue'])

const controls = useVModel(props, 'modelValue')

const { selectedControls, activeControl } = storeToRefs(useControls())
const { controlMap, add } = useControls()

const onStart = (e) => {
}
const onEnd = (e) => {
  console.log('selectedControls.value = ', selectedControls.value)
}

// const pullfn = (val) => {
//   console.log('pullfn val = ', val)
// }

/**
 * @param {ReturnType<typeof useControls>['controls'][number]} item
 */
const onClick = (item) => {
  // 直接添加到中间
  const creatControlFn = controlMap.get(item.componentName)
  if (!creatControlFn) {
    console.error('creatControlFn 不存在')
    return
  }
  const cotrol = creatControlFn()
  add(cotrol)
  activeControl.value = cotrol
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
