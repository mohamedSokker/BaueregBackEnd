const express = require("express");
const router = express.Router();
const {
  handleAdd,
} = require("../../../controllers/web/EqsToolsLocation/handleAdd");

router.post("/", handleAdd);

module.exports = router;
