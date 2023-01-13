const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Cấu trúc Collection
const Sessions = new Schema({
    session: {
        type: mongoose.Mixed,
    }   
});

module.exports = mongoose.model("Sessions", Sessions);
