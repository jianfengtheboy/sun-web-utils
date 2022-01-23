/**
 * 计算相关工具函数
 */
export default class CalculateUtils {
  // 加
  floatAdd(arg1, arg2) {
    let r1, r2, m
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
  }

  // 减
  floatSub(arg1, arg2) {
    let r1, r2, m, n
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    n = (r1 >= r2) ? r1 : r2
    return ((arg1 * m - arg2 * m) / m).toFixed(n)
  }

  // 乘
  floatMul(arg1, arg2) {
    let m = 0
    let s1 = arg1.toString()
    let s2 = arg2.toString()
    try {
      m += s1.split('.')[1].length
    } catch (e) { }
    try {
      m += s2.split('.')[1].length
    } catch (e) { }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  }

  // 除
  floatDiv(arg1, arg2) {
    let t1 = 0
    let t2 = 0
    let r1, r2
    try {
      t1 = arg1.toString().split('.')[1].length
    } catch (e) { }
    try {
      t2 = arg2.toString().split('.')[1].length
    } catch (e) { }
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
  }

  // 最大值
  max(arr) {
    return Math.max.apply(null, arr)
  }

  // 最小值
  min(arr) {
    return Math.min.apply(null, arr)
  }

  // 求和
  sum(arr) {
    return arr.reduce((pre, cur) => {
      return pre + cur
    })
  }

  // 平均值
  average(arr) {
    return this.sum(arr) / arr.length
  }
}
