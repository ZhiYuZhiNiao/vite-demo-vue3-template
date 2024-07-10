<template>
  <div class="tip-container">
    释放鼠标将元素添加此处
  </div>
</template>

<script setup name="Tip">
</script>

<style lang="scss" scoped>
.tip-container {
  height: 50px;
  width: 100%;
  border: 1px dotted var('--el-color-primary');
  line-height: 50px;
  text-align: center;
}
</style>
