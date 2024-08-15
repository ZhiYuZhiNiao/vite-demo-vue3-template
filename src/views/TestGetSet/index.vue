<template>
  <div class="TestGetSet">
    <el-input v-model="model.str" />
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
const model = reactive({
  str: '',
  get _str() {
    return model.str + '+'
  }
})

watch(() => model._str, (val) => {
  console.log('变化了 val = ', val)
})
</script>
