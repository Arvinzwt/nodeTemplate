const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})


// websocket
const WebSocket = require('ws');
const server = new WebSocket.Server({port: 8080});//端口号不要和客户端端口号重复

server.on('connection', function connection(ws) {//当有用户建立连接时
    ws.on('message', message => { //当用户发消息时
        ws.send(JSON.stringify({
            message,
            type: 'login',
            success: true,
        }))
    })
});
