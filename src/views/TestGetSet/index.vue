<template>
  <div class="TestGetSet">
    <el-input v-model="model.str" />
    <button @click="onClick">点我</button>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
const model = reactive({
  str: '',
  get _str() {
    return model.str + '+'
  },
  set _str(val) {
    model.str = val.replace('+', '')
  }
})

watch(() => model._str, (val) => {
  console.log('变化了_str val = ', val)
})

watch(() => model.str, (val) => {
  console.log('变化了 str val = ', val)
})

const onClick = () => {
  model._str = 'ab+'
}
</script>
