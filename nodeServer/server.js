

// udp server
const udp = require('dgram');

const server = udp.createSocket('udp4');
server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(7788)



// socket server 
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

let socketConnection;

io.on('connection', socket => {
    console.log('socket 连接成功');
    socketConnection = socket;
    socket.on('send', e => {
        console.log(e)
        socket.emit('back', '服务器返回的消息')
    })

    socket.on('message', (data) => {
        console.log(data);
    });


    socket.on('disconnection', () => {
        console.log('用户离开， 断开连接');
    })

})

server.on('message', (msg, rinfo) => {
    console.log(`udp server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    if (socketConnection) {
        socketConnection.emit('message', `${msg}`)
    }

});

httpServer.listen(3030);