<template>
  <div class="app-container">
    <ElButton @click="onClick">点我</ElButton>
    <!-- <ElInput v-model="person.name"></ElInput>
    <div>{{ person.name }}</div>
    <ElInput v-model="count"></ElInput>
    <div>{{ count }}</div> -->
    <MyDialog
      v-if="dialog.show"
      :code="dialog.code"
      @closed="dialog.show = false"
    />
  </div>
</template>

<script setup>
import MyDialog from '@/components/MyDialog/index.vue'
import { reactive, ref } from 'vue'

const dialog = reactive({
  show: false,
  code: 'zz'
})

const testData = reactive({
  person: {
    name: '张三'
  },
  count: 1
})

const { person, count } = testData
console.log('person = ', person)

const onClick = () => {
  dialog.show = true
  console.log('testData2.name = ', testData2.name)
  console.log('testData2.name.value = ', testData2.name.value)
}


const testData2 = reactive({
  name: '张三',
  obj: {
    name: '嘿嘿'
  }
})

testData2.name = ref('李四')
testData2.obj = ref({name: '哈哈'}).value
</script>
<style lang="scss" scoped>
.app-container {
  margin: 100px auto;
}
</style>
