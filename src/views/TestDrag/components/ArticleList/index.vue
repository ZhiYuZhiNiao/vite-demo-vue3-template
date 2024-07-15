<template>
  <div class="ArticleList-view-container view-component draggable">
    <h2>文章列表</h2>
  </div>
</template>

<script setup name="ArticleList">
const props = defineProps({
  form: {
    type: /** @type {import('vue').PropType<import('./index').ControlForm>} */(Object),
    required: true
  }
})

console.log(props.form.articleListStyle)
</script>

<style lang="scss" scoped>
.ArticleList-view-container {
  text-align: center;
  min-height: 200px;
}
</style>
