<template>
  <div class="u-table-container">
    <div class="left-box">
      <slot name="left" />
    </div>
    <div class="main-box">
      <div class="search-box">

      </div>
      <div class="table-box"></div>
      <div class="pagination-box"></div>
    </div>
    <div class="right-box">
      <slot name="right" />
    </div>
  </div>
</template>
<script setup>
/**
 * @typedef {object} PropsType
 * @prop {} formSearch
 */
// const props = defineProps({
//   formSearch: Array,
//   tableColumn: Array
// })

/**
 * @typedef {object} SlotsType
 * @prop {() => any} [left]
 * @prop {() => any} [right]
 */

/** @type {SlotsType} */
// eslint-disable-next-line no-unused-vars
const slots = defineSlots()

</script>
<style lang="scss" scoped>
.u-table-container {
  display: flex;
  &>.main-box {
    flex: 1;
  }
}
</style>
