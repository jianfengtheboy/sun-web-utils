/**
 * 字符串相关工具函数
 */
export default class StringUtils {
  /**
   * 是否是字符串
   * @param {*} value
   */ 
  isString(value) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'String'
  }

  /**
   * 是否boolean
   * @param {*} value
   */ 
  isBoolean(value) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Boolean'
  }

  /**
   * 是否为null
   * @param {*} value
   */ 
  isNull(value) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Null'
  }

  /**
   * 是否undefined
   * @param {*} value
   */ 
  isUndefined(value) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Undefined'
  }

  /**
   * 是否时间
   * @param {*} value
   */ 
  isDate(value) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Date'
  }

  /**
   * 是否Set对象
   * @param {*} value
   */ 
  isSet(value) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Set'
  }
  
  /**
   * 是否错误对象
   * @param {*} value
   */ 
  isError(value) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Error'
  }

  /**
   * 是否Symbol函数
   * @param {*} value
   */ 
  isSymbol(value) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Symbol'
  }

  /**
   * 是否Promise对象
   * @param {*} value
   */ 
  isPromise(value) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Promise'
  }

  /**
   * 是否为空
   * @param {any} string
   */ 
  isEmpty(string) {
    return string === undefined || string === null || string === ''
  }

  /**
   * 是否不为空
   * @param {any} string
   */ 
  notEmpty(string) {
    return !this.isEmpty(string)
  }

  /**
   * 下划线转驼峰
   * @param {String} string
   */ 
  toHump(string) {
    if (this.notString(string) || this.isEmpty(string)) return string
    return string.replace(/\\_(\w)/g, (all, letter) => letter.toUpperCase())
  }
  
  /**
   * 驼峰转下划线
   * @param {String} string
   */ 
  toLine(string) {
    if (this.notString(string) || this.isEmpty(string)) return string
    return string.replace(/([A-Z])/g, '_$1').toLowerCase()
  }

  /**
   * 生成一个通用唯一标识符
   */ 
  creatUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
}
