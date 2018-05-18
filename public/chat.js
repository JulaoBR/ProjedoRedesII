$(function(){
//fazer conexão
 var socket = io.connect('http://localhost:3000')

 //botões e entradas
 var message = $("#message")
 var username = $("#username")
 var send_message = $("#send_message")
 var send_username = $("#send_username")
 var chatroom = $("#chatroom")
 var feedback = $("#feedback")

 //Emitir mensagem
 send_message.click(function(){
     socket.emit('new_message', {message : message.val()})
 })

 //Ouça uma nova mensagem
 socket.on("new_message", (data) => {
     feedback.html('');
     message.val('');
     chatroom.append("<p class='message'>" + data.hora + " " + data.username + ": " + data.message + "</p>")
 })

  //Ouça uma nova mensagem
  socket.on("new_user", (data) => {
    feedback.html('');
    message.val('');
    chatroom.append("<p><i>" + data.username + " entrou na sala..." + "</i></p>")
})

 //Emitir um nome de usuário
 send_username.click(function(){
     socket.emit('change_username', {username : username.val()})
 })

 //Emitir digitando
 message.bind("keypress", () => {
     socket.emit('typing')
 })

 //Ouvi quem esta digitando
 socket.on('typing', (data) => {
     feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
 })
});