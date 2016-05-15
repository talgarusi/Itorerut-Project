var express = require('express');
var routes = require('./routes');
var mongodb = require("mongodb");
var assert = require('assert'); //unit tests
var bodyParser = require("body-parser");
var ObjectID = mongodb.ObjectID;
var url = 'mongodb://admin:admin@ds017862.mlab.com:17862/itorerutdb';
//var url = 'mongodb://localhost:27017/test';
var CONTACTS_COLLECTION = "contacts";
                     
var app = express();

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

/*  Create a database variable outside of the database connection callback
    to reuse the connection pool in your app.
*/
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(url, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 3000, function () {
      var port = server.address().port;
      console.log("App now running on port", port);
  });
});







// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/contacts", function(req, res) {
  db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/contacts", function(req, res) {
    var newContact = req.body;
    console.log(ObjectID.index);
    newContact.id = ObjectID.index;

    db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
        if (err) {
        handleError(res, err.message, "Failed to create new contact.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

/*  "/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/contact/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).findOne({ id: req.body.id }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/contacts/:id", function(req, res) {
});

app.delete("/contacts/:id", function(req, res) {
});

app.get('/', routes.index);

app.get('/partials/:name', routes.partials);

app.get('*', routes.index);