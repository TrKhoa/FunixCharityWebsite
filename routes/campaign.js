const express = require("express");
const campaignController = require("../controller/campaign")
const router = express.Router();

router.get("/campaigns", campaignController.getCampaigns);

module.exports = router;
