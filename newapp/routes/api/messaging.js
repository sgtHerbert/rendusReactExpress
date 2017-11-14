var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('messaging', { title: 'Messaging' });
});

module.exports = router;
