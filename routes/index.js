import * as mongodb from "mongodb";

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSUEB' });
});

mongodb.get('/mongodb', function (request, response) {

  mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if(err) throw err;
    //get collection of user
    var User = db.collection('User');
    //get all Routes with frequency >=1
    User.find({ frequency : { $gte: 0 } }).sort({ name: 1 }).toArray(function (err, docs) {
      if(err) throw err;

      response.render('pages/mongodb', {results: docs});

    });

    //close connection when your app is terminating.
    db.close(function (err) {
      if(err) throw err;
    });
  });//end of connect
});//end app.get

module.exports = router;
