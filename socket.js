const OLLAMA_URL = 'http://localhost:11434/api/chat';
const MODEL = 'llama3.2';

module.exports = (io) => {
    const messages = [];

    io.on('connection', (socket) => {
        console.log('Un nuevo usuario se conectó:', socket.id);
        socket.emit('all-messages', messages);

        socket.on('writing', (username) => {
            socket.broadcast.emit('writing', username);
        });

        socket.on('new-message', async (data) => {
            const username = String(data?.username || 'Anónimo').trim().slice(0, 40);
            const text = String(data?.messages || '').trim().slice(0, 2000);

            if (!text) return;

            const userMessage = { username, messages: text };
            messages.push(userMessage);
            io.emit('all-messages', messages);

            try {
                const conversation = messages.slice(-20).map((message) => ({
                    role: message.username === 'Llama' ? 'assistant' : 'user',
                    content: message.messages
                }));

                const response = await fetch(OLLAMA_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: MODEL,
                        stream: false,
                        messages: [
                            {
                                role: 'system',
                                content: 'Eres un asistente amable. Responde en español y de forma clara.'
                            },
                            ...conversation
                        ]
                    })
                });

                if (!response.ok) {
                    throw new Error(`Ollama respondió con estado ${response.status}`);
                }

                const result = await response.json();
                const answer = result.message?.content?.trim();

                if (!answer) throw new Error('Ollama devolvió una respuesta vacía');

                messages.push({ username: 'Llama', messages: answer });
                io.emit('all-messages', messages);
            } catch (error) {
                console.error('No se pudo obtener respuesta de Ollama:', error.message);
            }
        });
    });
};
