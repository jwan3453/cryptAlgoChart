const { createSocket } = require('dgram');
const client = createSocket('udp4');
const max = 100;
const min = 95;
setInterval(() => {
    const random = Math.floor(Math.random() * (max - min)) + min;
    client.send(`${random}`, 7788, 'localhost', (error) => {
        if (error) {
            client.close();
        }
    });
}, 500)
