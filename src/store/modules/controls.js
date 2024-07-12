import { defineStore } from 'pinia'
import { ref, toValue } from 'vue'
import { getConfig as getArticleListConfig } from '@/views/TestDrag/components/ArticleList'
import { getConfig as getCarouselConfig } from '@/views/TestDrag/components/Carousel'
import { getConfig as getGoodsListConfig } from '@/views/TestDrag/components/GoodsList'
import { getConfig as getHotAreaConfig } from '@/views/TestDrag/components/HotArea'
import { getConfig as getNavGroupConfig } from '@/views/TestDrag/components/NavGroup'
import { getConfig as getUserInfoConfig } from '@/views/TestDrag/components/UserInfo'
import { getConfig as getTipConfig } from '@/views/TestDrag/components/Tip'
import { getConfig as getHeadConfig } from '@/views/TestDrag/components/Head'
import { getConfig as getBottomNavConfig } from '@/views/TestDrag/components/BottomNav'

export const useControls = defineStore('controls', () => {
  /** @description 左侧的控件列表 */
  const controls = ref(createControls())

  /** @description 中间部分的控件列表 */
  const selectedControls = ref(/** @type {ReturnType<createSelectedControls>} */([getHeadConfig(), getBottomNavConfig()]))

  /** @description 当前被点击的控件 */
  const activeControl = ref(/** @type {ReturnType<createControls>[number]} */({}))

  /** @description 当前正在被拖动中的控件 */
  const dragingControl = ref(/** @type {ReturnType<createControls>[number]} */({}))

  const controlMap = new Map([
    /** @type {const} */(['ArticleList', getArticleListConfig]),
    /** @type {const} */(['Carousel', getCarouselConfig]),
    /** @type {const} */(['GoodsList', getGoodsListConfig]),
    /** @type {const} */(['HotArea', getHotAreaConfig]),
    /** @type {const} */(['NavGroup', getNavGroupConfig]),
    /** @type {const} */(['UserInfo', getUserInfoConfig])
  ])

  /**
   * @description 向 selectedControls 中添加
   * @param {import('vue').MaybeRef<ReturnType<createSelectedControls>[number]>} control
   * @param {number} [index]
   */
  const add = (control, index) => {
    /* 先简单的直接加在末尾 */
    if (index === undefined) {
      selectedControls.value.push(toValue(control))
    } else {
      //
    }
  }

  /**
     * @description 删除 selectedControls 中的某个 control
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
  return _createControls().filter(el => el.componentName !== 'Head' && el.componentName !== 'BottomNav' && el.componentName !== 'Tip')
}

function _createControls() {
  return [
    getHeadConfig(),
    getArticleListConfig(),
    getCarouselConfig(),
    getGoodsListConfig(),
    getHotAreaConfig(),
    getNavGroupConfig(),
    getUserInfoConfig(),
    getTipConfig(),
    getBottomNavConfig()
  ]
}

/** @typedef {ReturnType<createControls>[number]} ActiveControl */
/** @typedef {ReturnType<createSelectedControls>} SelectedControls */
/** @typedef {ReturnType<createControls>} Controls */
