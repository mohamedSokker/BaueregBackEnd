const express = require('express');
const router = express.Router();

const {deleteItem} = require('../FileSystemControllers/handleFunctions')

router.get('/', deleteItem);

module.exports = router