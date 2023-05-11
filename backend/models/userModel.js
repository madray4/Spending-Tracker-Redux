const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.statics.signup = async function(email, password){

  // validation
  if(!email || !password) throw Error('All fields must be filled');
  if(!validator.isEmail(email)) throw Error('Email is not valid');
  if(!validator.isStrongPassword(password)) throw Error('Password is not strong enough');

  const exists = await this.findOne({ email });
  if (exists) throw Error('Email already in use');

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({email, password: hash});
  return user;
};

userSchema.statics.login = async function(email, password){
  // validate there's an email and password
  if(!email || !password) throw Error('All fields must be filled');

  // find if email exists as an account
  const user = await this.findOne({ email });
  if(!user) throw Error('Invalid Credentials');

  // validate password
  const match = await bcrypt.compare(password, user.password);
  if(!match) throw Error('Inavlid Credentials');
  return user;
}

module.exports = mongoose.model('User', userSchema);