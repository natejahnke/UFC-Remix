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
var fs = require("fs");




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



// var url = "http://www.ufc.com/fighter/536796";





// ufc.getFighter(url, function(data) {
//     console.log("Name: " + data.fullname + "\nAge: " + data.age + "\nHeight: " + data.height + "\nWeight: " + data.weight + "\nRecord: " + data.record);
// });



// console.log(fighters);
// var mma = require('mma');
// mma.fighter("Jon Jones", function(data) {
//     console.log(data);
// });


// Stores Id number associated to each fighter on UFC api

// loops through all fighter ID number then logs every object for each fighter.
// for (let j = 0; j < fighterId.length; j++) {
//     request("http://ufc-data-api.ufc.com/api/v3/us/fighters/" + fighterId[j] + ".json", function(error, response, body) {
//         if (!error && response.statusCode === 200) {
//             console.log(JSON.parse(body));
//         }
//     })
// };



// ufc.fighter536796.json(function(err, res) {
//     console.log(res.body);
// });



// console.log(chalk.blue("Name: ") + res.body[i].first_name + " " + res.body[i].last_name + " " + chalk.red("Record: ") + res.body[i].wins + "-" + res.body[i].losses + "-" + res.body[i].draws);

// console.log("Id: " + res.body[i].id);

// const id = "241895";
// request("http://ufc-data-api.ufc.com/api/v3/us/fighters/" + id + ".json", function(error, response, body) {
//     //     //     // If the request is successful (i.e. if the response status code is 200)
//     if (!error && response.statusCode === 200) {
//         //         //         // const obj = JSON.parse(body).find(o => o.last_name === lastName & o.first_name === firstName);
//         //         //         // Parse the body of the site and recover just the imdbRating
//         //         //         // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//         //         //         // console.log(JSON.parse(body)[0]);
//         //         //         for (var i = 0; i < body.length; i++) {
//         //         //             fighters.push(JSON.parse(body)[i].first_name + "-" + JSON.parse(body)[i].last_name);
//         console.log(JSON.parse(body).last_name);
//         //         //             // console.log(fighters);
//     }

// });

var ufc = new UfcAPI({
    version: '3'
});

const fighterId = [];

function getFighterId() {
    ufc.fighters(function (err, res) {
        for (let i = 0; i < res.body.length; i++) {
            // fighterId.push(res.body[i].id);

            fs.appendFile("fighterId.txt", res.body[i].id + "\n", function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("movies.txt was updated!");
            });
        }
    })
};

// getFighterId();


function allFighters() {
    for (let j = 0; j < fighterId.length; j++) {
        request("http://ufc-data-api.ufc.com/api/v3/us/fighters/" + fighterId[j] + ".json", function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(JSON.parse(body));
            }
        })
    }
};


// getFighterId().then(function() {
//     return allFighters();
// });

var lineReader = require('line-reader');

lineReader.eachLine('fighterId.txt', function (line, last) {
    // do whatever you want with line...
    request("http://ufc-data-api.ufc.com/api/v3/us/fighters/" + line + ".json", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // console.log("Name: " + JSON.parse(body).first_name + " " + JSON.parse(body).last_name + " " + "Record: " + JSON.parse(body).wins + "-" + JSON.parse(body).losses);
            console.log(JSON.parse(body).thumbnail);
        }
        // console.log(line);
        if (last) {
            // or check if it's the last one
        }
    })
});

const download = require('image-downloader');

// Download to a directory and save with the original filename
const options = {
    url: 'http://someurl.com/image.jpg',
    dest: '/path/to/dest' // Save to /path/to/dest/image.jpg
};