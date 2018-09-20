const mongoose = require('mongoose');
const Genre = require('../models/genre').schema
const Schema = mongoose.Schema

const classificationSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, required: true},
    genres: [Genre]
})

module.exports = mongoose.model('Classification', classificationSchema);