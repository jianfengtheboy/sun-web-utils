import ArrayUtils from "../packages/array"
import CacheUtils from "../packages/cache"

const ArrayUtils = new ArrayUtils()
const CacheUtils = new CacheUtils()

/**
 * 初始化，若使用Vue，可使用Vue.use()绑定到实例上；反之，可直接运行此函数生成实例对象使用
 */
const install = function (Vue) {
  const utils = {
    array: ArrayUtils,
    cache: CacheUtils
  }
  if (Vue) {
    if (!Vue.prototype.$u) {
      Vue.prototype.$u = utils
    }
    Vue.prototype.$utils = utils
  }
  return utils
}

export default {
  install,
  ArrayUtils,
  CacheUtils
}

export {
  ArrayUtils,
  CacheUtils
}
