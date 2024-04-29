const express = require("express");
const router = express.Router();
const {
  getTargetPosts,
} = require("../../../../controllers/sparePartApp/app/helpers/GetTargetPosts");

router.post("/", getTargetPosts);

module.exports = router;
