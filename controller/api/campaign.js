const express = require("express");
const dateFormat = require("dateformat");

const Campaign = require("../../model/Campaign");

exports.getCampaigns = async (req, res) => {
    Campaign.find().then((campaign) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(campaign));
        res.end();
    });
};
