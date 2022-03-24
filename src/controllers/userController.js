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

exports.getUser = async (req, res) =>
{
    try {
        const user = await User.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })
    } catch(err) {
        throw err
    }
}

exports.updateUser = async (req, res) =>
{
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })
    } catch (err) {
        throw err
    }
}

exports.deleteUser = async (req, res) =>
{
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch(err) {
        throw err
    }
}


