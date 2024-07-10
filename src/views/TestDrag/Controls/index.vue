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

const { activeControl } = storeToRefs(useControls())

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
  activeControl.value = list.value.find(el => el.componentName === name)
  console.log('activeControl.value = ', activeControl.value)
  console.log('onStart e = ', e)
  console.log(e?.originalEvent?.dataTransfer?.setData)
  e?.originalEvent?.dataTransfer?.setData('test', '12')
}
const onEnd = (e) => {
  console.log('end e = ', e)
  console.log(e?.originalEvent?.dataTransfer?.getData('test'))
}

/**
 * @param {ReturnType<typeof useControls>['controls'][number]} item
 */
const onClick = (item) => {
  console.log('点击了左侧item = ', item)
  // 选中了当前的控件
  activeControl.value = item
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
