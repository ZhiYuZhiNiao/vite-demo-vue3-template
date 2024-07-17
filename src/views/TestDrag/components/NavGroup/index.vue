<template>
  <div class="NavGroup-view-container view-component draggable">
    <h2>导航组</h2>
    <p
      v-for="([k, v]) of Object.entries(props.form)"
      :key="k"
    >
      {{ k }}: {{ v }}
    </p>
  </div>

</template>

<script setup name="NavGroup">
const props = defineProps({
  form: {
    type: /** @type {import('vue').PropType<import('./index').ControlForm>} */(Object),
    required: true
  }
})
</script>

<style lang="scss" scoped>
.NavGroup-view-container {
  text-align: center;
  min-height: 200px;
}
</style>
