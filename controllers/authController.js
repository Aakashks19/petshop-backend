const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const user = new User({
            name, email, password: hashedPassword, phone, address
        });

        await user.save();

        // Remove password from response
        const userObj = user.toObject();
        delete userObj.password;

        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

        res.status(201).send({ user: userObj, token });
    } catch (e) {
        res.status(400).send({ message: 'Registration failed', error: e.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Support login by email OR name (username)
        const user = await User.findOne({ 
            $or: [{ email: email }, { name: email }] 
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ error: 'Invalid login credentials' });
        }

        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
        
        // Remove password from response
        const userObj = user.toObject();
        delete userObj.password;

        res.send({ user: userObj, token });
    } catch (e) {
        res.status(400).send({ message: 'Login failed', error: e.message });
    }
};

exports.getProfile = async (req, res) => {
    res.send(req.user);
};

exports.updateProfile = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'phone', 'address'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
};
