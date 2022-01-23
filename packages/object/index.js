/**
 * 对象相关工具函数
 */
export default class ObjectUtils {
  /**
   * 是否是对象
   * @param {*} obj 
   */
  isObject(obj) {
    return toString.apply(obj) === '[object Object]'
  }
  
  isObj(value) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Object'
  }

  /**
   * 混合多个对象，按传入顺序覆盖
   * @param {Array[Object]} args
   */
  mixin(...args) {
    const that = this
    function deepMixin(total, object) {
      const totalKeys = Object.keys(total)
      const objKeys = Object.keys(object)
      objKeys.forEach(key => {
        const oValue = object[key]
        if(!totalKeys.includes(key)) {
          return total[key] = oValue
        } else {
          const tValue = total[key]
          if(that.isObject(tValue) && that.isObject(oValue)) {
            total[key] = that.mixin(tValue, oValue)
          } else {
            total[key] = oValue
          }
        }
      })
      return total
    }
  
    return args.reduce((total, arg) => {
      if(!that.isObject(arg)) return total
      total = deepMixin(total, arg)
      return total
    }, {})
  }
}
