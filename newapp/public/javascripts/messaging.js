// Connexion à socket.io
var socket = io.connect('http://localhost:3002');

socket.on('connect', function(data) {
    console.log('connected');
    insereMessage('server', 'vous êtes connecté à la messagerie');
});

//Quand on reçoit un message, on l'insère dans la page
socket.on('message', function(data) {
    console.log('return');
    console.log(data);
    insereMessage('server(zambla)', data);
})

//Lorsqu'on envoie le formulaire, on transmet le message et on l'affiche sur la page
$('#envoi_message').click(function () {
    console.log('submit');
    var message = $('#message').val();
    socket.emit('message', message); // Transmet le message aux autres
    insereMessage('user', message); // Affiche le message aussi sur notre page
    $('#message').val('').focus(); // Vide la zone de Chat et remet le focus dessus
    return false; // Permet de bloquer l'envoi "classique" du formulaire
});

// Ajoute un message dans la page
function insereMessage(pseudo, message) {
    $('#zone_chat').prepend('<p><strong>'+ pseudo +':</strong> ' + message + '</p>');
}