<template>
  <div class="ArticleList-Form-container">
    <FormTitle
      v-model="activeType"
      :title="title"
      @change="onActiveTypeChange"
    />
  </div>
</template>

<script setup>
import FormTitle from '@/components/FormTitle/index.vue'
import useFormTitle from '@/components/FormTitle/useFormTitle'

const { activeType, title } = useFormTitle('文章列表')

/**
 * @param {UnwrapRef<ReturnType<typeof useFormTitle>['activeType']>} k
 */
const onActiveTypeChange = (k) => {}
</script>

<style lang="scss" scoped></style>
