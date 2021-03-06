const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
     name: {
         type: String,
         required: [true, 'Please tell us your Name']
     },
     email: {
         type: String,
         required: [true, 'Please tell us your email'],
         unique: true,
         lowercase: true,
         validate: [validator.isEmail, 'Please provide a valid email']
     },
     photo: String,
     password: {
         type: String,
         required: [true, 'Please provide a password'],
         minlength: 8,
         select: false
     },
     passwordConfirm: {
         type: String,
         required: [true, 'Please confirm your passwort'],
         validate: {
             validator: function(el) {
                 return el === this.password;
             },
             message: 'passwords are not identical'
         }
     },
     role: {
         type: String,
         default: "User",
         required: [true, 'Please select your Role']
     }

 });
//MONGOOSE MIDDLEWARE
 userSchema.pre('save', async function(next) 
 {
     if(!this.isModified('password')) return next();

     this.password = await bcrypt.hash(this.password, 12)
     this.passwordConfirm = undefined;
     next();
 });

 userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
 }

 const User = mongoose.model('User', userSchema);

 module.exports = User;
