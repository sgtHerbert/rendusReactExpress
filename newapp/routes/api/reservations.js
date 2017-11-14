var express = require('express');
var router = express.Router();

//model import 
var modelReservation = require('../../models/Reservation');

/**recuperer tout les reservations 
 * 
 */
router.get('/', function (req, res, next) {
    console.log('\nget \'/reservations\' ');
    modelReservation.find(function (err, reservations) {
        if (err) res.send(err);
        res.json(reservations);
    });
});

/**recuperer une reservation par id
 * @argument
 * - id 
 */
router.get('/:id', function (req, res, next) {
    console.log('\nget \'/reservations/:id\' ');
    modelReservation.findById(req.params.id, function (err, reservation) {
        if (err) res.send(err);
        res.json(reservation);
    })   
});

/**maj d'une resa par id
 * @argument
 * - id
 */
router.put('/:id', function(req, res, next){
    console.log('\nput \'/reservations/:id\'')
});

/**creation d'une reservation
 * 
 */
router.post('/create', function(req, res, next){
    console.log('\npost \'/reservations/create\' ');
    var reservation            = new modelReservation;
    reservation.utilisateur_id = req.body.utilisateur_id;
    reservation.date_debut     = req.body.date_debut;
    reservation.date_fin       = req.body.date_fin;
    reservation.date_maj       = Date.now();

    console.log(utilisateur);

    utilisateur.save(function (err) {
        if (err) res.send(err);
        res.json({ message: 'utilisateur créé', type: 'success' });
    });

});

module.exports = router;