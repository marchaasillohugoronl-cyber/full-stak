const User = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    async register(data) {
        const passwordHash = await bcrypt.hash(data.password, 10);
        const user = new User({
            email: data.email,
            password: passwordHash
        });
        return await user.save();
    }
//busca al usuario compara la contrasña con su hash
    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('Invalid credentials');
            error.status = 401;
            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Invalid credentials');
            error.status = 401;
            throw error;
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET no está configurado');
        }
//duracion de del tokens 
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '10s' }
        );
        return token;
    }
}

module.exports = AuthService;
