# Chat con IA

Aplicación de práctica con Node.js, Express, EJS, Socket.IO y MongoDB. Los mensajes se guardan en MongoDB y la aplicación usa Gemini para generar respuestas de IA.

## Requisitos

- Node.js 22.6 o posterior.
- MongoDB ejecutándose en `localhost:27017`.
- Una clave de Gemini API creada en Google AI Studio.

## Instalación y ejecución

```powershell
npm install
Copy-Item .env.example .env
```

Edita `.env` y reemplaza el valor de ejemplo por tu clave:

```text
GEMINI_API_KEY=tu_clave_de_api
```

Inicia el servidor:

```powershell
npm run dev
```

Abre <http://localhost:3000> en el navegador.

## Configuración

- La base de datos configurada está en `localhost:27017`, con nombre `mydb01`.
- El modelo Gemini configurado en `socket.js` es `gemini-3.5-flash-lite`.
- El nivel gratuito de Gemini tiene límites de uso que pueden cambiar.
- `.env` contiene credenciales locales y está excluido del repositorio. Nunca publiques tu clave de API.
