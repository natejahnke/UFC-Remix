var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var FighterSchema = new Schema({
    // `title` is of type String
    id: String,
    // `body` is of type String
    first_name: String,
    last_name: String,
    nick_name: String,
    wins: Number,
    losses: Number,
    draws: Number,
    ko_wins: Number,
    submission_wins: Number,
    decision_wins: Number,
    rank: String,
    date_of_birth: Date,
    height: Number,
    weight: Number,
    weight_class: String,
    title_holder: Boolean,
    city_residing: String,
    state_residing: String,
    country_residing: String,
    thumbnail: String,
    belt_thumbnail: String,
    left_full_body_image: String,
    right_full_body_image: String,
    profile_image: String,
    link: String,


});

// This creates our model from the above schema, using mongoose's model method
var Fighter = mongoose.model("Fighter", FighterSchema);

// Export the Note model
module.exports = Fighter;