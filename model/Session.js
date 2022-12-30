const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Sessions = new Schema({
    session: {
        type: mongoose.Mixed,
    }   
});

module.exports = mongoose.model("Sessions", Sessions);
