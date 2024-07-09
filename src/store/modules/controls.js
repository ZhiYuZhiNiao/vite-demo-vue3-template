import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getConfig as getArticleListConfig } from '@/views/TestDrag/components/ArticleList'
import { getConfig as getCarouselConfig } from '@/views/TestDrag/components/Carousel'
import { getConfig as getGoodsListConfig } from '@/views/TestDrag/components/GoodsList'
import { getConfig as getHotAreaConfig } from '@/views/TestDrag/components/HotArea'
import { getConfig as getNavGroupConfig } from '@/views/TestDrag/components/NavGroup'
import { getConfig as getUserInfoConfig } from '@/views/TestDrag/components/UserInfo'

export const useControls = defineStore('controls', () => {
  /** @description 左侧的控件列表 */
  const controls = ref(createControls())

  /** @description 中间部分的控件列表 */
  const selectedControls = ref(createSelectedControls())

  /** @description 当前被点击的控件 */
  const activeControl = ref(/** @type {ReturnType<createControls>[number]} */({}))

  function createControls() {
    return [
      getArticleListConfig(),
      getCarouselConfig(),
      getGoodsListConfig(),
      getHotAreaConfig(),
      getNavGroupConfig(),
      getUserInfoConfig()
    ]
  }

  function createSelectedControls() {
    return createControls().map(el => {
      return ref(el)
    })
  }

  function createForm() {
    return {}
  }

  return { activeControl, controls, selectedControls, createControls, createSelectedControls, createForm }
})
