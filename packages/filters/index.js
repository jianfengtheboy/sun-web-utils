/**
 * Vue自定义过滤器
 */
const filters = {
  /**
   * 时间过去多久
   * @param {*} value 
   * @returns 
   */
  timeAgo(value) {
    value = parseInt(value);
    if (typeof value !== 'number') return value;

    const DAY_SECOND = 24 * 60 * 60;
    const HOUR_SECOND = 60 * 60;
    const MINUTE_SECOND = 60;

    const currTimestamp = new Date().valueOf();
    value = currTimestamp / 1000 - value;

    const day = Math.floor(value / DAY_SECOND);
    const hour = Math.floor((value % DAY_SECOND) / HOUR_SECOND);
    const minute = Math.floor((value % HOUR_SECOND) / MINUTE_SECOND);
    const second = Math.floor(value % MINUTE_SECOND);
    const day18n = '天';
    const hour18n = '小时';
    const minute18n = '分';
    const second18n = '秒';
    const ago = '前';

    if (day > 0 && hour > 0) return `${day}${day18n}${hour}${hour18n}${ago}`;
    if (day > 0) return `${day}${day18n}${ago}`;
    if (hour > 0 && minute > 0)
      return `${hour}${hour18n}${minute}${minute18n}${ago}`;
    if (hour > 0 && second > 0)
      return `${hour}${hour18n}${second}${second18n}${ago}`;
    if (hour > 0) return `${hour}${hour18n}${ago}`;
    if (minute > 0 && second > 0)
      return `${minute}${minute18n}${second}${second18n}${ago}`;
    if (minute > 0) return `${minute}${minute18n}${ago}`;
    if (second > 0) return `${second}${second18n}${ago}`;
    return '';
  },

  /**
   * 中间缩略
   * @param {String} value
   */ 
  middleEllipsis(value) {
    if (!value) return ''
    if (typeof value !== 'string') value = `${value}`
    if (value.length <= 12) return value;
    return `${value.substr(0, 6)}...${value.substr(
      value.length - 6,
      value.length
    )}`
  },

  /**
   * 末尾缩略
   * @param {*} value 
   * @param {*} length 
   * @returns 
   */
   endEllipsis(value, length) {
    if (!value) {
      return ''
    }
    if (value.length > length) {
      return value.slice(0, parseInt(length - 1)) + '...'
    }
    return value
  },

  /**
   * 截取字符串并加省略号
   * @param {String} str
   * @param {Number} length
   */ 
  subText(str, length) {
    if (str.length === 0) {
      return ''
    }
    if (str.length > length) {
      return str.substr(0, length) + "..."
    } else {
      return str
    }
  },

  /**
   * 字母大小写切换
   * @param {String} str 要转换的字符串
   * @param {Number} type 支持类型：
   * 1:首字母大写
   * 2：首页母小写
   * 3：大小写转换
   * 4：全部大写
   * 5：全部小写
   */ 
  changeCase(str, type) {
    function ToggleCase(str) {
      let itemText = ''
      str.split('').forEach((item) => {
        if (/^([a-z]+)/.test(item)) {
          itemText += item.toUpperCase()
        } else if (/^([A-Z]+)/.test(item)) {
          itemText += item.toLowerCase()
        } else {
          itemText += item
        }
      })
      return itemText
    }
    switch (type) {
      case 1:
        return str.replace(/\b\w+\b/g, (word) => {
          return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
        })
      case 2:
        return str.replace(/\b\w+\b/g, (word) => {
          return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase()
        })
      case 3:
        return ToggleCase(str)
      case 4:
        return str.toUpperCase()
      case 5:
        return str.toLowerCase()
      default:
        return str
    }
  },

  /**
   * 字符串循环复制
   * @param {String} str
   * @param {Number} count
   */ 
  repeatStr(str, count) {
    let text = ''
    for (var i = 0; i < count; i++) {
      text += str
    }
    return text
 },

  /**
   * 字符替换为 *，隐藏手机号或者身份证号等
   * @param {String} str 字符串
   * @param {*} regArr 字符格式
   * @param {Number} type 替换方式
   * @param {*} ARepText 替换的字符（默认*）
   * ecDo.replaceStr('18819322663', [3,5,3], 0) => result：188*****663
   * ecDo.replaceStr('asdasdasdaa', [3,5,3], 1) => result：***asdas***
   * ecDo.replaceStr('1asd88465asdwqe3', [5], 0) => result：*****8465asdwqe3
   * ecDo.replaceStr('1asd88465asdwqe3', [5], 1, '+') => result："1asd88465as+++++"
   */ 
  replaceStr(str, regArr, type, ARepText) {
    let regtext = ''
    let Reg = null
    let replaceText = ARepText || '*'
    if (regArr.length === 3 && type === 0) {
      regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
      Reg = new RegExp(regtext)
      let replaceCount = this.repeatStr(replaceText, regArr[1])
      return str.replace(Reg, '$1' + replaceCount + '$2')
    } else if (regArr.length === 3 && type === 1) {
      regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
      Reg = new RegExp(regtext)
      let replaceCount1 = this.repeatStr(replaceText, regArr[0])
      let replaceCount2 = this.repeatStr(replaceText, regArr[2])
      return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
    } else if (regArr.length === 1 && type === 0) {
      regtext = '(^\\w{' + regArr[0] + '})'
      Reg = new RegExp(regtext)
      let replaceCount = this.repeatStr(replaceText, regArr[0])
      return str.replace(Reg, replaceCount)
    } else if (regArr.length === 1 && type === 1) {
      regtext = '(\\w{' + regArr[0] + '}$)'
      Reg = new RegExp(regtext)
      let replaceCount = this.repeatStr(replaceText, regArr[0])
      return str.replace(Reg, replaceCount)
    }
  },

  /**
   * 将数值转换为 万、亿、万亿
   * @param {*} val 
   * @returns 
   */
  toWan(val) {
    const k = 10000
    const sizes = ['', '万', '亿', '万亿']
    const i = Math.floor(Math.log(val) / Math.log(k))
    return val >= k ? (val / Math.pow(k, i)).toFixed(1) + sizes[i] : val
  },

  /**
   * 根据身份证获取出生年月
   * @param {any} idCard
   */ 
  getBirthdayFromIdCard(idCard) {
    let birthday = ''
    if (idCard != null && idCard != '') {
      if (idCard.length == 15) {
        birthday = '19' + idCard.substr(6, 6)
      } else if (idCard.length == 18) {
        birthday = idCard.substr(6, 8)
      }
      birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
    }
    return birthday
  },

  /**
   * 根据身份证获取年龄
   * @param {any} UUserCard
   */ 
  getAgeFromIdCard(UUserCard) {
    //获取年龄
    const myDate = new Date()
    const month = myDate.getMonth() + 1
    const day = myDate.getDate()
    let age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1
    if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
      age++
    }
    return age
  },

  /**
   * 金钱格式化，三位加逗号
   * @param {Number} num 金额
   */ 
  formatMoney(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  },

  /**
   * 数字超过规定大小加上加号“+”，如数字超过99显示99+
   * @param { number } val 输入的数字
   * @param { number } maxNum 数字规定界限
   */
  outOfNum(val, maxNum) {
    val = val ? val - 0 : 0
    if (val > maxNum ) {
      return `${maxNum}+`
    } else {
      return val
    }
  }
}

export default (Vue) => {
  Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
  })
}
