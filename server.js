const express = require('express'),
    path = require('path'),
    config = require('./config'),
    // routes = require('./routes'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    port = config.server.PORT;

const MongoClient = require("mongodb").MongoClient;
const crypto = require("crypto");
const uri = "mongodb://localhost:27017/";

// Export app for other routes to use
let app = express(),
    http = require('http').Server(app);

// Starting point of the server
function main() {
  app.use(express.static('./public'));

  app.use(express.static(path.join(__dirname + '/public')));
  app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.json({type: 'application/vnd.api+json'}));
  app.use(methodOverride());


  try {
    MongoClient.connect(uri, (err, db) => {
      var dbo = db.db("toDoApp");

      app.post('/task', (req, res) => {
        var myobj = {name: "Company Inc", address: "Highway 37"};
        dbo.collection(config.dataBaseNames.tasks).insertOne(myobj, function (err, result) {
          if (err) {
            res.status(500).json({
              success: false,
              message: 'An Error occured insertOne',
              error: err
            });
          } else {
            res.status(200).json({
              success: true,
              message: "document inserted",
              data: result
            });
          }
          // db.close();
        });
      });

      app.get('/task', (req, res) => {
        dbo.collection(config.dataBaseNames.tasks).findOne({}, function (error, result) {
          if (error) {
            res.status(500).json({
              success: false,
              message: 'An Error occured',
              error: error
            });
          } else {
            res.status(200).json({
              success: true,
              data: result
            });
          }
          // db.close();
        });
      });

      app.put('/task', (req, res) => {
        var myquery = { address: "Highway 37" };
        var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
        dbo.collection(config.dataBaseNames.tasks).updateOne(myquery, newvalues, function (error, result) {
          if (error) {
            res.status(500).json({
              success: false,
              message: 'An Error occured updateOne',
              error: error
            });
          } else {
            res.status(200).json({
              success: true,
              message: 'updateOne done',
              data: result
            });
          }
          // db.close();
        });
      });

      app.delete('/task', (req, res) => {
        var myquery = { address: "Canyon 123" };
        dbo.collection(config.dataBaseNames.tasks).deleteOne(myquery, function (error, result) {
          if (error) {
            res.status(500).json({
              success: false,
              message: 'An Error occured',
              error: error
            });
          } else {
            res.status(200).json({
              success: true,
              data: result
            });
          }
          // db.close();
        });
      });

      app.use(function (req, res) {
        res.status(404).send({url: req.originalUrl + ' not found'})
      });

    });

  } catch (e) {
    console.log("some Error has occured");
  }

  router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.listen(port, (err) => {
    err ? console.log('Cannot connect...', err) : console.log(`Connected! Server is listening on port ${port}`);
  });
}

main();
