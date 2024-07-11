<template>
  <div class="test-drag-container">
    <div class="left-container item-container">
      <Controls/>
    </div>
    <div class="middle-container item-container">
      <div class="h5-container">
        <Phone/>
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
// import { useControls } from '@/store'
// import { storeToRefs } from 'pinia'

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
    background-color: #f0f2f5;
    .h5-container {
      width: 375px;
      background-color: #fff;
      // border-radius: 8px;
    }
  }
}
</style>
