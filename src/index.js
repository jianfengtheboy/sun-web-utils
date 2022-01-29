import arrayUtils from "../packages/array"
import browserUtils from "../packages/browser"
import cacheUtils from "../packages/cache"
import calculateUtils from "../packages/calculate"
import dateUtils from "../packages/date"
import domUtils from "../packages/dom"
import fileUtils from "../packages/file"
import filters from '../packages/filters'
import directives from "../packages/directives"
import functionUtils from '../packages/function'
import objectUtils from '../packages/object'
import numberUtils from '../packages/number'
import regExpUtils from '../packages/regexp'
import stringUtils from '../packages/string'
import treeUtils from "../packages/tree"

const ArrayUtils = new arrayUtils()
const BrowserUtils = new browserUtils()
const CacheUtils = new cacheUtils()
const CalculateUtils = new calculateUtils()
const DateUtils = new dateUtils()
const DomUtils = new domUtils()
const FileUtils = new fileUtils()
const FunctionUtils = new functionUtils()
const ObjectUtils = new objectUtils()
const NumberUtils = new numberUtils()
const RegExpUtils = new regExpUtils()
const StringUtils = new stringUtils()
const TreeUtils = new treeUtils()

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
    tree: TreeUtils
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
  TreeUtils
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
  TreeUtils
}
