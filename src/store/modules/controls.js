import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getConfig as getArticleListConfig } from '@/views/TestDrag/components/ArticleList'
import { getConfig as getCarouselConfig } from '@/views/TestDrag/components/Carousel'
import { getConfig as getGoodsListConfig } from '@/views/TestDrag/components/GoodsList'
import { getConfig as getHotAreaConfig } from '@/views/TestDrag/components/HotArea'
import { getConfig as getNavGroupConfig } from '@/views/TestDrag/components/NavGroup'
import { getConfig as getUserInfoConfig } from '@/views/TestDrag/components/UserInfo'
import { getConfig as getTipConfig } from '@/views/TestDrag/components/Tip'

export const useControls = defineStore('controls', () => {
  /** @description 左侧的控件列表 */
  const controls = ref(createControls())

  /** @description 中间部分的控件列表 */
  const selectedControls = ref(/** @type {ReturnType<createSelectedControls>} */([]))

  /** @description 当前被点击的控件 */
  const activeControl = ref(/** @type {ReturnType<createControls>[number]} */({}))

  const controlMap = Object.freeze({
    ArticleList: getArticleListConfig,
    Carousel: getCarouselConfig,
    GoodsList: getGoodsListConfig,
    HotArea: getHotAreaConfig,
    NavGroup: getNavGroupConfig,
    UserInfo: getUserInfoConfig
  })

  function createForm() {
    return {}
  }

  return { activeControl, controls, selectedControls, createForm, controlMap }
})

// eslint-disable-next-line no-unused-vars
function createSelectedControls() {
  return _createControls()
}

function createControls() {
  return _createControls().filter(el => el.componentName !== 'Tip')
}

function _createControls() {
  return [
    getArticleListConfig(),
    getCarouselConfig(),
    getGoodsListConfig(),
    getHotAreaConfig(),
    getNavGroupConfig(),
    getUserInfoConfig(),
    getTipConfig()
  ]
}
