const WebSocket = require('ws');
const server = new WebSocket.Server({port: 8080});//端口号不要和客户端端口号重复
console.log('服务启动成功')

let userList = [];// 用户列表，每个登录的用户都会存储在里面

let broadcast = mesObj => {// 消息广播，即用户列表里的每个用户都会收到消息
    userList.forEach(item => {
        item.send(JSON.stringify({// send只能发送字符串
            uid: mesObj.uid, //唯一id
            message: mesObj.message,//发送的信息
            type: mesObj.type//发送的类型，0是登录，1是发送消息时，2是退出时
        }));
    })
}

server.on('connection', function connection(ws) {//当有用户建立连接时

    ws.uid = [(new Date()).getTime(), Math.floor(Math.random() * 10000)].join('_');//由于没有连接数据库，创建随机数id
    userList.push(ws);//将用户存储到userList

    broadcast({ //发送登录通知
        uid: ws.uid,
        message: '欢迎登录',
        type: 0
    })

    ws.on('message', message => { //当用户发消息时
        broadcast({ //转发给所有人
            uid: ws.uid,
            message,
            type: 1
        })
    })

    ws.on('close', () => {//当用户退出时
        broadcast({//转发给所有人
            uid: ws.uid,
            message: '已退出',
            type: 2
        })
    })
});
