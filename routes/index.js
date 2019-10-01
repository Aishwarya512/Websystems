var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//**************************
//*** mongodb get all of the Routes in Routes collection where frequence>=1
//      and sort by the name of the route.  Render information in the views/pages/mongodb.ejs
router.get('/mongodb', function (request, response, next) {
  MongoClient.connect("mongodb://Aishu:abc123@ds227808.mlab.com:27808/heroku_gb8t8mb3", function(err, database) {
    if(err) throw err;
    //get collection of routes
    const myDB = database.db('heroku_gb8t8mb3')
    var Routes = myDB.collection('Routes');
    //get all Routes with frequency >=1
    Routes.find({ frequency : { $gte: 0 } }).sort({ name: 1 }).toArray(function (err, docs) {
      if(err) throw err;

      response.render('mongodb', {results: docs});

    });

    //close connection when your app is terminating.
    database.close(function (err) {
      if(err) throw err;
    });
  });//end of connect
});//end app.get

module.exports = router;