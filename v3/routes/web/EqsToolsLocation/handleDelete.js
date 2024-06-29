const express = require("express");
const router = express.Router();
const {
  handleDelete,
} = require("../../../controllers/web/EqsToolsLocation/handleDelete");

router.post("/", handleDelete);

module.exports = router;
