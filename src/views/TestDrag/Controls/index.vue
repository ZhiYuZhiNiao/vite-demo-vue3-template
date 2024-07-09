<template>
  <div class="controls-list-container">
    <Vuedraggable
      v-model="list"
      chosen-class="chosen-item"
      class="draggable-container"
      @start="onStart"
      @end="onEnd"
    >
      <template #item="{element}">
        <div class="item">{{ element.name }}</div>
      </template>
    </Vuedraggable>
  </div>
</template>

<script setup>
import Vuedraggable from 'vuedraggable'
import { useControls } from '@/store'
import { useVModel } from '@/hook'

const { createControls } = useControls()
console.log('createControls', createControls)

const props = defineProps({
  modelValue: {
    type: /** @type {import('vue').PropType<ReturnType<typeof createControls>>} */(Array),
    required: true
  }
})

const list = useVModel(props, 'modelValue')
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
