<template>
  <div class="app-container">
    <p><RouterLink to="/">Home</RouterLink></p>
    <p><RouterLink to="/Demo">Demo </RouterLink></p>
    <p><RouterLink to="/Todo">Todo</RouterLink></p>

    <div class="content-container">
      <RouterView />
    </div>
  </div>
</template>
<script setup>
// import { ref, reactive } from 'vue'
</script>
<style lang="scss" scoped>
.app-container {
  margin: 100px auto;
  text-align: center;
}
</style>
