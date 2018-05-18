const express = require('express')
const app = express()


//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))

//rotas
app.get('/', (req, res) => {
	res.render('index')
})

//Ouvir na port 3000
server = app.listen(3000)

//armazena as mensagens
let messages = [];

//socket.io instantiation
const io = require("socket.io")(server)


//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
    socket.username = "Anonymous"
    //cria uma variavel para hora
    var time = new Date();  

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
        io.emit('new_user', {username: socket.username, hora: time.getHours() + ':' + time.getMinutes()});
    })

    io.emit('new_user', {username: socket.username, hora: time.getHours() + ':' + time.getMinutes()});

    //listen on new_message
    socket.on('new_message', (data) => {       
        //cria um objeto para savar as mensagens
        var messageObject = {
            author: socket.username,
            message: data.message,
            hora: time.getHours() + ':' + time.getMinutes(),
        };    

        //salva as mensagens em uma variavel
        messages.push(messageObject);
        
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username, hora: time.getHours() + ':' + time.getMinutes()});
    })

    socket.on('new_user', (data) => {
        socket.broadcast.emit('new_user', {username : socket.username})
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})