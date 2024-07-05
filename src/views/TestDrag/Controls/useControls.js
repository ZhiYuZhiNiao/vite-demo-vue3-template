import { reactive, toRefs } from 'vue'
import { getConfig as getArticleListConfig } from '../components/ArticleList'
import { getConfig as getCarouselConfig } from '../components/Carousel'
import { getConfig as getGoodsListConfig } from '../components/GoodsList'
import { getConfig as getHotAreaConfig } from '../components/HotArea'
import { getConfig as getNavGroupConfig } from '../components/NavGroup'
import { getConfig as getUserInfoConfig } from '../components/UserInfo'

import { useVModel } from '@/hook'

/**
 * @template T
 * @template {keyof T} K
 * @template [V=T[K]]
 * @param {T} props
 * @param {K} key
 */
export function useControls (props, key) {
  const state = reactive({
    list: /** @type {import('vue').WritableComputedRef<V>} */ (useVModel(props, key))
  })

  const onStart = (e) => {
    console.log('start')
    console.log('e', e)
  }

  const onEnd = (e) => {
    console.log('end')
    console.log('e', e)
  }

  return {
    ...toRefs(state),
    onStart,
    onEnd
  }
}

export function createControlList() {
  return [
    getArticleListConfig(),
    getCarouselConfig(),
    getGoodsListConfig(),
    getHotAreaConfig(),
    getNavGroupConfig(),
    getUserInfoConfig()
  ]
}

/**
 * @description 控件列表类型
 * @typedef {ReturnType<createControlList>} Controls
 */
