<template>
  <div class="app-container">
    <ElButton @click="onClick">点我</ElButton>
    <MyDialog
      v-if="dialog.show"
      @closed="dialog.show = false"
    />
  </div>
</template>

<script setup>
import MyDialog from '@/components/MyDialog/index.vue'
import { reactive } from 'vue'

const dialog = reactive({
  show: false,
  code: 'zz'
})

const onClick = () => {
  dialog.show = true
}
</script>
<style lang="scss" scoped>
.app-container {
  margin: 100px auto;
}
</style>
