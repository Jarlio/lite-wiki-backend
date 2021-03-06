const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NodeSchema = new Schema({
    title: String,
    content: Object,
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Node"
    },
    childrenNodes: [{
        type: Schema.Types.ObjectId,
        ref: "Node"
    }], //id of children nodes
    tags: [{
        type: Schema.Types.ObjectId,
        ref: "Tag"
    }]
});

module.exports = mongoose.model('Node', NodeSchema);