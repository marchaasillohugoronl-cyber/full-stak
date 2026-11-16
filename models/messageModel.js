const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    username: { type: String, required: true },
    messages: { type: String, required: true },
    message: { type: String }
});

module.exports = mongoose.model('Message', messageSchema);
