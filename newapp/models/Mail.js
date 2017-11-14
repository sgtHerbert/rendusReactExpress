var mongoose = require('mongoose'), 
    Schema = mongoose.Schema; 


var schema = new Schema({
    exp_id      : { type: Schema.Types.ObjectId, required: true },
    dest_id     : { type: Schema.Types.ObjectId, required: true },
    objet       : { type: String, default : 'reservation'},
    text        : { type: String, required: true },
    date_crea   : { type: String, default: Date.now },
})

module.exports = mongoose.model('Mail', schema, 'mails'); 

