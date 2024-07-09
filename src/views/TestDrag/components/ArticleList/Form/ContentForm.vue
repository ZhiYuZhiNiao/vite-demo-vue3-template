<template>
  <div class="ContentForm ArticleList-ContentForm">
    <ElForm>
      <div class="item-container">
        <div class="title">展示设置</div>
        <ElFormItem>
          <ElRadioGroup v-model="radio">
            <ElRadio :value="3">Option A</ElRadio>
          </ElRadioGroup>
        </ElFormItem>
      </div>
    </ElForm>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
</style>
