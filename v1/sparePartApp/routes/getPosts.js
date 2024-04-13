const express = require("express");
const router = express.Router();
const { getPosts } = require("../controllers/getPosts");

router.post("/", getPosts);

module.exports = router;
