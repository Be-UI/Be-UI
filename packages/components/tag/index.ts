import type { App } from 'vue'
import Tag from './src/be-tag.vue'
import type { ITag } from './src/be-tag-type'

const tag = Tag as ITag
/**
 * 组件装载方法
 * @param app
 */
tag.install = (app: App): void => {
  app.component(tag.name || '', tag)
}
const BeTag: ITag = tag
export default BeTag
