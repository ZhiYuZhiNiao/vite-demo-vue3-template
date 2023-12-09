<template>
  <div class="Home-container">
    <h2>Home</h2>
    <h4>{{ count }}</h4>
    <el-button type="primary" @click="increment">++</el-button>
    <SvgIcon name="user"/>
  </div>
</template>
<script setup>
import SvgIcon from '@/components/SvgIcon'
// import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
const store = useUserStore()
/* 使用 storeToRefs 可以保证 reactive 对象解构之后的属性还是具有响应性 .. ref */
const { count } = storeToRefs(store)
const { increment } = store
</script>
<style lang="scss" scoped></style>
