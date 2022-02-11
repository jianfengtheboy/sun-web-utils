/**
 * 浏览器相关工具函数
 */
export default class BrowserUtils {
  /**
   * 检查浏览器是否支持某个css属性值
   * @param {String} key - 检查的属性值所属的css属性名
   * @param {String} value - 要检查的css属性值（不要带前缀）
   * @returns {String} - 返回浏览器支持的属性值
   */
  valiateCssValue(key, value) {
    const prefix = ['-o-', '-ms-', '-moz-', '-webkit-', '']
    const prefixValue = prefix.map((item) => {
      return item + value
    })
    const element = document.createElement('div')
    const eleStyle = element.style
    // 应用每个前缀的情况，且最后也要应用上没有前缀的情况，看最后浏览器起效的何种情况
    // 这就是最好在prefix里的最后一个元素是''
    prefixValue.forEach((item) => {
      eleStyle[key] = item
    })
    return eleStyle[key]
  }

  /**
   * 获取当前url
   */
  currentURL = () => window.location.href

  /**
   * 获取url参数
   * @param {*} name
   * @param {*} origin
   */
  getUrlParam = (name, origin) => {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    let r = null
    if (origin == null) {
      r = window.location.search.substr(1).match(reg)
    } else {
      r = origin.substr(1).match(reg)
    }
    if (r != null) return decodeURIComponent(r[2])
    return null
  }

  getSearchParam(param) {
    const reg = /([^=&\s]+)[=\s]*([^=&\s]*)/g;
    const obj = {};
    const [, search] = window.location.href.split('?');
    if (!search) return undefined;
    while (reg.exec(search)) {
      obj[RegExp.$1] = RegExp.$2;
    }
    return obj[param];
  }

  getURLParametersReduce = (url) => {
    return url
      .match(/([^?=&]+)(=([^&]*))/g)
      .reduce(
        (a, v) => (
          (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
        ),
        {}
      )
  }

  /**
   * 修改url中的参数
   * @param {*} paramName
   * @param {*} replaceWith
   */ 
  replaceParamVal = (paramName, replaceWith) => {
    const oUrl = location.href.toString()
    const re = eval('/('+ paramName + '=)([^&]*)/gi')
    location.href = oUrl.replace(re, paramName + '=' + replaceWith)
    return location.href
  }

  /**
   * 获取窗口可视范围的高度
   */ 
  getClientHeight() {
    let clientHeight = 0
    if (document.body.clientHeight && document.documentElement.clientHeight) {
      clientHeight = (document.body.clientHeight < document.documentElement.clientHeight)
        ? document.body.clientHeight
        : document.documentElement.clientHeight
    } else {
      clientHeight = (document.body.clientHeight > document.documentElement.clientHeight)
        ? document.body.clientHeight
        : document.documentElement.clientHeight
    }
    return clientHeight
  }

  /**
   * 获取窗口可视范围宽度
   */ 
  getPageViewWidth() {
    const d = document
    const a = d.compatMode == "BackCompat" ? d.body : d.documentElement
    return a.clientWidth
  }

  /**
   * 获取窗口宽度
   */ 
  getPageWidth() {
    const g = document,
        a = g.body,
        f = g.documentElement,
        d = g.compatMode == "BackCompat" ? a : g.documentElement
    return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth)
  }

  /**
   * 获取窗口尺寸
   */ 
  getViewportOffset() {
    if (window.innerWidth) {
      return {
        w: window.innerWidth,
        h: window.innerHeight
      }
    } else {
      // ie8及其以下
      if (document.compatMode === "BackCompat") {
        // 怪异模式
        return {
          w: document.body.clientWidth,
          h: document.body.clientHeight
        }
      } else {
        // 标准模式
        return {
          w: document.documentElement.clientWidth,
          h: document.documentElement.clientHeight
        }
      }
    }
  }

  /**
   * 获取滚动条距顶部高度
   */ 
  getPageScrollTop() {
    const a = document
    return a.documentElement.scrollTop || a.body.scrollTop
  }

  /**
   * 开启全屏
   */ 
  launchFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullScreen()
    }
  }

  /**
   * 关闭全屏
   */ 
  exitFullscreen(document) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }

  /**
   * 获取当前滚动条位置
   */ 
  getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollTo,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTo
  })

  /**
   * 滚动到指定元素区域
   */ 
  smoothScroll(element) {
    document.querySelector(element).scrollIntoView({
      behavior: 'smooth'
    })
  }

  /**
   * 平滑滚动到页面顶部
   */ 
  scrollToTop() {
    const c = document.documentElement.scrollTop || document.body.scrollTop
    if (c > 0) {
      window.requestAnimationFrame(this.scrollToTop)
      window.scrollTo(0, c - c / 8)
    }
  }

  /**
   * http跳转https
   */ 
  httpsRedirect() {
    if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1])
  }

  /**
   * 检查页面底部是否可见
   */ 
  bottomVisible() {
    return document.documentElement.clientHeight + window.scrollY >=
      (document.documentElement.scrollHeight || document.documentElement.clientHeight)
  }

  /**
   * 自适应页面（rem）
   */ 
  autoResponse(width = 750) {
    const target = document.documentElement
    target.clientWidth >= 600
      ? (target.style.fontSize = "80px")
      : (target.style.fontSize = target.clientWidth / width * 100 + "px")
  }

  /**
   * 页面跳转是否记录在history中
   * @param url
   * @param asLink 
   */
  redirectHref(url, asLink = true) {
    asLink ? (window.location.href = url) : window.location.replace(url)
  }

  redirectAssign(url, asLink = true) {
    asLink ? window.location.assign(url) : window.location.replace(url)
  }

  /**
    * 判断手机是Andoird还是IOS
    *  @return { 0 : ios }
    *  @return { 1: android }
    *  @return { 2: 其它 }
    */
  getOSType() {
    const u = navigator.userAgent
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isIOS) {
      return 0
    }
    if (isAndroid) {
      return 1
    }
    return 2
  }

  /**
   * 检测移动/PC设备
   */ 
  detectDeviceType() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
  }

  /**
   * 向传递的URL发出GET请求
   */ 
  httpGet(url, callback, err = console.error) {
    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.onload = () => callback(request.responseText)
    request.onerror = () => err(request)
    request.send()
  }

  /**
   * 向传递的URL发出POST请求
   */ 
  httpPost(url, data, callback, err = console.error) {
    const request = new XMLHttpRequest()
    request.open('POST', url, true)
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    request.onload = () => callback(request.responseText)
    request.onerror = () => err(request)
    request.send(data)
  }

  /**
   * 是否是移动端
   */ 
  isDeviceMobile() {
    return /android|webos|iphone|ipod|balckberry/i.test(this.ua)
  }

  /**
   * 是否是QQ浏览器
   */ 
  isQQBrowser() {
    return !!this.ua.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i)
  }
  
  /**
   * 是否是爬虫
   */ 
  isSpider() {
    return /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web sprider|sogou orion spider/.test(this.ua)
  }

  /**
   * 是否ios
   */ 
  isIos() {
    const u = navigator.userAgent
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
      return false
    } else if (u.indexOf('iPhone') > -1) { // 苹果手机
      return true
    } else if (u.indexOf('iPad') > -1) { // iPad
      return false
    } else if (u.indexOf('Windows Phone') > -1) { // winphone手机
      return false
    } else {
      return false
    }
  }

  /**
   * 是否为PC端
   */ 
  isPC() {
    const userAgentInfo = navigator.userAgent
    const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
    let flag = true
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.includes(Agents[v])) {
        flag = false
        break
      }
    }
    return flag
  }
}
