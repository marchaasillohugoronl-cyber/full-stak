
const http = require('http')

const server = http.createServer((request, response) => {
    try {
        if (request.url === '/' && request.method === 'GET') {
            response.statusCode = 200
            response.end(JSON.stringify({ "menssage": "accediendo al servidor" }))
        }
        else if (request.url === '/home' && request.method === 'GET') {
            response.statusCode = 200
            response.end(JSON.stringify({ "menssage": "accediendo a home" }))
        }
        else {
            response.statusCode = 404
            response.end(JSON.stringify({ "menssage": "no encontrado" }))
        }
    } catch (error) {
        response.statusCode = 500
        response.end(JSON.stringify({ "menssage": "error interno del servidor" }))
    }
})

const port = 5000
const host = "localhost"

server.listen(port, host, () => {
    console.log(`servidor ejecutandose en http://${host}:${port}`)
})
