<template>
  <div class="ArticleList-view-container view-component draggable">
    <h2>文章列表</h2>
    <p
      v-for="([k, v]) of Object.entries(props.form)"
      :key="k"
    >
      {{ k }}: {{ v }}
    </p>
  </div>
</template>

<script setup name="ArticleList">
const props = defineProps({
  form: {
    type: /** @type {import('vue').PropType<import('./index').ControlForm>} */(Object),
    required: true
  }
})
</script>

<style lang="scss" scoped>
.ArticleList-view-container {
  text-align: center;
  min-height: 200px;
}
</style>
