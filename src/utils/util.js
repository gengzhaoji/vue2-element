/**
 * 常用辅助函数
 * @module utils/util
 */


import _isEqual from 'lodash/isEqual'
/**
 * 判断两个对象是否相等
 * @param {*} object
 * @param {*} other
 * @return {boolean}
 */
export function isEqual(object, other) {
  return _isEqual(object, other)
}

/**
 * 防抖函数
 * @param {function} fn 事件处理函数
 * @param {number} [delay=20] 延迟时间
 * @param {boolean} [isImmediate=false] 是否立刻执行
 * @param {object} [context=this] 上下文对象
 * @returns {Function} 事件处理函数
 */
export function debounce(fn, delay = 20, isImmediate = false, context = this) {
  // 使用闭包，保存执行状态，控制函数调用顺序
  let timer;

  return function () {
    const _args = [].slice.call(arguments)

    clearTimeout(timer);

    const _fn = function () {
      timer = null;
      if (!isImmediate) fn.apply(context, _args);
    };

    // 是否滚动时立刻执行
    const callNow = !timer && isImmediate;

    timer = setTimeout(_fn, delay);

    if (callNow) fn.apply(context, _args);
  }
}

const raFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
  return window.setTimeout(callback, 1000 / 60);
};

/**
 * 动画延时函数
 * @function
 * @param {function} callback 动画回调函数
 * @return {number} id
 */
export const requestAnimationFrame = raFrame

/**
 * 清除动画延时
 * @function
 * @param {number} id
 */
export const cancelAnimationFrame = window.cancelAnimationFrame || window.webkitRequestAnimationFrame || function (id) {
  window.clearTimeout(id);
};

/**
 * 节流函数
 * @param {function} fn 事件处理函数
 * @param {object} [context=this] 上下文对象
 * @param {boolean} [isImmediate=false] 是否立刻执行
 * @returns {Function} 事件处理函数
 */
export function throttle(fn, context = this, isImmediate = false) {
  let isLocked;
  return function () {
    const _args = arguments

    if (isLocked) return

    isLocked = true
    raFrame(function () {
      isLocked = false;
      fn.apply(context, _args)
    })

    isImmediate && fn.apply(context, _args)
  }
}

/**
 * 检测字符串是否url
 * @param {string} str 需要检测的字符串
 * @returns {boolean}
 */
export function isUrl(str) {
  return (/^(http|https):\/\/*/.test(str))
}

/**
 * 检测字符串是否邮箱
 * @param {string} str 需要检测的字符串
 * @returns {boolean}
 */
export function isEmail(str) {
  return (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str))
}

/**
 * 检测字符串是否身份证号码
 * @param {string} str 需要检测的字符串
 * @returns {boolean}
 */
export function isIdCard(str) {
  return (/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str))
}

/**
 * 检测字符串是否手机号码
 * @param {string} str 需要检测的字符串
 * @returns {boolean}
 */
export function isPhoneNumber(str) {
  return (/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str))
}

/**
 * 生成随机GUID
 * @return {string}
 */
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }).toUpperCase();
}

// 回显数据字典
export function selectDictLabel(datas, value, fileType = { value: 'dictValue', label: 'dictLabel' }) {
  var actions = [];
  Object.keys(datas).some((key) => {
    if (datas[key][fileType.value] == value) {
      actions.push(datas[key][fileType.label]);
      return true;
    }
  })
  return actions.join('');
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
  var actions = [];
  var currentSeparator = undefined === separator ? "," : separator;
  var temp = value.split(currentSeparator);
  Object.keys(value.split(currentSeparator)).some((val) => {
    Object.keys(datas).some((key) => {
      if (datas[key].dictValue == ('' + temp[val])) {
        actions.push(datas[key].dictLabel + currentSeparator);
      }
    })
  })
  return actions.join('').substring(0, actions.join('').length - 1);
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
  if (!str || str == "undefined" || str == "null") {
    return "";
  }
  return str;
}
