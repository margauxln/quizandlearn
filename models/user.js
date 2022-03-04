const mongoose = require('mongoose');
// import Contact from './contact';
// import Completion from './completion';
// import Quiz from './quiz';
// import Rating from './rating';
// import Reporting from './reporting';

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  //required true: n'est pas suffisant pour qu'il n'y ait pas d'autre email dans la base de données
  password: { type: String, required: true },
  // photo: String,
  // contacts: [Contact],
  // roles: {
  //   type: String,
  //   enum : ['user','admin'],
  //   default: 'user'
  // },
  // subscription_date: { type : Date, default: Date.now },
  // favorite_quizzes: [Quiz],
  // created_quizzes: [Quiz],
  // completions: [Completion],
  // ratings:[Rating],
  // reportings:[Reporting],
}); 

//grâce à ce plugin : solution à problème
userSchema.plugin(uniqueValidator);

//ce module s'appellera 'User'
module.exports = mongoose.model('User', userSchema);
