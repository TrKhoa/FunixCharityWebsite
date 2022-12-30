const express = require("express");
const campaignController = require("../../controller/api/campaign")
const router = express.Router();

router.get("/campaigns", campaignController.getCampaigns);

module.exports = router;
