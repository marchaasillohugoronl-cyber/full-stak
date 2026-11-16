
const Message = require('../models/messageModel');

class MessageService {
    constructor() {}

    // Obtener todos los mensajes
    async getAll() {
        const messages = await Message.find({}).sort({ _id: 1 }).lean();
        return messages.map((message) => ({
            ...message,
            username: message.username === 'Llama' ? 'IA' : message.username,
            messages: message.messages ?? message.message ?? ''
        }));
    }

    // Crear un nuevo mensaje
    async create(msg) {
        const message = new Message(msg);
        return await message.save();
    }
}

// Exportar la clase
module.exports = MessageService;
