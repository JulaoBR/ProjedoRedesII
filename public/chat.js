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
 //quando o botao de enviar é precionado envia mensagem para o evento new_message no app.js
 send_message.click(function(){
     socket.emit('new_message', {message : message.val()});
 })


 //Ouça uma nova mensagem
 //exibe a menagem no html, fica escutando alguem chamar esse evento
 socket.on("new_message", (data) => {
     feedback.html('');
     message.val('');
     chatroom.append("<p class='message'>" + data.hora + " " + data.username + ": " + data.message + "</p>");
 });

  //evento para anunciar novo usuario no chat
  socket.on("new_user", (data) => {
    feedback.html('');
    message.val('');
    chatroom.append("<p><i>"+ data.hora + " " + data.username + " entrou na sala..." + "</i></p>");
});

 //Emitir um nome de usuário
 //aciona quando o botao de adicionar username é precionado
 send_username.click(function(){
     socket.emit('change_username', {username : username.val()});
 });

 //Emitir digitando
 message.bind("keypress", () => {
     socket.emit('typing');
 });

 //Ouvi quem esta digitando
 socket.on('typing', (data) => {
     feedback.html("<p><i>" + data.username + " esta digitando..." + "</i></p>");
 })
});



