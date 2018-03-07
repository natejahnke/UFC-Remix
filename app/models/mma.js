// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Chirp" model that matches up with DB
var Fighters = sequelize.define("fighters", {
    author: {
        type: Sequelize.STRING
    },
    body: {
        type: Sequelize.STRING
    },
    created_at: {
        type: Sequelize.DATE
    }
}, {
    timestamps: false
});

// Syncs with DB
Fighters.sync();

// Makes the Chirp Model available for other files (will also create a table)
module.exports = Fighters;