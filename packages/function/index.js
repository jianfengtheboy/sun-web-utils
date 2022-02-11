/**
 * 函数相关工具函数
 */
export default class FunctionUtils {
  /**
   * 递归生成树形结构
   */ 
  getTreeData(data, pid, pidName = 'parentId', idName = 'id', childrenName = 'children') {
    const arr = []
    for (let i = 0; i < data.length; i++) {
      if (data[i][pidName] == pid) {
        data[i].key = data[i][idName]
        data[i][childrenName] = this.getTreeData(data, data[i][idName], pidName, idName, childrenName)
        arr.push(data[i])
      }
    }
    return arr
  }

  /**
   * 遍历树节点
   */ 
  foreachTree(data, childrenName = 'children', callback) {
    for (let i = 0; i < data.length; i++) {
      callback(data[i])
      if (data[i][childrenName] && data[i][childrenName].length > 0) {
        this.foreachTree(data[i][childrenName], childrenName, callback)
      }
    }
  }

  /**
   * 追溯父节点
   */ 
  traceParentNode(pid, data, rootPid, pidName = 'parentId', idName = 'id', childrenName = 'children') {
    let arr = []
    this.foreachTree(data, childrenName, (node) => {
      if (node[idName] == pid) {
        arr.push(node)
        if (node[pidName] != rootPid) {
          arr = arr.concat(this.traceParentNode(node[pidName], data, rootPid, pidName, idName))
        }
      }
    })
    return arr
  }

  /**
   * 寻找所有子节点
   */ 
  traceChildNode(id, data, pidName = 'parentId', idName = 'id', childrenName = 'children') {
    let arr = []
    this.foreachTree(data, childrenName, (node) => {
      if (node[pidName] == id) {
        arr.push(node);
        arr = arr.concat(this.traceChildNode(node[idName], data, pidName, idName, childrenName));
      }
    })
    return arr
  }

  /**
   * 根据pid生成树形结构
   */ 
  createTree(items, id = null, link = 'pid') {
    items.filter((item) =>
      item[link] === id).map((item) => ({ ...item, children: this.createTree(items, item.id) }))
  }

  /**
   * 函数防抖
   * @param {*} func 函数
   * @param {*} wait 延迟执行毫秒数
   * @param {*} immediate true 表立即执行，false 表非立即执行
   * @returns 
   */
  debounce(func, wait, immediate) {
    let timeout
    return () => {
      const args = FunctionUtils.arguments
      if (timeout) clearTimeout(timeout)
      if (immediate) {
        const callNow = !timeout
        timeout = setTimeout(() => {
          timeout = null
        }, wait)
        if (callNow) func.apply(this, args)
      } else {
        timeout = setTimeout(() => {
          func.apply(this, args)
        }, wait)
      }
    }
  }

  /**
   * 函数节流
   * @param {*} func 函数
   * @param {*} wait 延迟执行毫秒数
   * @param {*} type 1 表时间戳版，2 表定时器版
   * @returns 
   */
  throttle(func, wait ,type) {
    let previous, timeout;
    if (type === 1) {
      previous = 0
    } else if (type === 2) {
      timeout = null
    }
    return () => {
      const args = FunctionUtils.arguments
      if (type === 1) {
        const now = Date.now()
        if (now - previous > wait) {
          func.apply(this, args)
          previous = now
        }
      } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
            func.apply(this, args)
          }, wait)
        }
      }
    }
  }

  /**
   * 随机16进制颜色 hexColor
   */ 
  hexColor() {
    let str = '#'
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
    for (let i = 0; i < 6; i++) {
      const index = Number.parseInt((Math.random() * 16).toString())
      str += arr[index]
    }
    return str
  }

  /**
   * 随机16进制颜色 randomHexColorCode
   */ 
  randomHexColorCode() {
    const n = (Math.random() * 0xfffff * 1000000).toString(16)
    return '#' + n.slice(0, 6)
  }

  /**
   * 16进制颜色转RGBRGBA字符串
   */ 
  colorToRGB(val, opa) {
    const pattern = /^(#?)[a-fA-F0-9]{6}$/
    const isOpa = typeof opa == 'number'
    if (!pattern.test(val)) {
      return ''
    }
    const v = val.replace(/#/, '')
    const rgbArr = []
    let rgbStr = ''

    for (let i = 0; i < 3; i++) {
      const item = v.substring(i * 2, i * 2 + 2)
      const num = parseInt(item, 16)
      rgbArr.push(num)
    }
    rgbStr = rgbArr.join()
    rgbStr = 'rgb' + (isOpa ? 'a' : '') + '(' + rgbStr + (isOpa ? ',' + opa : '') + ')'
    return rgbStr
  }
}
