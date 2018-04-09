var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var EventSchema = new Schema({
    // `title` is of type String
    id: String,
    // `body` is of type String
    event_date: Date,
    base_title: String,
    title_tag_line: String,
    feature_image: String,
    secondary_feature_image: String,
    event_time_text: String,
    event_time_zone_text: String,
    subtitle: String,
    arena: String,
    location: String,
    main_event_fighter1_id: Number,
    main_event_fighter2_id: Number,



});

// This creates our model from the above schema, using mongoose's model method
var Event = mongoose.model("Event", EventSchema);

// Export the Note model
module.exports = Event;