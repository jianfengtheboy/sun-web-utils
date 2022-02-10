/**
 * websocket心跳检测
 * @param {object} options
 * {
 *  url              websocket链接地址
 *  pingTimeout      未收到消息多少秒之后发送ping请求，默认5000毫秒
 *  pongTimeout      发送ping之后，未收到消息超时时间，默认5000毫秒
 *  reconnectTimeout 重连间隔时间，默认10000ms
 *  pingMsg          心跳消息，默认发送ping，后台接收后返回pong
 *  repeatLimit      重连尝试次数,默认无限制
 * }
 */
function WebsocketHeartbeat({
  url,
  pingTimeout = 5000,
  pongTimeout = 5000,
  reconnectTimeout = 10000,
  pingMsg = 'ping',
  repeatLimit = null
}) {
  this.options = {
    url: url,
    pingTimeout: pingTimeout,
    pongTimeout: pongTimeout,
    reconnectTimeout: reconnectTimeout,
    pingMsg: pingMsg,
    repeatLimit: repeatLimit
  }
  this.ws = null
  this.repeat = 0

  this.onclose = () => {}
  this.onerror = () => {}
  this.onopen = () => {}
  this.onmessage = () => {}
  this.onreconnect = () => {}
  this.createWebSocket()
}

WebsocketHeartbeat.prototype.createWebSocket = function() {
  try {
    this.ws = new WebSocket(this.options.url)
    this.initEventHandle()
  } catch (e) {
    this.reconnect()
  }
}

WebsocketHeartbeat.prototype.initEventHandle = function() {
  this.ws.onclose = () => {
    this.onclose()
    this.reconnect()
  }
  this.ws.onerror = () => {
    this.onerror()
    this.reconnect()
  }
  this.ws.onopen = () => {
    this.repeat = 0
    this.onopen()
    this.heartCheck()
  }
  this.ws.onmessage = (event) => {
    this.onmessage(event)
    this.heartCheck()
  }
}

WebsocketHeartbeat.prototype.reconnect = function() {
  if (this.options.repeatLimit > 0 && this.options.repeatLimit <= this.repeat) return
  if (this.lockReconnect || this.forbidReconnect) return
  this.lockReconnect = true
  this.repeat++
  this.onreconnect()

  setTimeout(() => {
    this.ws && this.ws.close()
    this.createWebSocket()
    this.lockReconnect = false
  }, this.options.reconnectTimeout)
}

WebsocketHeartbeat.prototype.send = function(msg) {
  this.ws.send(msg)
}

WebsocketHeartbeat.prototype.heartCheck = function() {
  this.heartReset()
  this.heartStart()
}

WebsocketHeartbeat.prototype.heartStart = function() {
  if (this.forbidReconnect) return
  this.pingTimeoutId = setTimeout(() => {
    try {
      this.ws.send(this.options.pingMsg)
    } catch (error) {
      console.log(error)
    }

    this.pongTimeoutId = setTimeout(() => {
      try {
        this.ws.close()
      } catch (error) {
        console.log(error)
      }
    }, this.options.pongTimeout)
  }, this.options.pingTimeout)
}

WebsocketHeartbeat.prototype.heartReset = function() {
  clearTimeout(this.pingTimeoutId)
  clearTimeout(this.pongTimeoutId)
}

WebsocketHeartbeat.prototype.close = function() {
  this.forbidReconnect = true
  this.heartReset()
  this.ws.close()
}

if (typeof window !== 'undefined') window.WebsocketHeartbeat = WebsocketHeartbeat

export default WebsocketHeartbeat
