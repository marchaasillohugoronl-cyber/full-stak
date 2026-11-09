module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`Se conectado aun nuevo usuario cliente al servidor: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`El Cliente se ha desconectado del servidor : ${socket.id}`);
        });
    });
};
