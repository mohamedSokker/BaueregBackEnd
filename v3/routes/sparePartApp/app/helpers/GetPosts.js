const express = require("express");
const router = express.Router();
const {
  getPosts,
} = require("../../../../controllers/sparePartApp/app/helpers/GetPosts");

router.post("/", getPosts);

module.exports = router;
