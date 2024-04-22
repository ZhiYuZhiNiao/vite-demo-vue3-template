<template>
  <div class="u-table-container">
    <div class="left-box">
      <slot name="left" />
    </div>
    <div class="main-box">
      <div class="search-box">
        <SearchForm
          v-model="searchForm"
          :search-list="props.searchConfig"
          inline
        />
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
// @ts-check
import { ref, watch } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { list2Obj } from '@/utils/index'
/** @type {import('./type/index').Props} */
const props = (defineProps({
  searchConfig: Array
}))

/**
 * @typedef {object} SlotsType
 * @prop {() => any} [left]
 * @prop {() => any} [right]
 */

/** @type {SlotsType} */
// eslint-disable-next-line no-unused-vars
const slots = defineSlots()

const searchForm = ref(list2Obj(props.searchConfig))

watch(searchForm, (newVal) => {
  console.log('newVal', newVal)
})

</script>
<style lang="scss" scoped>
.u-table-container {
  display: flex;
  &>.main-box {
    flex: 1;
  }
}
</style>
