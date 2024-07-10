<template>
  <div class="form-item-container">
    <div class="title">{{ props.title }}</div>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  title: String
})
</script>

<style lang="scss" scoped>
.form-item-container {
  padding: 10px;
  .title {
    padding-top: 6px;
    font-size: 16px;
  }
}
</style>
