const User = require('../models/Users');

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const saved = await user.save();
        res.status(201).json(saved)
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}