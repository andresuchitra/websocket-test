const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const SECRET = 'apaya'

io.on('connection', function(socket) {
    var user
    socket.on('init', function(data) {
        user = data

        console.log('init detected from user {' + user.name + '} password: {'+ user.secret +'}')
        if(user.secret === SECRET) {
            socket.emit('access', {access: 'granted'})
        }
        else {
            socket.emit('access', {access: 'forbidden'})
        }
    });

    socket.on('slidechange', function(data) {
        console.log('slidechange...', data);
        if(data.key === SECRET) {
            console.log('sending navigate...', data.next);
            io.emit('navigate', {next: data.next})
        }
        else {
            socket.emit('access', {access: 'forbidden'})
        }
    });
});

http.listen(3000, function(){
    console.log('listening on PORT 3000');
});

