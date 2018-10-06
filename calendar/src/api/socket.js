var websock = null
var global_callback = null
var serverPort = '8089'	// webSocket连接端口

function getWebIP() {
//   var curIP = window.location.hostname
  return 'localhost'
}

function initWebSocket() { // 初始化weosocket
  // ws地址
  var wsuri = 'ws://' + getWebIP() + ':' + serverPort
  websock = new WebSocket(wsuri)
  websock.onmessage = (e) => {
    websocketonmessage(e)
  }
  websock.onclose = (e) => {
    websocketclose(e)
  }
  websock.onclose = function(e) {

  }
  websock.onopen = () => {
    websocketOpen()
  }

  // 连接发生错误的回调方法
  websock.onerror = function() {
    console.log('WebSocket连接发生错误')
  }
}

// 实际调用的方法
function sendSock(agentData, callback) {
  global_callback = callback
  if (websock.readyState === websock.OPEN) {
    websocketsend(agentData)
  } else if (websock.readyState === websock.CONNECTING) {
    setTimeout(function() {
      sendSock(agentData, callback)
    }, 1000)
  } else {
    setTimeout(function() {
      sendSock(agentData, callback)
    }, 1000)
  }
}

// 数据接收
function websocketonmessage(e) {
  console.log(e)
  global_callback(JSON.parse(e.data))
}

// 数据发送
function websocketsend(agentData) {
  websock.send(JSON.stringify(agentData))
}

// 关闭
function websocketclose(e) {
  console.log('connection closed (' + e.code + ')')
}

function websocketOpen(e) {
  console.log('连接成功')
}

initWebSocket()

export { sendSock }
