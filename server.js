// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use('/assets', express.static(__dirname + '/assets'));

// Star Wars Characters (DATA)

var reservations = [{
    customerName: "Jonathan Arellano",
    phoneNumber: "455-343-4344",
    customerEmail: "NeverHacked@yahoo.com",
    customerID: "44953"
}, {
    customerName: "Ramiro Lopez",
    phoneNumber: "838-928-9383",
    customerEmail: "r@lopez.com",
    customerID: "asdfasf"
}, {
    customerName: "Tam",
    phoneNumber: "938-282-8288",
    customerEmail: "asdfas",
    customerID: "1"
}, {
    customerName: "Ivette",
    phoneNumber: "929-292-9229",
    customerEmail: "ivette@gmail.com",
    customerID: "4234"
}];



//Routes
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'Views/home.html'));
});

app.get('/reserve', function(req, res) {
    res.sendFile(path.join(__dirname, 'Views/reserve.html'));
});

app.get('/tables', function(req, res) {
    res.sendFile(path.join(__dirname, 'Views/tables.html'));
});

app.get('/api/waitlist', function(req, res) {
    var waitlist = [];
    if (reservations.length == 4) {
        res.json([]);
    } else {
        for (var i = 5; i < reservations.length; i++) {
            waitlist.push(reservations[i])
        }

        res.json(waitlist);
    }

});

app.get('/api/currentreservations', function(req, res) {
    var curReservations = [];
    if (reservations.length == 4) {
        res.json(reservations);
    } else {
        for (var i = 0; i < 5; i++) {
            curReservations.push(reservations[i])
        }

        res.json(curReservations);
    }

});

app.get('/api/tables', function(req, res) {
    res.json(reservations);
});

app.post('/api/new', function(req, res) {
    var newReservation = req.body;
    reservations.push(newReservation);

    res.json(reservations);
})


//start server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})
