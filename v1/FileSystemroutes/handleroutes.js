const express = require('express');
const router = express.Router();
const {createItem} = require('../FileSystemControllers/handleFunctions')
const {renameItem} = require('../FileSystemControllers/handleFunctions')
const {deleteItem} = require('../FileSystemControllers/handleFunctions')
const {uploadItems} = require('../FileSystemControllers/handleFunctions')

router.get('/CreateFolder', createItem);
router.get('/RenameFolder', renameItem);
router.get('/DeleteFolder', deleteItem);
router.post('/Upload', uploadItems);

module.exports = router