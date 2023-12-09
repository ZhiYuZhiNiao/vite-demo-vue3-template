<template>
  <svg class="svg-use-box" :fill="color">
    <use :xlink:href="symbolId" />
  </svg>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#333'
  },
  width: {
    type: [Number, String],
    default: 32
  },
  height: {
    type: [Number, String],
    default: 32
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const w = computed(() => `${props.width}px`)
const h = computed(() => `${props.height}px`)
</script>
<style lang="scss" scoped>
.svg-use-box {
  width: v-bind(w);
  height: v-bind(h);
}
</style>
