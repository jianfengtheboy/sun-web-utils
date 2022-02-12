/**
 * 数值相关工具函数
 */
export default class NumberUtils {
  // 匹配正整数
  isPositiveNum(val) {
    return /^[1-9]\d*$/.test(val)
  }
  
  // 匹配负整数
  isNegativeNum(val) {
    return /^-[1-9]\d*$/.test(val)
  }

  // 匹配整数
  isInteger(val) {
    return /^(-|\+)?\d+$/.test(val)
  }
  
  // 匹配非负浮点数
  isNotNegativeFloatNum(val) {
    return /^\d+(\.\d+)?$/.test(val)
  }

  /**
    * @生成指定范围随机数 
    * @param { number } min 
    * @param { number } max 
    */
  RandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
