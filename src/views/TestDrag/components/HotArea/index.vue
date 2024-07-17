<template>
  <div  class="HotArea-view-container view-component draggable">
    <h2>热区</h2>
    <p
      v-for="([k, v]) of Object.entries(props.form)"
      :key="k"
    >
      {{ k }}: {{ v }}
    </p>
  </div>
</template>

<script setup name="HotArea">
const props = defineProps({
  form: {
    type: /** @type {import('vue').PropType<import('./index').ControlForm>} */(Object),
    required: true
  }
})
</script>

<style lang="scss" scoped>
.HotArea-view-container {
  text-align: center;
  min-height: 200px;
}
</style>
