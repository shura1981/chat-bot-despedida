# ChatBot Despedida

[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Web.js-25D366.svg)](https://wwebjs.dev/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

Chat bot para enviar mensajes a los empleados de Nutramerican y confirmar su asistencia a eventos corporativos.

## Descripción

Este proyecto es una **aplicación híbrida** que funciona simultáneamente como:
- **Chatbot de WhatsApp**: Gestiona conversaciones automatizadas con empleados mediante flujos de respuesta personalizados.
- **API REST**: Permite el control programático del cliente de WhatsApp desde sistemas externos (envío de mensajes, archivos, verificación de números).

## Tecnologías Utilizadas

### Stack Principal
- **Node.js** - Entorno de ejecución JavaScript
- **Express** (v4.18.2) - Framework para la API REST
- **whatsapp-web.js** (v1.34.0) - Biblioteca para automatización de WhatsApp ([Documentación Oficial](https://docs.wwebjs.dev/))
- **MySQL2** (v2.2.4) - Cliente para bases de datos MySQL/MariaDB

### Dependencias Adicionales
- **dotenv** (v16.0.3) - Gestión de variables de entorno
- **cors** (v2.8.5) - Middleware para CORS
- **qrcode-terminal** (v0.12.0) - Generación de códigos QR en terminal
- **chalk** (v5.2.0) - Colores en consola
- **ora** (v6.1.2) - Spinners elegantes para CLI

### Desarrollo
- **nodemon** (v3.1.7) - Reinicio automático del servidor

## Arquitectura del Proyecto

```
┌─────────────────────┐
│     index.js        │  ← Entry Point
│  (Client + Server)  │
└──────────┬──────────┘
           │
     ┌─────┴─────┐
     │           │
┌────▼─────┐ ┌──▼────────┐
│WhatsApp  │ │ Express   │
│  Client  │ │   API     │
└────┬─────┘ └──┬────────┘
     │          │
┌────▼─────┐ ┌──▼────────┐
│events    │ │ router.js │
│client.js │ │           │
└────┬─────┘ └──┬────────┘
     │          │
     └────┬─────┘
          │
    ┌─────▼──────┐
    │ chatbots.js│
    │ (Bot Logic)│
    └─────┬──────┘
          │
    ┌─────▼──────────────┐
    │   Core Layer       │
    │ ┌────────────────┐ │
    │ │  Controllers   │ │
    │ │  Models        │ │
    │ │  Interfaces    │ │
    │ └────────────────┘ │
    └────────────────────┘
```

### Capas de la Aplicación

- **Entry Point** (`index.js`): Inicializa el cliente de WhatsApp con `LocalAuth` y el servidor Express.
- **Event Handler** (`eventsclient.js`): Maneja eventos del cliente (`qr`, `authenticated`, `ready`, `message`, etc.).
- **Bot Logic** (`chatbots.js`): Contiene el árbol de decisión de conversaciones (`flujoDeRespuesta`).
- **API Router** (`router.js`): Expone endpoints REST para control externo del bot.
- **Core Layer**:
  - **Controllers** (`core/controllers/`): Lógica de negocio.
  - **Models** (`core/models/`): Acceso a datos con SQL crudo.
  - **Interfaces** (`core/interfaces/`): Definiciones JSDoc y esquemas JSON.

## Comenzando

### Prerrequisitos

- **Node.js** (v14 o superior)
- **MySQL/MariaDB** (2 bases de datos: `campaigns` y `whatsapp`)
- **Google Chrome/Chromium** instalado (para Puppeteer)

### Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/shura1981/chat-bot-despedida.git
   cd chat-bot-despedida
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   
   Crea los archivos de configuración en `environments/`:
   
   - `.env.dev` (desarrollo)
   - `.env.prod` (producción)
   
   ```env
   # Base de datos
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_password
   DB_NAME_WHATSAPP=whatsapp
   DB_NAME_CAMPAIGNS=campaigns
   
   # Servidor
   PORT=3000
   
   # Chrome/Chromium
   DIRECTORYCROME=/usr/bin/google-chrome
   ```

4. **Configurar modo de ejecución**:
   
   Edita `state/index.js` para establecer el entorno:
   ```javascript
   module.exports = {
       prod: 'prod',  // o 'dev'
   };
   ```

5. **Importar esquemas de base de datos**:
   ```bash
   mysql -u root -p whatsapp < querys-sql/bd_whatsapp.sql
   mysql -u root -p campaigns < querys-sql/bd_campaigns.sql
   ```

### Ejecución

```bash
npm start
```

Al iniciar, el bot:
1. Mostrará un código QR en la terminal (primera vez).
2. Escanea el QR con WhatsApp para autenticarte.
3. La sesión se guardará en `sessions/` para futuros inicios.
4. El servidor API estará disponible en `http://localhost:3000`.

## Estructura del Proyecto

```
chat-bot-despedida/
├── core/                          # Capa de aplicación (MVC)
│   ├── controllers/               # Lógica de negocio
│   ├── models/                    # Modelos de datos (SQL)
│   ├── interfaces/                # JSDoc types & JSON schemas
│   └── http/                      # Utilidades HTTP
├── database/                      # Conexiones a BD
│   ├── connection.js              # Conexión base
│   ├── pool-connection-campaigns.js
│   └── pool-connection-whatsapp.js
├── environments/                  # Configuración de entorno
│   ├── .env.dev
│   ├── .env.prod
│   └── read_env.js
├── public/whatsapp/               # Archivos estáticos/media
├── sessions/                      # Sesiones de WhatsApp (no subir a Git)
├── local_modules/                 # Módulos locales/modificados
│   └── whatsapp-web.js/           # Fork local de la librería
├── .github/                       # Configuración de GitHub
│   ├── copilot-instructions.md    # Guía para GitHub Copilot
│   ├── agents/                    # Agentes personalizados
│   └── prompts/                   # Prompts reutilizables
├── index.js                       # Punto de entrada
├── eventsclient.js                # Manejador de eventos de WhatsApp
├── chatbots.js                    # Lógica del bot (flujos)
├── router.js                      # Endpoints de la API
└── package.json
```

## Características Principales

### Chatbot Automatizado
- ✅ Flujo de conversación personalizable (`flujoDeRespuesta`)
- ✅ Confirmación de asistencia a eventos
- ✅ Selección de puntos de encuentro
- ✅ Manejo de respuestas incorrectas
- ✅ Mensajes de seguimiento automáticos

### API REST
- ✅ Envío de mensajes de texto
- ✅ Envío de archivos multimedia (imágenes, videos, audios, documentos)
- ✅ Verificación de números registrados en WhatsApp
- ✅ Consulta de historial de chats
- ✅ Envío desde URLs externas

### Gestión de Datos
- ✅ Registro de mensajes en base de datos
- ✅ Tracking de respuestas de empleados
- ✅ Almacenamiento de puntos de encuentro
- ✅ Dos bases de datos separadas (campaings/whatsapp)

## Flujo de Trabajo de Desarrollo

### Inicio Rápido
```bash
npm start                  # Iniciar aplicación
npm run dev               # (si configuras nodemon)
```

### Convenciones de Código

#### Async/Await en Modelos
Los modelos usan un patrón específico de Promesas:
```javascript
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

#### SQL Parametrizado
Siempre usa parámetros para prevenir inyección SQL:
```javascript
await query('SELECT * FROM tb_employees WHERE id_empleado = ?', [id]);
```

#### JSDoc Obligatorio
Documenta todas las funciones:
```javascript
/**
 * Obtiene el tipo de archivo a partir de la extensión
 * @param {string} extensionFile - Extensión del archivo
 * @returns {string} Tipo de archivo
 */
const getExtension = (extensionFile) => { ... }
```

#### Type Hinting
Usa `@type` para tipado estático:
```javascript
/** @type {import('whatsapp-web.js').Message} */
const msg = await chat.fetchMessages();
```

## Endpoints de la API

### `GET /whatsapp/chats`
Obtiene mensajes de un chat específico.
```bash
curl "http://localhost:3000/whatsapp/chats?number=573001234567"
```

### `GET /whatsapp/checknumber`
Verifica si un número está registrado en WhatsApp.
```bash
curl "http://localhost:3000/whatsapp/checknumber?number=573001234567"
```

### `GET /whatsapp/file`
Envía un archivo desde `public/whatsapp/`.
```bash
curl "http://localhost:3000/whatsapp/file?to=573001234567&message=Hola&fileName=image.jpg"
```

### `GET /whatsapp/url`
Envía un archivo desde una URL.
```bash
curl "http://localhost:3000/whatsapp/url?to=573001234567&message=Mira esto&url=https://example.com/image.jpg"
```

## Estándares de Código

- **Nombres de Variables/Funciones**: `camelCase`
- **Nombres de Clases**: `PascalCase`
- **Constantes**: `UPPER_SNAKE_CASE`
- **Módulos**: CommonJS (`require`/`module.exports`)
- **Manejo de Errores**: `try/catch` obligatorio en operaciones async
- **SQL**: Queries crudas con parámetros (`?`)

## Testing

> ⚠️ **Nota**: Actualmente no hay suite de tests implementada.
> El script de test en `package.json` devuelve error por defecto.

Para implementar tests:
1. Instala un framework (`jest`, `mocha`)
2. Crea carpeta `tests/` o `__tests__/`
3. Sigue el patrón de Promesas usado en los modelos

## Contribuir

### Guía Rápida

1. **Fork** el proyecto
2. **Crea una rama** para tu funcionalidad:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. **Sigue los estándares de código** documentados en `.github/copilot-instructions.md`
4. **Documenta con JSDoc** todas las funciones nuevas
5. **Usa SQL parametrizado** en modelos
6. **Commit** con mensajes descriptivos
7. **Push** y abre un **Pull Request**

### Ejemplos de Código

Revisa estos archivos para entender los patrones:
- **Modelos**: `core/models/mensajeModel.js`
- **Controladores**: `core/controllers/chatController.js`
- **Bot Logic**: `chatbots.js` (función `flujoDeRespuesta`)
- **API Endpoints**: `router.js`

### Agente Experto de WhatsApp

Para trabajar con la librería `whatsapp-web.js`, utiliza el agente especializado en VS Code:
```
@whatsappjs-expert [tu pregunta sobre WhatsApp]
```

Este agente:
- Consulta la documentación oficial automáticamente
- Adapta soluciones a la arquitectura del proyecto
- Sigue las convenciones de código establecidas

## Licencia

ISC - © 2025 Steven Realpe

## Soporte

- **Documentación de whatsapp-web.js**: https://docs.wwebjs.dev/
- **Issues**: [GitHub Issues](https://github.com/shura1981/chat-bot-despedida/issues)
- **Autor**: Steven Realpe

---

**⚠️ Importante**: No subas la carpeta `sessions/` ni los archivos `.env.*` a Git. Ya están configurados en `.gitignore`.
