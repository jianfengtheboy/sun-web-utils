/**
 * dom相关工具函数
 */
export default class DomUtils {
  /**
   * 是否具有某个css class类名
   * @param {DOM} el
   * @param {String} className
   */ 
	hasClass(el, className) {
		const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
		return reg.test(el.className)
	}

	/**
   * 添加类名
   * @param {DOM} el
   * @param {String} className
   */ 
	addClass(el, className) {
    if (this.hasClass(el, className)) return
    const newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
	}

	/**
   * 删除类名
   * @param {DOM} el
   * @param {String} className
   */ 
	removeClass(el, className) {
    if (!this.hasClass(el, className)) return
    const newClass = el.className.split(' ')
    const index = newClass.findIndex((item) => {
			return item === className
    })
    newClass.splice(index, 1)
    el.className = newClass.join(' ')
	}

	/**
   * el是否在视口范围内
   * @param {DOM} el
   * @param {Boolean} partiallyVisible
   */ 
	elementIsVisibleInViewport(el, partiallyVisible = false) {
    const { top, left, bottom, right } = el.getBoundingClientRect()
    const { innerHeight, innerWidth } = window
    return partiallyVisible
      ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
      : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
	}

  /**
   * 获取输入框DOM的当前光标位置
   * @param {DOM} dom DOM对象
   */
  getCursortPosition(dom) {
    let CaretPos = 0
    // IE Support
    if (document.selection) {
      dom.focus()
      let Sel = document.selection.createRange()
      Sel.moveStart('character', -dom.value.length)
      CaretPos = Sel.text.length
    } else if (dom.selectionStart || dom.selectionStart * 1 === 0) {
      // Firefox support
      CaretPos = dom.selectionStart
    }
    return (CaretPos)
  }

  /**
   * 设置光标在DOM中的位置
   * @param {DOM} dom DOM对象
   * @param {Number} pos 位置
   */
  setCaretPosition(dom, pos) {
    pos = pos === 0 ? dom.value.length : pos
    if (dom.setSelectionRange) {
      dom.focus()
      dom.setSelectionRange(pos, pos)
    } else if (dom.createTextRange) {
      let range = dom.createTextRange()
      range.collapse(true)
      range.moveEnd('character', pos)
      range.moveStart('character', pos)
      range.select()
    }
  }

  /**
   * 聚集报错元素
   * @param {String} errorClassName 错误元素类名
   */
  forceError(errorClassName = 'is-error') {
    const isError = document.getElementsByClassName(errorClassName)
    if (!isError || isError.length === 0) return
    if (isError[0].querySelector('input')) {
      isError[0].querySelector('input').focus()
    } else if (isError[0].querySelector('textarea')) {
      isError[0].querySelector('textarea').focus()
    }
  }

  /**
   * 隐藏所有指定标签
   * @param  {...any} el 
   * @returns 
   * 例: hide(document.querySelectorAll('img'))
   */ 
  hideTag = (...el) => [...el].forEach(e => (e.style.display = 'none'))

  /**
   * 返回指定元素的生效样式
   * @param {*} el 元素节点
   * @param {*} ruleName 指定元素的名称
   * @returns 
   */
  getStyle = (el, ruleName) => window.getComputedStyle(el, null).getPropertyValue(ruleName)

  /**
   * 检查是否包含子元素
   * @param {*} parent 
   * @param {*} child 
   * @returns 
   * 例：elementContains(document.querySelector('head'), document.querySelector('title')); // true
   */
  elementContains = (parent, child) => parent !== child && parent.contains(child)

  /**
   * 切换一个元素的类
   * @param {*} el 
   * @param {*} className 
   * @returns 
   * 例：toggleClass(document.querySelector('p.special'), 'special')
   */
  toggleClass = (el, className) => el.classList.toggle(className)
 
  /**
   * 获取元素中的所有图像
   * @param {*} el 
   * @param {*} includeDuplicates 
   * @returns 
   * 例：getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
   */
  getImages = (el, includeDuplicates = false) => {
    const images = [...el.getElementsByTagName('img')].map(img => img.getAttribute('src'))
    return includeDuplicates ? images : [...new Set(images)]
  }

  /**
   * 将一组表单元素转化为对象
   * @param {*} form 
   * @returns 
   * 例： formToObject(document.querySelector('#form'))
   */
  formToObject = (form) => Array.from(new FormData(form)).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value
    }),
    {}
  )
}
