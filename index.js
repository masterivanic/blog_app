const e = require('express')
const http = require('http')
const app = require('./server')
const config = require('./config')

const normalizePort = (value) => {
    const port = parseInt(value, 10)
    if (isNaN(port)) {
        return value
    }
    if (port >= 0) return port
    return false
}

const PORT = normalizePort(process.env.PORT || config.app.port.toString())
app.set('port', PORT)

const errorHandler = (error) => {
    if (error.syscall !== 'listen') {
        throw error
    }
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe' + address : 'port:' + PORT
    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'require elevated privileges.')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + 'is already use.');
            process.exit(1)
            break
        default:
            throw error
    }
}

const server = http.createServer(app)
server.on('error', errorHandler)
server.on('listening', () => {
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe' + address : 'port:' + PORT
    console.log('Listening on ' + bind)
})

server.listen(PORT)