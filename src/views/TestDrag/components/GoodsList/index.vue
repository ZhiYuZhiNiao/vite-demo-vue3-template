<template>
  <div class="GoodsList-view-container view-component draggable">
    <h2>商品列表</h2>
    <p
      v-for="([k, v]) of Object.entries(props.form)"
      :key="k"
    >
      {{ k }}: {{ v }}
    </p>
  </div>
</template>

<script setup name="GoodsList">
const props = defineProps({
  form: {
    type: /** @type {import('vue').PropType<import('./index').ControlForm>} */(Object),
    required: true
  }
})
</script>

<style lang='scss' scoped>
.GoodsList-view-container {
  text-align: center;
  min-height: 200px;
}
</style>
