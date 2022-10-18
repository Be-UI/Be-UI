import { onMounted, onUnmounted, Ref, ref } from 'vue'
import {IWindowLocation} from "./types";

export const hasWindow = typeof window !== 'undefined'
const defaultWindow = hasWindow ? window : null
export const useBrowserLocation = (customWindow = defaultWindow): Ref<IWindowLocation> => {
  const getWindowLocation = (): IWindowLocation => {
    const { hash, host, hostname, href, origin, pathname, port, protocol, search } =
      customWindow?.location || {}

    return {
      hash,
      host,
      hostname,
      href,
      origin,
      pathname,
      port,
      protocol,
      search,
    }
  }
  const updateLocation = (): void => {
    locationState.value = getWindowLocation()
  }

  const locationState = ref(getWindowLocation())

  onMounted(() => {
    if (customWindow) {
      customWindow.addEventListener('popstate', updateLocation)
      customWindow.addEventListener('hashchange', updateLocation)
    }
  })

  onUnmounted(() => {
    if (customWindow) {
      customWindow.removeEventListener('popstate', updateLocation)
      customWindow.removeEventListener('hashchange', updateLocation)
    }
  })

  return locationState
}
