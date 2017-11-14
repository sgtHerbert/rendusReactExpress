var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    utilisateur_ids : { type: [Schema.Types.ObjectId], required: true },
    date_debut      : { type: Date, required: true },    
    date_fin        : { type: Date, required: true },
    date_crea       : { type: Date, default: Date.now },
    date_maj        : { type: Date }
});

module.exports = mongoose.model('Reservation', schema, 'reservations'); 