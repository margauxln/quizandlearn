const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  //required true: n'est pas suffisant pour qu'il n'y ait pas d'autre email dans la base de données
  password: { type: String, required: true }
});

//grâce à ce plugin : solution à problème
userSchema.plugin(uniqueValidator);

//ce module s'appellera 'User'
module.exports = mongoose.model('User', userSchema);
