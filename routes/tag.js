var express = require('express');
var router = express.Router();
var tagController = require("./../controller/Tag");

/* CRUD */
router.post('/', tagController.create);
router.get('/:tagId', tagController.get);
router.put('/:tagId', tagController.edit);
router.delete('/:tagId', tagController.delete);

/* additional functionalities */
router.get('/all', tagController.getAll);

module.exports = router;
