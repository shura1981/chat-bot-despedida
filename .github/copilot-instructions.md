# GitHub Copilot Instructions

## Architecture Overview

This project is a hybrid application acting as both a **WhatsApp Chatbot** and a **REST API**.

- **Entry Point**: `index.js` initializes the `whatsapp-web.js` client and the Express server.
- **WhatsApp Client**: Handles real-time messaging via `whatsapp-web.js`. Events are managed in `eventsclient.js` and logic in `chatbots.js`.
- **REST API**: `router.js` exposes endpoints to control the WhatsApp client programmatically (e.g., sending messages from external systems).
- **Core Layer**:
  - **Controllers** (`core/controllers/`): Business logic.
  - **Models** (`core/models/`): Data access layer using raw SQL with `mysql2`.
  - **Interfaces** (`core/interfaces/`): JSDoc definitions and JSON schemas.

## Critical Developer Workflows

- **Startup**: Run `npm start` to launch the application.
- **Authentication**: The app uses `LocalAuth` strategy. Session data is stored in the `sessions/` directory.
- **Environment**: Critical configuration (DB credentials, Chrome path) is loaded via `environments/read_env.js`. Ensure `.env` is configured.
- **Media Handling**: Media files for sending are often read from `public/whatsapp` or `mediaSend/`.

## Codebase Patterns & Conventions

### Asynchronous Models
Models typically wrap async database operations in a specific Promise pattern:
```javascript
// Pattern used in models
insertSomething(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await query('INSERT INTO ...', [data]);
            resolve(result.insertId);
        } catch (error) {
            reject(error);
        }
    });
}
```

### Database Access
- Use `database/connection.js` or pool connections (`pool-connection-*.js`).
- **Raw SQL**: Write raw SQL queries. Always use parameterized queries (`?`) to prevent SQL injection.
- **Multiple Databases**: The app connects to two databases (`campaigns` and `whatsapp`). Be mindful of which connection context is needed.

### WhatsApp Integration
- **Library**: `whatsapp-web.js` (v1.34.0).
- **Documentation**: Refer to [https://docs.wwebjs.dev/](https://docs.wwebjs.dev/).
- **Message Media**: Use `MessageMedia.fromFilePath` or `MessageMedia.fromUrl` for sending attachments.
- **Chat Logic**: `chatbots.js` contains the decision tree for the bot (e.g., `flujoDeRespuesta`).

### Documentation
- **JSDoc**: Mandatory for all functions and classes.
- **Type Hinting**: Use `@type` to cast objects to interfaces defined in `core/interfaces/`.

## External Dependencies
- **mysql2**: For database interactions.
- **express**: For the REST API.
- **whatsapp-web.js**: Core library for WhatsApp automation.
- **dotenv**: For environment variable management.

## Directory Structure
- `core/`: Application logic (MVC pattern).
- `database/`: DB connection logic.
- `local_modules/`: Local overrides or custom modules (e.g., `whatsapp-web.js` modifications).
- `public/`: Static assets and uploaded media.
- `sessions/`: WhatsApp session data (do not commit).
