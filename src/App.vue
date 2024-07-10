<template>
  <div class="container">
    <div class="left">
      <p><RouterLink to="/">Go to Home</RouterLink></p>
      <p><RouterLink to="/TestDrag">TestDrag</RouterLink></p>
      <p><RouterLink to="/TestForm">TestForm</RouterLink></p>
    </div>
    <div class="main">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup>
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  height: 100vh;
  .left {
    width: 15%;
    margin-right: 20px;
    border: 1px solid #000;
  }

  .main {
    width: 85%;
  }
}
</style>
