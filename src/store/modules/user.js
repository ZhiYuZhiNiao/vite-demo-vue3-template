import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  /* state */
  const count = ref(0)
  /* action */
  function increment() {
    count.value++
  }
  return { count, increment }
})
