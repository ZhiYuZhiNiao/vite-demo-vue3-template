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
import { useControls } from './useControls'

const props = defineProps({
  modelValue: {
    type: /** @type {import('vue').PropType<import('./useControls').Controls>} */(Array),
    required: true
  }
})

// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['update:modelValue'])

const { list, onStart, onEnd } = useControls(props, 'modelValue')
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
