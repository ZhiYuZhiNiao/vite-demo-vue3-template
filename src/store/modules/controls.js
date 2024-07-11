import { defineStore } from 'pinia'
import { ref, toValue } from 'vue'
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

  /** @description 当前正在被拖动中的控件 */
  const dragingControl = ref(/** @type {ReturnType<createControls>[number]} */({}))

  const controlMap = Object.freeze({
    ArticleList: getArticleListConfig,
    Carousel: getCarouselConfig,
    GoodsList: getGoodsListConfig,
    HotArea: getHotAreaConfig,
    NavGroup: getNavGroupConfig,
    UserInfo: getUserInfoConfig
  })

  /**
   * @param {import('vue').MaybeRef<ReturnType<createSelectedControls>[number]>} control
   */
  const add = (control) => {
    /* 先简单的直接加在末尾 */
    selectedControls.value = [...selectedControls.value, toValue(control)]
  }

  /**
   * @param {import('vue').MaybeRef<ReturnType<createSelectedControls>[number]>} control
   */
  const del = (control) => {
    selectedControls.value = selectedControls.value.filter(el => el.componentName !== toValue(control).componentName)
  }

  return { activeControl, dragingControl, controls, selectedControls, controlMap, add, del }
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
