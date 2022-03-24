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
                    return next(new Error('Username or Password not present')) 
                }
    
                //CHECK IF USER EXISTS AND PASSWORD IS CORRECT
                const user = await User.findOne({email: email}).select('+password')    
               

                if(!user || ! await user.correctPassword(password, user.password)) 
                {
                    return next(new Error('Please sign up first', 401))
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

exports.updateRole = async (req, res, next) =>
{
    try {
        const { role, id } = req.body
    
        if(role && id) {
            if(role === "admin") {
                await User.findById(id)
                .then((user) => {
                    if(user.role !== "admin") {
                        user.role = role
                        user.save((err) => {
                            if(err) {
                                res.status(400).json({ message : 'An error occured', error: err.message})
                                process.exit(1);
                            }
                            res.status(201),json({ message: 'Update successful', user})
                        })
                    } else {
                        res.status(400).json({ message: 'User is already an Admin'})
                    }
                })
            } 
    } 
    } catch (error) {
        throw error
    }
          
}