var express = require('express');
var router = express.Router();
var nodeController = require("./../controller/Node");

/* CRUD */
router.post('/', nodeController.create);
router.get('/id/:nodeId', nodeController.get);
router.put('/id/:nodeId', nodeController.edit);
router.delete('/id/:nodeId', nodeController.delete);

/* additional functionalities */
router.get('/all', nodeController.getAll);
router.get('/all/titleAndId', nodeController.getAllTitlesAndId);
router.get('/byTag/:tagId', nodeController.getByTag);

/* add a tag to node */
router.post('/addTagToNode/:nodeId/:tagId', nodeController.addTagToNode);

/* content */
router.patch('/content/:nodeId', nodeController.contentEdit);

module.exports = router;
