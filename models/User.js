const mongoose = require('mongoose');
const { Schema }   = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  surname: String,
  zip: Number,
  description: String,
  genre: {type: Number, enum: [0, 1, 2]},
  role: {type: String, enum: ['SOY ALUMNO', 'SOY PROFE', 'ADMON']},
  subjects: {type: String, default: 'Subject + nivel'},
  events: Array, //Array de Objetoeventos que aun no hay creados
  school: String, //CON EL JSON 
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
