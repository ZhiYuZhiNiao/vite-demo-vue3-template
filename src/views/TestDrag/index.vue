<template>
  <div class="test-drag-container">
    <div class="left-container item-container">
      <Controls v-model="controls" />
    </div>
    <div class="middle-container item-container">
      <div class="h5-container">
        <Phone />
      </div>
    </div>
    <div class="right-container item-container">
      <Form />
    </div>
  </div>
</template>

<script setup>
import Controls from './Controls/index.vue'
import Phone from './Phone/index.vue'
import Form from './Form/index.vue'
import { useControls } from '@/store'
import { storeToRefs } from 'pinia'

const { controls } = storeToRefs(useControls())

</script>

<style lang="scss" scoped>
.test-drag-container {
  box-sizing: border-box;
  display: flex;
  margin-top: 50px;
  .item-container {
    padding: 10px;
    width: 25%;
    margin-right: 35px;
    min-height: 800px;
    border: 1px solid #000;
    &:last-child {
    }
  }

  .middle-container {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    .h5-container {
      width: 375px;
      height: 667px;
      border: 1px solid pink;
      // border-radius: 8px;
    }
  }
}
</style>
