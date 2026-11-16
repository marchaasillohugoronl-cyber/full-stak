const { Socket } = require("socket.io")

module.exports=(io)=>{
    let messages=[{username:"fake-user",messages:"welcome"}]
    io.on('connection',(Socket)=>{
        console.log("Un nuevo Usuario conetado")
        io.emit('all-messages',messages)

        Socket.on('writing',(username)=>{
            Socket.broadcast.emit('writing',username)
        })
        Socket.on('new-message',(data)=>{
            messages.push(data)
            io.emit('all-messages',messages)
        })
    })
}