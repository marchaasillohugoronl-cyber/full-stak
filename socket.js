const MessageService = require('./services/messageService');

const messageService = new MessageService();
const GEMINI_MODEL = 'gemini-3.5-flash-lite';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

module.exports = (io) => {
    let pendingBotResponses = 0;

    io.on('connection', async (socket) => {
        console.log('Nuevo usuario conectado:', socket.id);

        try {
            const messages = await messageService.getAll();
            socket.emit('all-messages', messages);
        } catch (error) {
            console.error('Error al cargar mensajes:', error.message);
            socket.emit('chat-error', 'No se pudo cargar el historial');
        }

        socket.on('writing', (username) => {
            socket.broadcast.emit('writing', username);
        });

        socket.on('new-message', async (data) => {
            let waitingForBot = false;

            try {
                const username = String(data?.username || 'Anonimo').trim().slice(0, 40);
                const text = String(data?.messages || '').trim().slice(0, 2000);
                if (!text) return;

                await messageService.create({ username, messages: text });
                const messages = await messageService.getAll();
                io.emit('all-messages', messages);

                const contents = messages.slice(-20).map((message) => ({
                    role: ['IA', 'Llama'].includes(message.username) ? 'model' : 'user',
                    parts: [{ text: message.messages }]
                }));

                const apiKey = process.env.GEMINI_API_KEY;
                if (!apiKey) {
                    throw new Error('Falta configurar la variable GEMINI_API_KEY');
                }

                pendingBotResponses += 1;
                waitingForBot = true;
                io.emit('bot-writing', true);

                const response = await fetch(GEMINI_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-goog-api-key': apiKey
                    },
                    body: JSON.stringify({
                        systemInstruction: {
                            parts: [{
                                text: 'Eres un asistente amable. Responde en español y de forma clara.'
                            }]
                        },
                        contents,
                        generationConfig: { maxOutputTokens: 500 }
                    })
                });

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.error?.message || `Gemini respondio con estado ${response.status}`);
                }

                const answer = result.candidates?.[0]?.content?.parts
                    ?.map((part) => part.text || '')
                    .join('')
                    .trim();

                if (!answer) {
                    throw new Error('Gemini devolvio una respuesta vacia');
                }

                await messageService.create({ username: 'IA', messages: answer });
                const updatedMessages = await messageService.getAll();
                io.emit('all-messages', updatedMessages);
            } catch (error) {
                console.error('Error en el chat:', error.message);
                socket.emit('chat-error', error.message);
            } finally {
                if (waitingForBot) {
                    pendingBotResponses -= 1;
                    io.emit('bot-writing', pendingBotResponses > 0);
                }
            }
        });
    });
};
