var express = require('express');
var router = express.Router();
var fs = require('fs');
var moment = require('moment');

var modelAppartement = require('../../models/Appartement');

router.get('/', function(req, res, next){
    console.log('\nget \'/appartements\' ');
    modelAppartement.find(function(err, appartements){
        if (err) res.send(err);
        res.json(appartements);
    });
});

router.get('/:id', function (req, res, next) {
    console.log('\nget \'/appartements/:id\' ');
    modelAppartement.findById(req.params.id, function (err, appartement) {
        if (err) res.send(err);
        res.json(appartement) ;
    });
});

router.put('/:id', function (req, res, next) {
    console.log('\nput \'/appartements\' ');
    modelAppartement.findById(req.params.id, function (err, appartement) {
        if (err) res.send(err);

        for (var key in req.body)
            appartement.key = req.body.key;

        appartement.save(function(err){
            if(err) res.send(err);
            res.json({ message: 'appartement créé', type : 'success'});
        })
    });
});

router.post('/create', function(req, res, next){
    console.log('\npost \'/appartements/create\' ');
    var appartement = new modelAppartement;

    console.log (req.body);
    for (key in req.body){
        appartement[key] = req.body[key]
    }
    
    appartement.date_maj = Date.now();

    appartement.save(function (err) {
        if (err) res.send(err);
        res.json({ message: 'appartement créé', type: 'success' });
    });
})


/* Searching */
router.get('/search', function(request, response, next) {
  
  var ville = request.query.ville;
  var pays  = request.query.pays;
  var json  = JSON.parse(fs.readFileSync("./bdd/rent.json"));
  var reponse = [];

  if(ville&&pays){
    pays=0;
  }
  for(i=0;i<json.length;i++){
    if(json[i].ville==ville){
      reponse.push(json[i]);
    }
    else{
      if(json[i].pays==pays){
        reponse.push(json[i]);
      }
    }
  }
  response.send(reponse);
});

/* Booking */
router.get('/booking', function(request, response, next) {
  
  var idAppart = request.query.id;
  var newDateDispo = request.query.date;
  
  var file = require('../bdd/rent');
  var json = JSON.parse(fs.readFileSync("./bdd/rent.json"));

  var dateNow = moment().format("DD-MM-YYYY");
  if(moment(dateNow).isSameOrAfter(json[idAppart].datedisponibilite,"day")){
    file[idAppart].datedisponibilite = newDateDispo;
    response.send(200,"Ok");
  }
  else{
    response.send(200,"Cet appartement est indisponible");
  }


  fs.writeFile('./bdd/rent.json', JSON.stringify(file,null,4), 'utf8');

});
module.exports = router;