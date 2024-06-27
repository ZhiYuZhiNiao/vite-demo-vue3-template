<template>
  <ElRow :gutter="15">
    <ElCol :sm="12" :xs="24">
      <div style="background-color: pink; height: 200px">1</div>
    </ElCol>
    <ElCol :sm="12" :xs="24">
      <div style="background-color: orange; height: 200px">2</div>
    </ElCol>
  </ElRow>
</template>
<script setup>
import { ElRow, ElCol } from 'element-plus'
</script>
<style lang="scss" scoped>
.row-container {
  height: 200px;
}
</style>
