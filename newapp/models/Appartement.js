var mongoose = require('mongoose'), 
    Schema = mongoose.Schema; 
    


var schema = new Schema({
    adresse         : { type: String, required: true },
    pays            : { type: String, required: true },
    ville           : { type: String, required: true },
    CP              : { type: String, required: true },
    utilisateur_id  : { type: Schema.Types.ObjectId, required: true },
    prix            : { type: Number, required: true },
    places          : { type: Number, required: true },
    commentaires    : { 
        type: {
            note            : { type: Number, required: true },
            texte           : { type: String, required: true },
            utilisateur_id  : { type: Schema.Types.ObjectId, required : true}
        } 
    },
    reservations    : { type : [Schema.Types.ObjectId] },
    date_crea       : { type: Date, default: Date.now },
    date_maj        : { type: Date }
});

module.exports = mongoose.model('Appartement', schema, 'appartements'); 