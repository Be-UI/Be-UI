import loading from './src/be-loading-service'
import { withInstall } from "@be-ui/utils/with-install"


const BeLoading = withInstall(loading)
export {
  BeLoading
}
export default BeLoading

export * from './src/loading-plugin'