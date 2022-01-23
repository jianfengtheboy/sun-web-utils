/**
 * 文件相关工具函数
 */
export default class FileUtils {
  /**
    * 获取文件base64编码
    * @param file 文件
    * @param format  指定文件格式
    * @param size  指定文件大小(字节)
    * @param formatMsg 格式错误提示
    * @param sizeMsg   大小超出限制提示
    * @returns {Promise<any>}
    */
  fileToBase64String(
    file,
    format = ['jpg', 'jpeg', 'png', 'gif'],
    size = 20 * 1024 * 1024,
    formatMsg = '文件格式不正确',
    sizeMsg = '文件大小超出限制'
  ) {
    return new Promise((resolve, reject) => {
      // 格式过滤
      const suffix = file.type.split('/')[1].toLowerCase()
      let inFormat = false
      for (let i = 0; i < format.length; i++) {
        if (suffix === format[i]) {
          inFormat = true
          break
        }
      }
      if (!inFormat) reject(formatMsg)
      // 大小过滤
      if (file.size > size) reject(sizeMsg)
      // 转base64字符串
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        const res = fileReader.result
        resolve({base64String: res, suffix: suffix})
        reject('异常文件，请重新选择')
      }
    })
  }

  /**
    * @B转换到KB、MB、GB并保留两位小数
    * @param { number } fileSize
    */
  formatFileSize(fileSize) {
    let temp
    if (fileSize < 1024) {
      return fileSize + 'B'
    } else if (fileSize < (1024 * 1024)) {
      temp = fileSize / 1024
      temp = temp.toFixed(2)
      return temp + 'KB'
    } else if (fileSize < (1024 * 1024 * 1024)) {
      temp = fileSize / (1024 * 1024)
      temp = temp.toFixed(2)
      return temp + 'MB'
    } else {
      temp = fileSize / (1024 * 1024 * 1024)
      temp = temp.toFixed(2)
      return temp + 'GB'
    }
  }

  /**
    * base64转blob
    * @param { base64 } base64
    */
  base64ToBlob = (base64) => {
    const arr = base64.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  /**
    * blob转file
    * @param { blob } blob
    * @param { string } fileName
    */
  blobToFile = (blob, fileName) => {
    blob.lastModifiedDate = new Date()
    blob.name = fileName
    return blob
  }

  /**
    * base64转file
    * @param { base64 } base64
    * @param { string } filename 转换后的文件名
    */
   base64ToFile = (base64, filename)=> {
    const arr = base64.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const suffix = mime.split('/')[1] // 图片后缀
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], `${filename}.${suffix}`, { type: mime })
  }

   /**
    * file转base64
    * @param { * } file 图片文件
    */
  fileToBase64 = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      return e.target.result
     }
  }

  /**
   * 下载二进制文件
   * @param {*} binary 二进制
   * @param {*} fileName 下载的文件名
   */
  downBinary(binary, config) {
    const { fileName, contentType } = config
    const eleLink = document.createElement('a')
    eleLink.download = fileName || `${new Date().valueOf()}`
    eleLink.style.display = 'none'
    const blobConfig = {}
    if (contentType) blobConfig.type = contentType
    const blob = new Blob([binary], blobConfig)
    eleLink.href = URL.createObjectURL(blob)
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
  }
}
