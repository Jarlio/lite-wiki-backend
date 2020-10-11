const mongoose = require('mongoose');

const Schema = mongoose.Schema;
/* todo: method of delete references */
const TagSchema = new Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Tag', TagSchema);