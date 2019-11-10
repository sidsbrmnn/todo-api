const bcrypt = require('bcrypt');
const express = require('express');
const _ = require('lodash');

const router = express.Router();

const User = require('../models/user');

router.post('/', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    await user.hashPassword();
    await user.save();

    const token = user.generateAuthToken();

    res.send(token);
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send('Invalid username/password');

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword)
        return res.status(404).send('Invalid username/password');

    const token = user.generateAuthToken();

    res.send(token);
});

module.exports = router;
