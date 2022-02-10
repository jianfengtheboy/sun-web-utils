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

const ArrayUtils = new ArrayUtils()
const BrowserUtils = new BrowserUtils()
const CacheUtils = new CacheUtils()
const CalculateUtils = new CalculateUtils()
const DateUtils = new DateUtils()
const DomUtils = new DomUtils()
const FileUtils = new FileUtils()
const FunctionUtils = new FunctionUtils()
const ObjectUtils = new ObjectUtils()
const NumberUtils = new NumberUtils()
const RegExpUtils = new RegExpUtils()
const StringUtils = new StringUtils()
const TreeUtils = new TreeUtils()

/**
 * 初始化，若使用Vue，可使用Vue.use()绑定到实例上；反之，可直接运行此函数生成实例对象使用
 */
const install = function (Vue) {
  const utils = {
    array: ArrayUtils,
    browser: BrowserUtils,
    cache: CacheUtils,
    calculate: CalculateUtils,
    date: DateUtils,
    dom: DomUtils,
    file: FileUtils,
    func: FunctionUtils,
    object: ObjectUtils,
    number: NumberUtils,
    regexp: RegExpUtils,
    string: StringUtils,
    tree: TreeUtils,
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
  ArrayUtils,
  BrowserUtils,
  CacheUtils,
  CalculateUtils,
  DateUtils,
  DomUtils,
  FileUtils,
  FunctionUtils,
  ObjectUtils,
  NumberUtils,
  RegExpUtils,
  StringUtils,
  TreeUtils,
  WebsocketHeartbeat
}

export {
  ArrayUtils,
  BrowserUtils,
  CacheUtils,
  CalculateUtils,
  DateUtils,
  DomUtils,
  FileUtils,
  FunctionUtils,
  ObjectUtils,
  NumberUtils,
  RegExpUtils,
  StringUtils,
  TreeUtils,
  WebsocketHeartbeat
}
