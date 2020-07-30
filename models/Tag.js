const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TagSchema = new Schema({
    name: String,
    description: String,
    nodes: [{
        type: Schema.Types.ObjectId,
        ref: "Node"
    }]
});

module.exports = mongoose.model('Tag', TagSchema);