// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const chalk = require('chalk');
const fs = require("fs");
const axios = require("axios");
var logger = require("morgan");
var mongoose = require("mongoose");

// Express App
var app = express();
var PORT = process.env.PORT || 8080;

//require all models
const db = require("./models");

// Use morgan logger for logging requests
app.use(logger("dev"));

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/week18Populater");

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

const fighterId = [];

axios.get("http://ufc-data-api.ufc.com/api/v3/us/fighters/").then(function (id) {
    id.data.forEach(function (fighters) {
        fighterId.push(fighters.id);
    })
    fighterId.forEach(function (allFighters) {
        axios.get("http://ufc-data-api.ufc.com/api/v3/us/fighters/" + allFighters + ".json").then(function (fighters) {
            console.log(fighters.data.first_name + " " + fighters.data.last_name);

            db.Fighter.create(result)
        })
    })
});