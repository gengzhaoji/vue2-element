/**
 * 文件下载模块
 * @module utils/download
 */

/**
 * 文件类型枚举 文件后缀名 -> base64 data:前缀
 * @readonly
 * @enum {string}
 */
const TYPE_MAP = {
  /**
   * data:image/jpg;base64,
   */
  jpg: 'data:image/jpg;base64,',

  /**
   * data:image/png;base64,
   */
  png: 'data:image/png;base64,',
  /**
   * data:text/csv;charset=utf-8,
   */
  csv: 'data:text/csv;charset=utf-8,'
}
/**
 * 将字符串转换成Blob数据
 * @param str 字符串
 * @example
 *  let json = {name: '张三'};
 *  downloadByData(null, 'name.json', stringToBlob(JSON.stringify(json)))
 */
export function stringToBlob(str) {
  return URL.createObjectURL(
    new Blob([str], { type: 'application/octet-stream' })
  );
}

/**
 * 下载Blob数据
 * @param str 字符串
 * @example
 *  let json = {name: '张三'};
 *  downloadByData(null, 'name.json', stringToBlob(JSON.stringify(json)))
 */
export function downloadBlob(data, name) {
  const content = data
  const blob = new Blob([content])
  if ('download' in document.createElement('a')) {
    const elink = document.createElement('a')
    elink.download = name
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href)
    document.body.removeChild(elink)
  } else {
    navigator.msSaveBlob(blob, filename)
  }
}


/**
 * base64数据转文件下载
 * @param type 文件类型
 * @param [saveName] 保存文件名
 * @param data  base64 数据
 */
export function downloadByData(type, saveName, data) {
  let link = document.createElement('a')
  link.download = saveName
  link.href = type === null ? data : (TYPE_MAP[type] || '') + data
  link.click()
}

/**
 * 下载文件
 * @param src 文件资源src
 * @param [outName] 下载保存文件名称，可选
 */
export function download(src, outName) {
  let link = document.createElement('a')
  link.download = outName
  link.href = src
  link.click()
}

/**
 * post数据方式下载文件
 * @param {string} url 接口地址url
 * @param {object} [params] 发送的数据params
 * @param {string} [method=post] 请求方法：post / get
 */
export function downloadByPost(url, params = {}, method = 'post') {
  let form = document.createElement('form')
  form.style.display = 'none'
  form.action = url
  form.method = method
  form.target = '_blank'
  Object.keys(params).forEach(name => {
    let input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = params[name]
    form.appendChild(input)
  })
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}