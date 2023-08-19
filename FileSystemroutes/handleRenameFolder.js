const express = require('express');
const router = express.Router();
const {renameItem} = require('../FileSystemControllers/handleFunctions')

router.get('/', renameItem);

module.exports = router