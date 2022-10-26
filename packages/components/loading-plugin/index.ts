import { withInstall } from '@be-ui/utils'
import loading, { beLoading } from './src/be-loading-service'
export const BeLoading = withInstall(loading)
export default BeLoading
export const loadingPlugin = { close: beLoading.close, init: beLoading.init }
