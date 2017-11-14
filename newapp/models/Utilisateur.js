var mongoose = require('mongoose'), // Nous appelons le module mongoose
    Schema = mongoose.Schema; // Nous créons un schéma mongoose


var schema = new Schema({
    nom           : { type: String, required: true },
    mail          : { type: String, required: true },
    mdp           : { type: String, required: true },
    salt          : { type: String, default : "voicimonsalt"},
    date_crea     : { type: Date  , default : Date.now },
    date_maj      : { type: Date }
});

// Nous exportons notre modèle avec comme nom "Utilisateur", 'utilisateurs' sera le nom de collection.
module.exports = mongoose.model('Utilisateur', schema, 'utilisateurs'); 