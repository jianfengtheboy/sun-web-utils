/**
 * 日期时间相关工具函数
 */
import Dayjs from 'dayjs'

export default class DateUtils {
  constructor() {
    this.dayjs = Dayjs
    this.formatText = 'YYYY-MM-DD HH:mm:ss'
  }

  /**
   * 判断是否是date
   * @param {any} obj 判断对象
   */
  isDate(obj) {
    return obj && typeof obj === 'object' && obj instanceof Date
  }
  /**
   * 是否是dayjs对象
   * @param {any} obj
   */
  isDayjs(obj) {
    return obj && typeof obj === 'object' && obj instanceof Dayjs
  }

  /**
   * 对比两个时间
   * @param {Date|Dayjs} one 第一个值
   * @param {Date|Dayjs} otherOne 第二个值
   * @return 0: 相同，-1:第一个值时间在前，第二个值时间靠后，1：第一个值时间在后，第二个值时间靠前
   */
  compare(one, otherOne) {
    if (!this.isDate(one) || !this.isDayjs(one)) return undefined
    if (!this.isDate(otherOne) || !this.isDayjs(otherOne)) return undefined

    one = this.isDayjs(one) ? one : Dayjs(one)
    otherOne = this.isDayjs(otherOne) ? otherOne : Dayjs(otherOne)
    if (one.isSame(otherOne)) return 0
    return one.isBefore(otherOne) ? -1 : 1
  }

  /**
   * 格式化时间
   * @param {Date} date 时间
   * @param {String} format 格式
   * @return 格式化后的字符串
   */
  format(date, format) {
    if (!date) return date
    format = format || this.formatText
    if (this.isDayjs(date)) return date.format(format)
    return Dayjs(date).format(format)
  }

  /**
   * 当前时间
   * @param {String} format
   * @return 当前时间的格式化字符串
   */
  current(format) {
    return this.format(Dayjs(), format)
  }

  /**
   * 计算时间，并以分秒形式返回
   * @param {Int} milliseconds 毫秒数
   * @return 时间长度，最多到分
   */
  reckon(milliseconds) {
    if (typeof milliseconds !== 'number') return
    const secords = milliseconds / 1000
    return `${Math.ceil(secords / 60)}\`${secords % 60}\`\``
  }

  /**
   * 时间过了多久
   * @param {Number} timestamp 时间戳
   * @param {Object} config 配置
   * @return {String} 过了多久的时间
   */
  timeago(timestamp, config = {}) {
    const {
      mill = false,
      returnType = 'string',
      levels = {
        day: true,
        hour: true,
        minute: true,
        secord: true
      }
    } = config
    let day, hour, minute, secord
    const result = {}
    if (mill) timestamp = timestamp / 1000
    if (levels.day) {
      day = Math.floor(timestamp / (24 * 60 * 60))
      timestamp = timestamp % (24 * 60 * 60)
      result.day = day
    }
    if (levels.hour) {
      hour = Math.floor(timestamp / (60 * 60))
      timestamp = timestamp % (60 * 60)
      result.hour = hour
    }
    if (levels.minute) {
      minute = Math.floor(timestamp / 60)
      result.minute = minute
    }
    if (levels.secord) {
      secord = Math.floor(timestamp % 60)
      result.secord = secord
    }
    if (returnType === 'string') {
      return `${result.day && result.day > 0 ? result.day + '天' : ''}${
        result.hour && result.hour > 0 ? result.hour + '时' : ''
      }${result.minute && result.minute > 0 ? result.minute + '分' : ''}${
        result.secord && result.secord > 0 ? result.secord + '秒' : ''
      }`
    }
    return result
  }

  utc(date, format) {
    if (!date) return date
    format = format || this.formatText;
    if (date instanceof Dayjs) return date.format(format);
    const minutes = Dayjs(date).zone();
    const utcHour = Math.abs(minutes / 60);
    const utcMinutes = Math.abs(minutes % 60);
    const utc = `${minutes > 0 ? '-' : '+'}${
      utcHour > 9 ? utcHour : `0${utcHour}`
    }:${utcMinutes > 9 ? utcMinutes : `0${utcMinutes}`}`;
    return `${Dayjs(date).format(format)} UTC${utc}`;
  }

  /**
   * 时间过了多久
   */
  ago(timestamp, config = {}) {
    if (typeof timestamp !== 'number') timestamp = parseInt(timestamp);

    const {
      mill = false,
      unit = {
        year: '年前',
        month: '月前',
        day: '天前',
        hour: '小时前',
        minute: '分钟前',
        second: '秒前',
      }
    } = config;
    const curr = Dayjs().unix();
    if (mill) timestamp = timestamp / 1000;
    const sub = curr - timestamp;
    if (unit.year && Math.floor(sub / (24 * 60 * 60 * 365)) > 0)
      return `${Math.floor(sub / (24 * 60 * 60 * 365))}${unit.year}`;
    if (unit.month && Math.floor(sub / (24 * 60 * 60 * 30)) > 0)
      return `${Math.floor(sub / (24 * 60 * 60 * 30))}${unit.month}`;
    if (unit.day && Math.floor(sub / (24 * 60 * 60)) > 0)
      return `${Math.floor(sub / (24 * 60 * 60))}${unit.day}`;
    if (unit.hour && Math.floor(sub / (60 * 60)) > 0)
      return `${Math.floor(sub / (60 * 60))}${unit.hour}`;
    if (unit.minute && Math.floor(sub / 60) > 0)
      return `${Math.floor(sub / 60)}${unit.minute}`;
    if (unit.second && Math.floor(sub) > 0)
      return `${Math.floor(sub)}${unit.second}`;
    return sub;
  }

  /**
   * 获得给定毫秒数的可读格式
   */ 
  formatDuration(ms) {
    if (ms < 0) ms = -ms;
    const time = {
      day: Math.floor(ms / 86400000),
      hour: Math.floor(ms / 3600000) % 24,
      minute: Math.floor(ms / 60000) % 60,
      second: Math.floor(ms / 1000) % 60,
      millisecond: Math.floor(ms) % 1000
    }
    return Object.entries(time)
      .filter(val => val[1] !== 0)
      .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
      .join(', ')
  }
  
  /**
   * 获得两个日期之间的差异（以天为单位）
   */ 
  getDaysDiffBetweenDates(dateInitial, dateFinal) {
    return (dateFinal - dateInitial) / (1000 * 3600 * 24);
  }

  /**
   * 格式化数字，若不是一位数就直接返回，反之前面添加’0‘
   * @param {*} n 
   * @returns 
   */
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  
  /**
   * 获得使用 ’-‘ 分割的年月日时间
   * @param {*} date 
   * @returns 
   */
  formatDayWidthHyphen(date) {
    if (date) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return [year, month, day].map(this.formatNumber).join('-')
    }
  }
  
  /**
   * 获得使用 ’/‘ 分割的年月日时间
   * @param {*} date 
   * @returns 
   */
  formatDayWidthSlash(date) {
    if (date) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return [year, month, day].map(this.formatNumber).join('/')
    }
  }
  
  /**
   * 获得当日是星期几
   * @param {*} date 
   * @returns 
   */
  formatWeek(date) {
    if (date) {
      const day = date.getDay()
      switch (day) {
        case 0:
          return '周日'
          break;
        case 1:
          return '周一'
          break;
        case 2:
          return '周二'
          break;
        case 3:
          return '周三'
          break;
        case 4:
          return '周四'
          break;
        case 5:
          return '周五'
          break;
        case 6:
          return '周六'
          break;
      }
    }
  }
  
  /**
   * 获得小时分钟格式，且以‘：’分割的时间
   * @param {*} date 
   * @returns 
   */
  formatHour(date) {
    if (date) {
      const hour = new Date(date).getHours()
      const minute = new Date(date).getMinutes()
      return [hour, minute].map(this.formatNumber).join(':')
    }
  }
  
  detimestamp(date) {
    if (date) {
      return new Date(date * 1000)
    }
  }
  
  /** 
   * 时间戳转化为年月日时分秒 
   * @param {Number} number 传入时间戳 
   * @param {*} format 返回格式支持自定义但参数必须与formateArr里保持一致 
  */  
  formatDateTime = (number, format) => {  
    const formateArr = ['Y','M','D','h','m','s']
    const returnArr = []
    
    const date = new Date(number * 1000)
    returnArr.push(date.getFullYear())
    returnArr.push(this.formatNumber(date.getMonth() + 1))
    returnArr.push(this.formatNumber(date.getDate()))
    
    returnArr.push(this.formatNumber(date.getHours()))
    returnArr.push(this.formatNumber(date.getMinutes()))
    returnArr.push(this.formatNumber(date.getSeconds()))
    
    for (const i in returnArr) {  
      format = format.replace(formateArr[i], returnArr[i])
    }  
    return format
  }

  /**
   * 格式化时间，转化为几分钟前，几秒钟前
   * @param timestamp 时间戳，单位是毫秒
   */
  timeFormat = (timestamp) => {
    const mistiming = Math.round((Date.now() - timestamp) / 1000)
    const arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒']
    const arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1]
    for (let i = 0; i < arrn.length; i++) {
      const inm = Math.floor(mistiming / arrn[i])
      if (inm != 0) {
        return inm + arrr[i] + '前'
      }
    }
  }
}
