const User = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    async register(data) {
        const passwordHash = await bcrypt.hash(data.password, 10);
        const userAuth = new User({
            email: data.email,
            password: passwordHash
        });
        return await userAuth.save();
    }

    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
}

module.exports = AuthService;
