/**
 * 数组相关的工具函数
 */
export default class ArrayUtils {
  /**
   * 将类数组转为数组
   * @param {*} ary
   */
  transformArray(ary) {
    const arr = Array.isArray(ary) ? ary : Array.prototype.slice.call(ary)
    return arr
  }

  /**
   * 返回数组中的最小值
   * @param {Array} arr
   */
  arrayMin(arr) {
    if (!arr || !Array.isArray(arr)) return
    return Math.min(...arr)
  }

  /**
   * 将数组块划分为指定大小的较小数组
   * @param {Array} arr
   * @param {Number} size
   */
  chunkArray = (arr, size) => Array.from({
    length: Math.ceil(arr.length / size)
  }, (v, i) => arr.slice(i * size, i * size + size))

  /**
   * 从数组中移除 false 值
   * @param {Array} arr
   */
  compact = (arr) => arr.filter(Boolean)

  /**
   * 返回两个数组之间的不相同元素
   * @param {Array} a
   * @param {Array} b
   */
  difference(a, b) {
    const s = new Set(b)
    return a.filter(x => !s.has(x))
  }

  /**
   * 返回两个数组之间的相同的元素
   * @param {Array} a
   * @param {Array} b
   */
  intersection = (a, b) => {
    const s = new Set(b)
    return a.filter(x => s.has(x))
  }

  /**
   * 返回数组中的每个第 n 个元素
   * @param {Array} arr
   * @param {Number} nth
   */
  everyNth = (arr, nth) => arr.filter((e, i) => i % nth === 0)

  /**
   * 筛选出数组中的非唯一值
   * @param {Array} arr
   */
  filterNonUnique = (arr) => arr.filter(i => arr.indexOf(i) !== arr.lastIndexOf(i))

  /**
   * 初始化并填充具有指定值的数组
   * @param {Number} end
   * @param {Number} start
   */
  initializeArrayWithRange = (end, start = 0) => Array.from({
    length: end - start
  }).map((v, i) => i + start)

  /**
   * 初始化并填充具有指定值的数组
   * @param {*} n
   * @param {Number} value
   */
  initializeArrayWithValues = (n, value = 0) => Array(n).fill(value)

  /**
   * 返回数组的第 n 个元素
   * @param {Array} arr
   * @param {Number} n
   */
  nthElement = (arr, n = 0) => (n > 0 ? arr.slice(n, n + 1) : arr.slice(n))[0]
 
  /**
   * 从数组中移除给定函数返回false的元素
   * @param {Array} arr
   * @param {Function} func
   */
  remove = (arr, func) => Array.isArray(arr) ? arr.filter(func).reduce((acc, val) => {
    arr.splice(arr.indexOf(val), 1)
    return acc.concat(val)
  }, []) : []
 
  /**
  * 随机返回数组中的元素
  * @param {Array} arr
  */
  sample = (arr) => arr[Math.floor(Math.random() * arr.length)]

  /**
   * 返回两个数组中都显示的元素的数组
   * @param {Array} arr
   * @param {Array} values
   */ 
  similarity = (arr, values) => arr.filter(v => values.includes(v))

  /**
   * 返回两个数组之间的对称差
   * @param {Array} a
   * @param {Array} b
   */
  symmetricDifference = (a, b) => {
    const sA = new Set(a)
    const sB = new Set(b)
    return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))]
  }

  /**
   * 返回一个数组, 其中 n 个元素从开始处移除
   * @param {Array} arr
   * @param {Number} n
   */ 
  take = (arr, n = 1) => arr.slice(0, n)

  /**
   * 返回一个数组, 其中 n 个元素从末尾移除
   * @param {Array} arr
   * @param {Number} n
   */ 
  takeRight = (arr, n = 1) => arr.slice(arr.length - n, arr.length)

  /**
   * 合并两个数组并去重
   * @param {Array} a
   * @param {Array} b
   */ 
  union = (a, b) => Array.from(new Set([...a, ...b]))
 
  /**
   * 数组去重
   * @param {*} arr 
   * @returns 
   */
  noRepeatSet = (arr) => [...new Set(arr)]

  noRepeatFrom = (arr) => Array.from(new Set(arr))

  noRepeatFilter = (arr) => arr.filter((v, idx) => idx == arr.lastIndexOf(v))
  
  noRepeatObject = (arr) => {
    return Object.values(arr.reduce((s, n) => {
      s[n] = n
      return s
    }, {}))
  }
 
  /**
   * 查找数组中的最大值
   * @param {*} arr 
   * @returns 
   */
  arrayMax(arr) {
    if (!arr || !Array.isArray(arr)) return
    return Math.max(...arr)
  }
 
  arrayMaxReduce = (arr) => arr.reduce((s, n) => Math.max(s, n))

  arrayMaxCompire = (arr) => arr.reduce((s, n) => s > n ? s : n)

  arrayMaxSort = (arr) => arr.sort((n, m) => m - n)[0]
 
  /**
   * 返回以size为长度的数组分割的原数组
   * @param {*} arr 
   * @param {*} size 
   * @returns 
   */
  chunkSlice = (arr, size = 1) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size))

  chunkSplice = (arr, size = 1) => Array.from({ length: Math.ceil(arr.length / size) }, () => arr.splice(0, size))

  /**
   * 返回数组中某元素出现的次数
   * @param {*} arr 
   * @param {*} value 
   * @returns 
   */
  countOccurrencesReduce = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0)

  countOccurrencesFilter = (arr, value) => arr.filter(v => v === value).length
 
  /**
   * 数组乱排
   * @param {*} arr 
   * @returns 
   */
  shuffleWhile = (arr) => {
    const array = arr
    let index = array.length
    while (index) {
      index -= 1
      const randomInedx = Math.floor(Math.random() * index)
      const middleware = array[index]
      array[index] = array[randomInedx]
      array[randomInedx] = middleware
    }
    return array
  }

  shuffleSort = (arr) => arr.sort(() => Math.random() - 0.5)

  /**
   * 洗牌算法随机
   * @param {Array} arr
   */ 
	shuffle = (arr) => {
    const result = []
    let random
    while (arr.length > 0) {
			random = Math.floor(Math.random() * arr.length)
			result.push(arr[random])
			arr.splice(random, 1)
    }
    return result
	}
}
