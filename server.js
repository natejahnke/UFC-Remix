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
mongoose.connect("mongodb://localhost/UFCremix");

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
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

const fighterId = [];

axios.get("http://ufc-data-api.ufc.com/api/v3/us/fighters/").then(function(id) {
    id.data.forEach(function(fighters) {
        fighterId.push(fighters.id);
    })
    fighterId.forEach(function(allFighters) {
        axios.get("http://ufc-data-api.ufc.com/api/v3/us/fighters/" + allFighters + ".json").then(function(fighters) {
            // console.log(fighters.data.first_name + " " + fighters.data.last_name);
            let fightData = fighters.data;

            db.Fighter.create({
                id: fightData.id,
                first_name: fightData.first_name,
                last_name: fightData.last_name,
                nick_name: fightData.nickname,
                wins: fightData.wins,
                losses: fightData.losses,
                draws: fightData.draws,
                ko_wins: fightData.ko_wins,
                submission_wins: fightData.submission_wins,
                decision_wins: fightData.decision_wins,
                rank: fightData.rank,
                date_of_birth: fightData.dob,
                height: fightData.height,
                weight: fightData.weight,
                weight_class: fightData.weight_class,
                title_holder: fightData.title_holder,
                city_residing: fightData.city_residing,
                state_residing: fightData.state_residing,
                country_residing: fightData.country_residing,
                thumbnail: fightData.thumbnail,
                belt_thumbnail: fightData.belt_thumbnail,
                left_full_body_image: fightData.left_full_body_image,
                right_full_body_image: fightData.right_full_body_image,
                profile_image: fightData.profile_image,
                link: fightData.link
            }, function(err) {
                if (err) return handleError(err);
            })

        })
    })
});

axios.get("http://ufc-data-api.ufc.com/api/v3/us/events").then(function(result) {
    result.data.forEach(function(events) {
        db.Event.create({
            id: events.id,
            event_date: events.event_date,
            base_title: events.base_title,
            title_tag_line: events.title_tag_line,
            feature_image: events.feature_image,
            secondary_feature_image: events.secondary_feature_image,
            event_time_text: events.event_time_text,
            event_time_zone_text: events.event_time_zone_text,
            subtitle: events.subtitle,
            arena: events.arena,
            location: events.location,
            main_event_fighter1_id: events.main_event_fighter1_id,
            main_event_fighter2_id: events.main_event_fighter2_id
        })
    })
});