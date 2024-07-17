<template>
  <div class="BottomNav-view-container unmover view-component">
    <h2>底部导航</h2>
    <!-- <p
      v-for="([k, v]) of Object.entries(props.form)"
      :key="k"
    >
      {{ k }}: {{ v }}
    </p> -->
  </div>
</template>

<script setup name="BottomNav">
defineProps({
  form: {
    type: /** @type {import('vue').PropType<import('./index').ControlForm>} */(Object),
    required: true
  }
})
</script>

<style lang="scss" scoped>
.BottomNav-view-container {
  box-sizing: border-box;
  text-align: center;
}
</style>
