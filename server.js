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

axios.get("http://ufc-data-api.ufc.com/api/v3/us/events/").then(function(result) {
    result.data.forEach(function(events) {
        db.Event.create({
            event_id: events.id,
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

const eventId = [];

axios.get("http://ufc-data-api.ufc.com/api/v3/us/events/").then(function(id) {
    id.data.forEach(function(fights) {
        eventId.push(fights.id);
    })
    eventId.forEach(function(events) {
        axios.get("http://ufc-data-api.ufc.com/api/v3/us/events/" + events + "/fights/").then(function(eventFights) {
            eventFights.data.forEach(function(fightsList) {
                db.Fights.create({
                    event_id: fightsList.event_id,
                    fightcard_order: fightsList.fightcard_order,
                    fighter1_id: fightsList.fighter1_id,
                    fighter1_first_name: fightsList.fighter1_first_name,
                    fighter1_last_name: fightsList.fighter1_last_name,
                    fighter1_nick_name: fightsList.fighter1_nick_name,
                    fighter1_wins: fightsList.fighter1_wins,
                    fighter1_losses: fightsList.fighter1_losses,
                    fighter1_draws: fightsList.fighter1_draws,
                    fighter1reach: fightsList.fighter1reach,
                    fighter1height: fightsList.fighter1height,
                    fighter1weight: fightsList.fighter1weight,
                    fighter1_rank: fightsList.fighter1_rank,
                    fighter1_weight_class: fightsList.fighter1_weight_class,
                    fighter1_averagefighttime: fightsList.fighter1_averagefighttime,
                    fighter1_kdaverage: fightsList.fighter1_kdaverage,
                    fighter1_slpm: fightsList.fighter1_slpm,
                    fighter1_strikingaccuracy: fightsList.fighter1_strikingaccuracy,
                    fighter1_sapm: fightsList.fighter1_sapm,
                    fighter1_strikingdefense: fightsList.fighter1_strikingdefense,
                    fighter1_takedownaverage: fightsList.fighter1_takedownaverage,
                    fighter1_takedownaccuracy: fightsList.fighter1_takedownaccuracy,
                    fighter1_takedowndefense: fightsList.fighter1_takedowndefense,
                    fighter1_submissionsaverage: fightsList.fighter1_submissionsaverage,
                    fighter1_full_body_image: fightsList.fighter1_full_body_image,
                    fighter1_profile_image: fightsList.fighter1_profile_image,
                    fighter2_is_winner: fightsList.fighter2_is_winner,
                    fighter2_id: fightsList.fighter2_id,
                    fighter2_first_name: fightsList.fighter2_first_name,
                    fighter2_last_name: fightsList.fighter2_last_name,
                    fighter2_nick_name: fightsList.fighter2_nick_name,
                    fighter2_wins: fightsList.fighter2_wins,
                    fighter2_losses: fightsList.fighter2_losses,
                    fighter2_draws: fightsList.fighter2_draws,
                    fighter2reach: fightsList.fighter2reach,
                    fighter2height: fightsList.fighter2height,
                    fighter2weight: fightsList.fighter2weight,
                    fighter2_rank: fightsList.fighter2_rank,
                    fighter2_weight_class: fightsList.fighter2_weight_class,
                    fighter2_averagefighttime: fightsList.fighter2_averagefighttime,
                    fighter2_kdaverage: fightsList.fighter2_kdaverage,
                    fighter2_slpm: fightsList.fighter2_slpm,
                    fighter2_strikingaccuracy: fightsList.fighter2_strikingaccuracy,
                    fighter2_sapm: fightsList.fighter2_sapm,
                    fighter2_strikingdefense: fightsList.fighter2_strikingdefense,
                    fighter2_takedownaverage: fightsList.fighter2_takedownaverage,
                    fighter2_takedownaccuracy: fightsList.fighter2_takedownaccuracy,
                    fighter2_takedowndefense: fightsList.fighter2_takedowndefense,
                    fighter2_submissionsaverage: fightsList.fighter2_submissionsaverage,
                    fighter2_full_body_image: fightsList.fighter2_full_body_image,
                    fighter2_profile_image: fightsList.fighter2_profile_image,
                    fighter2_is_winner: fightsList.fighter2_is_winner,
                }).catch(function(error) {
                    console.log(error);
                })
            })
        })
    })
});