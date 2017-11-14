var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

//model import 
var modelUtilisateur  = require('../../models/Utilisateur');

/**recuperer tout les utilisateurs 
 * 
 */
router.get('/', function(req, res, next){
    console.log('\nget \'/utilisateurs\' ');
    modelUtilisateur.find(function(err, utilisateurs){
        if (err) res.send(err);
        res.json(utilisateurs);
    });
});

/** recuperer un utilisateur
 *  @argument
 *  - id : id de l'utilisateur
 */
router.get('/:id', function(req, res, next){
    console.log('\nget \'/utilisateurs/:id\' ');
    modelUtilisateur.findById(req.params.id, function(err, utilisateur){
        if (err) res.send(err);
        res.json(utilisateur);
    })   
});

router.post('/create', function (req, res, next) {
    console.log('\npost \'/utilisateurs/create\' ');
    var utilisateur  = new modelUtilisateur;
    utilisateur.nom  = req.body.nom;
    utilisateur.mail = req.body.mail;
    utilisateur.mdp  = req.body.mdp ;
    utilisateur.salt = "togenerate" ;
    utilisateur.date_maj = Date.now() ;

    console.log(utilisateur);

    utilisateur.save(function (err) {
        if (err)res.send(err);
        res.json({ message: 'utilisateur créé', type : 'success'});
    });

});

// /* GET users login. */
// router.get('/login', function(req, res, next) {
//     res.render('login', { title: 'Express' });
// });

// router.post('/login', function(req, res, next){   
//     var name = req.body.name;
//     var mdp  = req.body.mdp;
//     var connected = false;

//     var users = require('../bdd/users');
//     users.forEach(function(user) {
//         if (user.name == name && bcrypt.compareSync(mdp, user.mdp))connected = true;
//     }, this);
//     if (connected)res.send("connected");
//     else res.send("user not found");
// });

/**mettre à jour un utilisateur
 * @argument
 * - id : id de l'utilisateur
 */
router.put('/:id', function(req, res, next){
    console.log('\npatch \'/utilisateurs/:id\' ');
    modelUtilisateur.findById(req.params.id, function(err, utilisateur){
        
        if (err) res.send(err);
        
        utilisateur.nom = req.body.nom;

        utilisateur.save(function(err){
            if (err) res.send(err);
            else res.json({ message : 'utilisateur mise à jour avec succès', type:'success'})
        });
    });
});

module.exports = router;
