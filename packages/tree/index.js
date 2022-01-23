/**
 * 树形数据处理工具函数
 */
export default class TreeUtils {
  /**
   * 递归设置属性
   * @param  {Object} obj 数据源
   * @param  {String} key 设置的键名
   * @param  {Any} value 设置的值
   * @param  {Function} handle 处理函数，有值是会判断以处理函数返回值为准
   */
   deepSet(obj, key, value, handle) {
    if (Array.isArray(obj)) {
      obj.forEach((item) => this.deepSet(item, key, value, handle));
    } else {
      if (handle && typeof handle === 'function') {
        obj[key] = handle(obj, key, value);
      } else {
        obj[key] = value;
      }
      if (obj.children && obj.children.length > 0) {
        obj.children.forEach((v) => this.deepSet(v, key, value, handle));
      }
    }
  }

  /**
   * 获取数据
   * @param {*} menus 数据源
   * @param {*} value 数据值
   * @param {*} keyDef 数据值对应的字段
   */
   deepGet(menus, value, keyDef) {
    let result;
    (function func(subMenus) {
      if (result || !subMenus) return;
      if (toString.apply(subMenus) === '[object Object]' && subMenus.children) {
        return func(subMenus.children);
      }
      subMenus.forEach((m) => {
        // 如果keydef为函数时，回调当前对象和值
        if (
          (typeof keyDef === 'function' && keyDef(m, value)) ||
          (typeof keyDef === 'string' && m[keyDef] === value)
        ) {
          result = m;
          return;
        }

        if (m.children) return func(m.children);
      });
    })(menus);
    return result;
  }

  
}
