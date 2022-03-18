const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const quizSchema = mongoose.Schema({
    id_user_owner: mongoose.ObjectId,
    title: String,
    description: String,
    categories: Array,
    questions: Array,
    status: Number,
    ratings: Array,
    reportings: Array,
    },
    {
      timestamps: true
})

quizSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Quiz', quizSchema);