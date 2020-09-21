// 导入WebSocket模块:
const WebSocket = require('ws');

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const wss = new WebSocketServer({
  port: 3000
});

wss.on('connection', function (ws) {
  ws.send('connected')
  console.log(`[SERVER] connection()`);

  ws.on('message', function (message) {
    try {
      message = JSON.parse(message)
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN && client !== ws) {
          client.send(JSON.stringify(message))
        }
      });
    } catch (e) {
      console.log(e)
    }
  })
});


wss.on('close', function close(e) {
  console.log(close, e)
});