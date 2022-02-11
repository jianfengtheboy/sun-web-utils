/**
 * 字符串相关工具函数
 */
export default class StringUtils {
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
