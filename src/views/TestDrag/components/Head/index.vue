<template>
  <div class="Head-view-container unmover view-component">
    <div class="title">{{ props.form.headTitle }}</div>
  </div>
</template>

<script setup name="Head">
const props = defineProps({
  form: {
    type: /** @type {import('vue').PropType<import('./index').ControlForm>} */(Object),
    required: true
  }
})
</script>

<style lang="scss" scoped>
.Head-view-container {
  .title {
    height: 35px;
    text-align: center;
    font-size: 14px;
    line-height: 35px;
  }
}
</style>
