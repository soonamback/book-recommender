const User = require('../models/User');
const jwt = require('jsonwebtoken');


const signToken = id =>
{
  return jwt.sign({ id: id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
  });  
};

exports.signup = async (req, res, next) => 
{   
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm

        })
const token = signToken(newUser._id);

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
      } )}
    catch(err){
            throw err
        }}

        exports.login = async (req,res, next) =>
        {
            try {
                const email = req.body.email;
                const password = req.body.password
                //const { password, email } = req.body
    
                //CHECK IF EMAIL AND PASSWORD EXIST
    
                if(!email || !password) {
                    return next(new Error('please provide email and password')) 
                }
    
                //CHECK IF USER EXISTS AND PASSWORD IS CORRECT
                const user = await User.findOne({email: email}).select('+password')    
               

                if(!user || ! await user.correctPassword(password, user.password)) 
                {
                    return next(new Error('incorrect email or password', 401))
                }
                // IF EVERYTHING IS OK SEND TOKEN TO CLIENT
                const token = signToken(user._id);
                res.status(200).json({
                    status: 'success',
                    token
                })
            } catch(err) {
                throw err
            }
          
        }