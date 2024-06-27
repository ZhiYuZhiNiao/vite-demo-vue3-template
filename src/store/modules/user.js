import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  /* state */
  const count = ref(0)
  /* action */
  function increment() {
    count.value++
  }

  const dobule = computed(() => count.value * 2)

  return { count, increment, dobule }
})
