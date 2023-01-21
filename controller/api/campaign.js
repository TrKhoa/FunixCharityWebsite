const express = require("express");
const dateFormat = require("dateformat");
const Campaign = require("../../model/Campaign");

//Gửi dữ liệu về Campaign cho Front
exports.getCampaigns = async (req, res) => {
    Campaign.find().sort([['endAt', -1]]).then((campaign) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(campaign));
        res.end();
    });
};
