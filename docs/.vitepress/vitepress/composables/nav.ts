import { computed } from 'vue'
import { useData } from 'vitepress'

export const useNav = () => {
  const { theme } = useData()
  return computed(() => {
    return theme.value.nav
  })
}
