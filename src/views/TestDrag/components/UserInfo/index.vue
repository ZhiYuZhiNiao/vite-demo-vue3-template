<template>
  <div class="UserInfo-view-container view-component draggable">
    <h2>用户信息</h2>
    <p
      v-for="([k, v]) of Object.entries(props.form)"
      :key="k"
    >
      {{ k }}: {{ v }}
    </p>
  </div>
</template>

<script setup name="UserInfo">
const props = defineProps({
  form: {
    type: /** @type {import('vue').PropType<import('./index').ControlForm>} */(Object),
    required: true
  }
})
</script>

<style lang="scss" scoped>
.UserInfo-view-container {
  text-align: center;
  min-height: 200px;
}
</style>
