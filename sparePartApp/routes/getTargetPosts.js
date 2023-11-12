const express = require("express");
const router = express.Router();
const { getTargetPosts } = require("../controllers/getTargetPosts");

router.post("/", getTargetPosts);

module.exports = router;
