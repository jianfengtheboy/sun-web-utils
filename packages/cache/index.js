/**
 * 缓存相关工具函数
 */
export default class CacheUtils {
  /**
   * @localStorage
   * @param key 键
   * @param value 值
   */
  // localStorage 存贮
  localStorageSet(key, value) {
    if (typeof (value) === 'object') value = JSON.stringify(value)
    localStorage.setItem(key, value)
  }

  // localStorage 获取
  localStorageGet(key) {
    return localStorage.getItem(key)
  }

  // localStorage 移除
  localStorageRemove(key) {
    localStorage.removeItem(key)
  }

  // localStorage 存贮某一段时间失效
  localStorageSetExpire(key, value, expire) {
    if (typeof (value) === 'object') value = JSON.stringify(value)
    localStorage.setItem(key, value)
    setTimeout(() => {
      localStorage.removeItem(key)
    }, expire)
  }

  /**
   * @sessionStorage
   * @param key 键
   * @param value 值
   */
  // sessionStorage 存贮
  sessionStorageSet(key, value) {
    if (typeof (value) === 'object') value = JSON.stringify(value)
    sessionStorage.setItem(key, value)
  }

  // sessionStorage 获取
  sessionStorageGet(key) {
    return sessionStorage.getItem(key)
  }

  // sessionStorage 删除
  sessionStorageRemove(key) {
    sessionStorage.removeItem(key)
  }

  // sessionStorage 存贮某一段时间失效
  sessionStorageSetExpire(key, value, expire) {
    if (typeof (value) === 'object') value = JSON.stringify(value)
    sessionStorage.setItem(key, value)
    setTimeout(() => {
      sessionStorage.removeItem(key)
    }, expire)
  }

  /**
   * @cookie
   * @param key 键
   * @param value 值
   * @param day 过期时间
   */
  // cookie 存贮
  cookieSet(key, value, day) {
    if (day !== 0) {
      // 当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
      var expires = day * 24 * 60 * 60 * 1000
      var date = new Date(+new Date() + expires)
      document.cookie = key + '=' + escape(value) + ';expires=' + date.toUTCString()
    } else {
      document.cookie = key + '=' + escape(value)
    }
  }

  // cookie 获取
  cookieGet(key) {
    const reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
    const arr = document.cookie.match(reg)
    if (arr) {
      return unescape(arr[2])
    }
    return null
  }

  // cookie 删除
  cookieRemove(key) {
    this.cookieSet(key, '', -1)
  }
}
