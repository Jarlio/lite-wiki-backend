var express = require('express');
var router = express.Router();
var tagController = require("./../controller/Tag");

/* CRUD */
router.post('/', tagController.create);
router.get('/id/:tagId', tagController.get);
router.put('/id/:tagId', tagController.edit);
router.delete('/id/:tagId', tagController.delete);

/* additional functionalities */
router.get('/all', tagController.getAll);

module.exports = router;
