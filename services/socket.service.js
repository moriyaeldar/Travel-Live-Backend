const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null

function connectSockets(http, session) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        console.log('New socket', socket.id)
        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
        })
        socket.on('setHost', hostId => {
            if (socket.myTopic === hostId) return;
            console.log('hosetId',hostId);
            // if (socket.myTopic) {
            //     socket.leave(socket.myTopic)
            // }
            socket.join(hostId)
            socket.myTopic = hostId
        })
        socket.on('sendMsg', msg => {
            console.log('Emitting Chat msg', msg);
            // emits to all sockets:
            // gIo.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            gIo.to(socket.myTopic).emit('setNotification', msg)
        })
        socket.on('user-watch', userId => {
            socket.join('watching:' + userId)
        })
        socket.on('set-user-socket', userId => {
            logger.debug(`Setting (${socket.id}) socket.userId = ${userId}`)
            socket.userId = userId
        })
        socket.on('add order', msg => {
            console.log('*************');
            socket.broadcast.emit('get notification', msg);
        })
        socket.on('unset-user-socket', () => {
            delete socket.userId
        })

    })
}

function emitTo({ type, data, label }) {
    if (label) gIo.to('watching:' + label).emit(type, data)
    else gIo.emit(type, data)
}

async function emitToUser({ type, data, userId }) {
    logger.debug('Emiting to user socket: ' + userId)
    const socket = await _getUserSocket(userId)
    if (socket) socket.emit(type, data)
    else {
        console.log('User socket not found');
        _printSockets();
    }
}

// Send to all sockets BUT not the current socket 
async function broadcast({ type, data, room = null, userId }) {
    console.log('BROADCASTING', JSON.stringify(arguments));
    const excludedSocket = await _getUserSocket(userId)
    if (!excludedSocket) {
        logger.debug('Shouldnt happen, socket not found')
        _printSockets();
        return;
    }
    logger.debug('broadcast to all but user: ', userId)
    if (room) {
        excludedSocket.broadcast.to(room).emit(type, data)
    } else {
        excludedSocket.broadcast.emit(type, data)
    }
}

async function _getUserSocket(userId) {
    const sockets = await _getAllSockets();
    const socket = sockets.find(s => s.userId == userId)
    return socket;
}
async function _getAllSockets() {//different
    // return all Socket instances
    const sockets = await gIo.fetchSockets();
    return sockets;
}
// function _getAllSockets() {
//     const socketIds = Object.keys(gIo.sockets.sockets)
//     const sockets = socketIds.map(socketId => gIo.sockets.sockets[socketId])
//     return sockets;
// }

async function _printSockets() {
    const sockets = await _getAllSockets()
    console.log(`Sockets: (count: ${sockets.length}):`)
    sockets.forEach(_printSocket)
}
function _printSocket(socket) {
    console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`)
}

module.exports = {
    connectSockets,
    emitTo,
    emitToUser,
    broadcast,
}



