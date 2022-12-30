const express = require("express");
const dateFormat = require("dateformat");

const Campaign = require("../../model/Campaign");

exports.getCampaigns = async (req, res) => {
    /*
    const testCreate = new Campaign({
        name: "Góp bữa ăn sáng xây dựng kỹ năng “Vào Đời” cho 500 trẻ thanh thiếu niên mồ côi, khó khăn",
        image: "c5",
        desc: "",
        raise: 2700000,
        goal: 200000000,
        donator: [],
        startAt: "",
        endAt: ""
    });
    testCreate.save().then(e=>{
        console.log(e);
    })
    */

    Campaign.find().then((campaign) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(campaign));
        res.end();
    });
};
