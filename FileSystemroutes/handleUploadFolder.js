const express = require('express');
const router = express.Router();

const {uploadItems} = require('../FileSystemControllers/handleFunctions')

router.post('/', uploadItems);

module.exports = router