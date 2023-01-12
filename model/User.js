const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        defaultValue: null,
    },
    image: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: 0,
    },
    donate: [{
        campaign: {
            type: Schema.Types.ObjectId,
            ref: "Campaign",
        },
        cash: {
            type: Number,
        },
        date: {
            type: Date,
        },
    }],
});

module.exports = mongoose.model('User', User)