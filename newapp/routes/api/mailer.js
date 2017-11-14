'use strict';
var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var modelMail = require('../../models/Mail');

/** créer, enregistre et envoie un mail à l'utilisateur
 * @argument
 * 
 */
router.post('/createmail', function(req, res, next){
    console.log('\post \'/mailer\' ');
    var mail = new modelMail;

    for(var key in req.body)
        mail.key = req.body.key;

    mail.save(function (err) {
        if (err) res.send(err);

        var transport = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            tls    : { rejectUnauthorized: false },
            host   : 'smtp.gmail.com',
            port   : 465,
            secure : false, // true for 465, false for other ports
            auth: {
                user : 'weeno.trash@gmail.com',
                pass : 'totolatulipe'
            }
        }));

        var mail = {
            from   : "weeno.trash@gmail.com",
            to     : "m.durbet@gmail.com",
            subject: req.body.objet,
            html   : req.body.text,
        }

        transport.sendMail(mail, function (error, response) {
            if (error) {
                console.log(error);
                res.json({ message: 'erreur lors de l\'envoie du message', type: 'success' });   
            } else {
                res.json({ message: 'mail envoyé', type: 'success' });   
            }
        });
    })
});

module.exports = router;