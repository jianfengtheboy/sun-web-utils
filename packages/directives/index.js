/**
 * Vue自定义指令
 */

/**
 * v-preventReClick 防止按钮多次重复点击
 */ 
const preventReClick = {
  inserted (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 2000)
      }
    })
  }
}

/**
 * v-focus 输入框自动聚焦
 */ 
const focus = {
  inserted(el) {
    el.focus()
  }
}

/**
 * v-image
 */ 
const image = {
  inserted(el, binding) {
    //为了真实体现效果，用了延时操作
    setTimeout(() => {
      el.setAttribute('src', binding.value)
    }, Math.random() * 1200)
  }
}

/**
 * v-backgroundColor
 */ 
const backgroundColor = {
  inserted(el, binding) {
    el.style.backgroundColor = binding.value
  }
}

// v-color
const color = {
  inserted(el, binding) {
    el.style.color = binding.value
  }
}

/**
 * v-horizontalScreen 页面强制横屏
 */ 
const horizontalScreen = {
  bind (el) {
    let getDocumentSize = () => [
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    ]
    // 设备开启竖屏锁定，强制横屏模式
    let vertical = () => {
      let [width, height] = getDocumentSize()
      el.style.transform = `rotate(90deg)`
      el.style.transformOrigin = width / 2 + 'px center'
      el.style.width = height + 'px'
      el.style.height = width + 'px'
    }
    // 设备关闭竖屏锁定，横屏时，还原成正常模式
    let reset = () => {
      let [width, height] = getDocumentSize()
      el.style.transform = `rotate(0deg)`
      el.style.width = `${width}px`
      el.style.height = `${height}px`
    }

    el.resize = function () {
      if (document.activeElement.nodeName === 'INPUT') return; // 兼容安卓

      if ([null, 180, 0].includes(window.orientation)) {
        vertical()
      } else if ([90, -90].includes(window.orientation)) {
        reset()
      }
    }
    el.resize()

    el.click = e => {
      if (e.target.nodeName === 'INPUT') {
        reset()
      } else if (![90, -90].includes(window.orientation)) {
        vertical()
      }
    }

    window.addEventListener('click', el.click, false)
    window.addEventListener('resize', el.resize, false) // 兼容安卓
    window.addEventListener('orientationchange', el.resize, false)
  },
  unbind(el) {
    window.removeEventListener('click', el.click, false)
    window.removeEventListener('resize', el.resize, false)
    window.removeEventListener('orientationchange', el.resize, false)
  }
}

/**
 * v-copy 一键复制文本内容，用于鼠标右键粘贴
 */
const copy = {
  bind(el, { value }) {
    el.$value = value
    el.handler = () => {
      if (!el.$value) {
        // 值为空的时候，给出提示。
        throw new Error('无复制内容')
      }
      // 动态创建 textarea 标签
      const textarea = document.createElement('textarea')
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = el.$value
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea)
      // 选中值并复制
      textarea.select()
      const result = document.execCommand('Copy')
      if (result) {
        console.log('复制成功') // 可根据项目UI仔细设计
      }
      document.body.removeChild(textarea)
    }
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler)
  }
}

/**
 * v-longpress 长按，需要按下并按住按钮几秒钟，触发相应的事件
 */
const longpress = {
  bind: function (el, binding, vNode) {
    if (typeof binding.value !== 'function') {
      throw 'callback must be a function'
    }
    // 定义变量
    let pressTimer = null
    // 创建计时器（ 2秒后执行函数 ）
    let start = (e) => {
      if (e.type === 'click' && e.button !== 0) {
        return
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          handler()
        }, 2000)
      }
    }
    // 取消计时器
    let cancel = (e) => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }
    // 运行函数
    const handler = (e) => {
      binding.value(e)
    }
    // 添加事件监听器
    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)
    // 取消计时器
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler)
  }
}

/**
 * v-debounce 防止按钮在短时间内被多次点击，使用防抖函数限制规定时间内只能点击一次
 */
const debounce = {
  inserted: function (el, binding) {
    let timer
    el.addEventListener('keyup', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
      }, 1000)
    })
  }
}

/**
 * v-emoji 禁止输入表情和特殊字符
 */
let findEle = (parent, type) => {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)
}
 
const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}
 
const emoji = {
  bind: function (el, binding, vnode) {
    // 正则规则可根据需求自定义
    var regRule = /[^u4E00-u9FA5|d|a-zA-Z|rns,.?!，。？！…—&$=()-+/*{}[]]|s/g
    let $inp = findEle(el, 'input')
    el.$inp = $inp
    $inp.handle = function () {
      let val = $inp.value
      $inp.value = val.replace(regRule, '')
 
      trigger($inp, 'input')
    }
    $inp.addEventListener('keyup', $inp.handle)
  },
  unbind: function (el) {
    el.$inp.removeEventListener('keyup', el.$inp.handle)
  }
}

/**
 * v-lazyLoad 图片懒加载，只加载浏览器可见区域的图片
 */
const lazyLoad = {
  // install方法
  install(Vue, options) {
    const defaultSrc = options.default
    Vue.directive('lazy', {
      bind(el, binding) {
        lazyLoad.init(el, binding.value, defaultSrc)
      },
      inserted(el) {
        if (IntersectionObserver) {
          lazyLoad.observe(el)
        } else {
          lazyLoad.listenerScroll(el)
        }
      },
    })
  },
  // 初始化
  init(el, val, def) {
    el.setAttribute('data-src', val)
    el.setAttribute('src', def)
  },
  // 利用IntersectionObserver监听el
  observe(el) {
    var io = new IntersectionObserver((entries) => {
      const realSrc = el.dataset.src
      if (entries[0].isIntersecting) {
        if (realSrc) {
          el.src = realSrc
          el.removeAttribute('data-src')
        }
      }
    })
    io.observe(el)
  },
  // 监听scroll事件
  listenerScroll(el) {
    const handler = lazyLoad.throttle(lazyLoad.load, 300)
    lazyLoad.load(el)
    window.addEventListener('scroll', () => {
      handler(el)
    })
  },
  // 加载真实图片
  load(el) {
    const windowHeight = document.documentElement.clientHeight
    const elTop = el.getBoundingClientRect().top
    const elBtm = el.getBoundingClientRect().bottom
    const realSrc = el.dataset.src
    if (elTop - windowHeight < 0 && elBtm > 0) {
      if (realSrc) {
        el.src = realSrc
        el.removeAttribute('data-src')
      }
    }
  },
  // 节流
  throttle(fn, delay) {
    let timer
    let prevTime
    return function (...args) {
      const currTime = Date.now()
      const context = this
      if (!prevTime) prevTime = currTime
      clearTimeout(timer)
 
      if (currTime - prevTime > delay) {
        prevTime = currTime
        fn.apply(context, args)
        clearTimeout(timer)
        return
      }
 
      timer = setTimeout(function () {
        prevTime = Date.now()
        timer = null
        fn.apply(context, args)
      }, delay)
    }
  }
}

/**
 * v-waterMarker 给整个页面添加背景水印
 */
let addWaterMarker = (str, parentNode, font, textColor) => {
  // 水印文字，父元素，字体，文字颜色
  let can = document.createElement('canvas')
  parentNode.appendChild(can)
  can.width = 200
  can.height = 150
  can.style.display = 'none'
  let cans = can.getContext('2d')
  cans.rotate((-20 * Math.PI) / 180)
  cans.font = font || '16px Microsoft JhengHei'
  cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
  cans.textAlign = 'left'
  cans.textBaseline = 'Middle'
  cans.fillText(str, can.width / 10, can.height / 2)
  parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
}
 
const waterMarker = {
  bind: function (el, binding) {
    addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor)
  }
}

/**
 * v-draggable 可在页面可视区域任意拖拽元素
 */
const draggable = {
  inserted: function (el) {
    el.style.cursor = 'move'
    el.onmousedown = function (e) {
      let disx = e.pageX - el.offsetLeft
      let disy = e.pageY - el.offsetTop
      document.onmousemove = function (e) {
        let x = e.pageX - disx
        let y = e.pageY - disy
        let maxX = document.body.clientWidth - parseInt(window.getComputedStyle(el).width)
        let maxY = document.body.clientHeight - parseInt(window.getComputedStyle(el).height)
        if (x < 0) {
          x = 0
        } else if (x > maxX) {
          x = maxX
        }
 
        if (y < 0) {
          y = 0
        } else if (y > maxY) {
          y = maxY
        }
 
        el.style.left = x + 'px'
        el.style.top = y + 'px'
      }
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null
      }
    }
  }
}

const directives = {
  preventReClick,
  focus,
  image,
  backgroundColor,
  color,
  horizontalScreen,
  copy,
  longpress,
  debounce,
  emoji,
  lazyLoad,
  waterMarker,
  draggable
}

export default (Vue) => {
  Object.keys(directives).forEach((key) => {
    Vue.directive(key, directives[key])
  })
}
