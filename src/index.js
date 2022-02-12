import ArrayUtils from "../packages/array"
import BrowserUtils from "../packages/browser"
import CacheUtils from "../packages/cache"
import CalculateUtils from "../packages/calculate"
import DateUtils from "../packages/date"
import DomUtils from "../packages/dom"
import FileUtils from "../packages/file"
import Filters from '../packages/filters'
import Directives from "../packages/directives"
import FunctionUtils from '../packages/function'
import ObjectUtils from '../packages/object'
import NumberUtils from '../packages/number'
import RegExpUtils from '../packages/regexp'
import StringUtils from '../packages/string'
import TreeUtils from "../packages/tree"
import WebsocketHeartbeat from "../packages/websocket"

const arrayUtils = new ArrayUtils()
const browserUtils = new BrowserUtils()
const cacheUtils = new CacheUtils()
const calculateUtils = new CalculateUtils()
const dateUtils = new DateUtils()
const domUtils = new DomUtils()
const fileUtils = new FileUtils()
const functionUtils = new FunctionUtils()
const objectUtils = new ObjectUtils()
const numberUtils = new NumberUtils()
const regExpUtils = new RegExpUtils()
const stringUtils = new StringUtils()
const treeUtils = new TreeUtils()

/**
 * 初始化，若使用Vue，可使用Vue.use()绑定到实例上；反之，可直接运行此函数生成实例对象使用
 */
const install = function (Vue) {
  const utils = {
    array: arrayUtils,
    browser: browserUtils,
    cache: cacheUtils,
    calculate: calculateUtils,
    date: dateUtils,
    dom: domUtils,
    file: fileUtils,
    func: functionUtils,
    object: objectUtils,
    number: numberUtils,
    regexp: regExpUtils,
    string: stringUtils,
    tree: treeUtils,
    WebsocketHeartbeat
  }
  if (Vue) {
    if (!Vue.prototype.$u) {
      Vue.prototype.$u = utils
    }
    Vue.prototype.$utils = utils
  }
  // 自定义过滤器
  Filters(Vue)
  // 自定义指令
  Directives(Vue)
  return utils
}

export default {
  install,
  arrayUtils,
  browserUtils,
  cacheUtils,
  calculateUtils,
  dateUtils,
  domUtils,
  fileUtils,
  functionUtils,
  objectUtils,
  numberUtils,
  regExpUtils,
  stringUtils,
  treeUtils,
  WebsocketHeartbeat
}

export {
  arrayUtils,
  browserUtils,
  cacheUtils,
  calculateUtils,
  dateUtils,
  domUtils,
  fileUtils,
  functionUtils,
  objectUtils,
  numberUtils,
  regExpUtils,
  stringUtils,
  treeUtils,
  WebsocketHeartbeat
}
