/**
 * 数组相关的工具函数
 */
export default class ArrayUtils {
  /**
   * 是否为数组
   * @param {*} arr
   */
  isArray(arr) {
    return toString.apply(arr) === '[object Array]'
  }
}
