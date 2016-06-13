var express = require('express');
var routes = require('./routes');
var mongodb = require("mongodb");
var assert = require('assert'); //unit tests
var bodyParser = require("body-parser");
var ObjectID = mongodb.ObjectID;
var url = 'mongodb://admin:admin@ds017862.mlab.com:17862/itorerutdb';
//var url = 'mongodb://localhost:27017/test';
//var url = 'mongodb://admin:admin@ds036069.mlab.com:36069/vms_db';

var CONTACTS_COLLECTION = "contacts";
var LISTS_COLLECTION = "lists";
var EVENTS_COLLECTION = "events";
                     
var app = express();

/*
 *   server configuration
 */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

/*  Create a database variable outside of the database connection callback
 *   to reuse the connection pool in your app.
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

/*  "/contactsDB"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/contactsDB", function(req, res) {
    db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.post("/contactsDB", function(req, res) {
    var newContact = req.body;
    db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new contact.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

/*  "/contactDB/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/contactDB/:id", function(req, res) {
    db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get contact");
        } else {
            res.status(200).json(doc);
        }
    });
});

app.put("/contactDB/:id", function(req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;
    


    db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update contact");
        } else {
            res.status(204).end();
        }
    });
});

app.delete("/contactDB/:id", function(req, res) {
    db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete contact");
        } else {
            res.status(204).end();
        }
    });
});

/*  "/listsDB"
 *    GET: finds all lists
 *    POST: creates a new list
 *    PUT: update list by id
 *    DELETE: deletes list by id
 */

app.get("/listsDB", function(req, res) {
    db.collection(LISTS_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get lists.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.post("/listsDB", function(req, res) {
    var newList = req.body;
    db.collection(LISTS_COLLECTION).insertOne(newList, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new list.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

app.put("/listsDB", function(req, res) {
    var updateDoc = req.body;
    var id = updateDoc._id;
    delete updateDoc._id;

    db.collection(LISTS_COLLECTION).updateOne({_id: new ObjectID(id)}, updateDoc, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update list");
        } else {
            res.status(204).end();
        }
    });
});

app.delete("/listsDB/:id", function(req, res) {
    db.collection(LISTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete list");
        } else {
            res.status(204).end();
        }
    });
});

app.get("/eventsDB", function(req, res) {
    db.collection(EVENTS_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get events.");
        } else {
            res.status(200).json(docs);
        }
    });
});

//calendar events collection DB API
app.post("/calendarDB", function(req, res) {
    var newEvent = req.body;
    
    db.collection(EVENTS_COLLECTION).insertOne(newEvent, function(err, doc) {
        if (err) {

        handleError(res, err.message, "Failed to create new event.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

app.put("/calendarDB", function(req, res) {
    var updateDoc = req.body;
    var id = updateDoc._id;
    delete updateDoc._id;

    db.collection(EVENTS_COLLECTION).updateOne({_id: new ObjectID(id)}, updateDoc, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update event");
        } else {
            res.status(204).end();
        }
    });
});

app.delete("/calendarDB/:id", function(req, res) {
    console.log(req.params.id);
    db.collection(EVENTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete event");
        } else {
            console.log("delete");
            res.status(204).end();
        }
    });
});





// get all the calendar events
app.get("/calendarDB", function(req, res) {

  db.collection(EVENTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get events.");
    } else {
      res.status(200).json(docs);
    }
  });
});



// all other routes direct to index.
app.get('*', routes.index);
