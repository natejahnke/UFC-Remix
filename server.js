// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var ufc = require("ufc");
var Regex = require("regex");
var request = require("request");
var fightMatrix = require("fight-matrix");


// Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Static directory to be served
app.use(express.static("app/public"));

// Routes
// =============================================================
// require("./app/routes/api-routes.js")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

// var search = "Max Holloway";
// search = search.replace(/\s/g, "-");
// var url = "http://www.ufc.com/fighter/" + search
// ufc.getFighter(url, function(data) {
//     console.log("Name: " + data.fullname + "\nAge: " + data.age + "\nHeight: " + data.height + "\nWeight: " + data.weight + "\nRecord: " + data.record);
// });

// Then run a request to the OMDB API with the movie specified
request("http://ufc-data-api.ufc.com/api/v3/us/fighters", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
        const obj = JSON.parse(body).find(o => o.last_name === 'Jones' & o.first_name === 'Jon');
        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        // console.log(JSON.parse(body)[0]);
        console.log(obj);

    }
});


// var url = "http://www.fightmatrix.com/fighter-profile/Jon+Jones/"
// fightMatrix.getFighter(url, function(data) {
//     console.log(data);
// });