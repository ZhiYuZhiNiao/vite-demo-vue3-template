import { uuidv4 } from '@/utils'
export const getConfig = () => ({
  componentName: /** @type {const} */('HotArea'),
  name: /** @type {const} */('热区'),
  contentFormLayout: [
    {
      label: /** @type {const} */('内容设置'),
      id: uuidv4()
    }
  ]
})
