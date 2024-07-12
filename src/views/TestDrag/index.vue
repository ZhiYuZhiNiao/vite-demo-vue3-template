<template>
  <div class="test-drag-container">
    <div class="test-btn">
      <ElButton :type="'primary'" @click="onSave">测试保存</ElButton>
    </div>
    <div class="left-container item-container">
      <Controls
        v-model="controls"
      />
    </div>
    <div class="middle-container item-container">
      <div class="h5-container">
        <Phone
          v-model="selectedControls"
        />
      </div>
    </div>
    <div class="right-container item-container">
      <Form
        v-model="activeControl.controlForm"
        :control="activeControl"
      />
    </div>
  </div>
</template>

<script setup>
import Controls from './Controls/index.vue'
import Phone from './Phone/index.vue'
import Form from './Form/index.vue'
import { useControls } from '@/store'
import { storeToRefs } from 'pinia'

const { controls, activeControl, selectedControls } = storeToRefs(useControls())
const onSave = () => {
  console.log('selectedControls.value = ', selectedControls.value)
}

</script>

<style lang="scss" scoped>
.test-drag-container {
  position: relative;
  box-sizing: border-box;
  display: flex;
  margin-top: 50px;
  .test-btn {
    position: absolute;
    right: 80px;
    top: -40px;
  }
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
