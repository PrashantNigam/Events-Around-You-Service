const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = Schema({
    _id: Schema.Types.ObjectId,
    genreId: {type: String, required: true},
    name: String
})

module.exports = mongoose.model('Genre', genreSchema);