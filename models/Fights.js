var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var FightsSchema = new Schema({

    event_id: Number,
    fightcard_order: Number,
    fighter1_id: Number,
    fighter1_first_name: String,
    fighter1_last_name: String,
    fighter1_nick_name: String,
    fighter1_wins: Number,
    fighter1_losses: Number,
    fighter1_draws: Number,
    fighter1reach: Number,
    fighter1height: Number,
    fighter1weight: Number,
    fighter1_rank: String,
    fighter1_weight_class: String,
    fighter1_averagefighttime: String,
    fighter1_kdaverage: String,
    fighter1_slpm: String,
    fighter1_strikingaccuracy: String,
    fighter1_sapm: String,
    fighter1_strikingdefense: String,
    fighter1_takedownaverage: String,
    fighter1_takedownaccuracy: String,
    fighter1_takedowndefense: String,
    fighter1_submissionsaverage: String,
    fighter1_full_body_image: String,
    fighter1_profile_image: String,
    fighter1_is_winner: Boolean,
    fighter2_id: String,
    fighter2_first_name: String,
    fighter2_last_name: String,
    fighter2_nick_name: String,
    fighter2_wins: Number,
    fighter2_losses: Number,
    fighter2_draws: Number,
    fighter2reach: Number,
    fighter2height: Number,
    fighter2weight: Number,
    fighter2_rank: String,
    fighter2_weight_class: String,
    fighter2_averagefighttime: String,
    fighter2_kdaverage: String,
    fighter2_slpm: String,
    fighter2_strikingaccuracy: String,
    fighter2_sapm: String,
    fighter2_strikingdefense: String,
    fighter2_takedownaverage: String,
    fighter2_takedownaccuracy: String,
    fighter2_takedowndefense: String,
    fighter2_submissionsaverage: String,
    fighter2_full_body_image: String,
    fighter2_profile_image: String,
    fighter2_is_winner: Boolean,
});

// This creates our model from the above schema, using mongoose's model method
var Fights = mongoose.model("Fights", FightsSchema);

// Export the Note model
module.exports = Fights;