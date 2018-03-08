// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var ufc = require("ufc");
var Regex = require("regex");
var request = require("request");
var fightMatrix = require("fight-matrix");
var mma = require("mma");
var UfcAPI = require('ufc-api');
const chalk = require('chalk');



// Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());

// Static directory to be served
app.use(express.static("app/public"));

// Routes
// =============================================================
// require("./app/routes/api-routes.js")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

// var firstName = "Nate";
// var lastName = "Diaz";
// var fighters = [];

// var search = firstName + " " + lastName;
// search = search.replace(/\s/g, "-");
// console.log(search);
// Then run a request to the OMDB API with the movie specified
// request("http://ufc-data-api.ufc.com/api/v3/us/fighters", function (error, response, body) {

//     // If the request is successful (i.e. if the response status code is 200)
//     if (!error && response.statusCode === 200) {
//         // const obj = JSON.parse(body).find(o => o.last_name === lastName & o.first_name === firstName);
//         // Parse the body of the site and recover just the imdbRating
//         // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//         // console.log(JSON.parse(body)[0]);
//         for (var i = 0; i < body.length; i++) {
//             fighters.push(JSON.parse(body)[i].first_name + "-" + JSON.parse(body)[i].last_name);
//             // console.log(JSON.parse(body)[i].last_name);
//             // console.log(fighters);
//         }


//     }
// });


// for (var j = 0; j < fighters.length; j++) {
//     console.log(fighters[j]);
//     var url = "http://www.ufc.com/fighter/" + fighters[j];





//     ufc.getFighter(url, function (data) {
//         console.log("Name: " + data.fullname + "\nAge: " + data.age + "\nHeight: " + data.height + "\nWeight: " + data.weight + "\nRecord: " + data.record);
//     });
// }


// console.log(fighters);
// var mma = require('mma');
// mma.fighter("", function (data) {
//     console.log(data);
// });

var ufc = new UfcAPI({
    version: '3'
});


ufc.fighters(function (err, res) {
    for (var i = 0; i < res.body.length; i++) {
        console.log(chalk.blue("Name: ") + res.body[i].first_name + " " + res.body[i].last_name + " " + chalk.red("Record: ") + res.body[i].wins + "-" + res.body[i].losses + "-" + res.body[i].draws);
    }


});