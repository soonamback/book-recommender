const User = require('../models/User');

exports.getAllUsers = async (req, res) =>
{
    try {
        const users = await User.find();

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        })
    } catch (err) {
        throw err
    }
 
}

