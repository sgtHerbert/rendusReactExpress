var express = require('express');
var router = express.Router();

//route import
var users     = require('./api/utilisateurs');
var messaging = require('./api/messaging');
var flats     = require('./api/appartements');
var mail      = require('./api/mailer');

router.use('/messaging', messaging);
router.use('/utilisateurs', users);
router.use('/appartements', flats);
router.use('/mailer', mail);
//hello@clementsauvage.me

module.exports = router;