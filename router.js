const express = require('express');
const router = express.Router();
const { chatbot_Prueba4 } = require("./chatbots");
const { List, Buttons, MessageMedia } = require('whatsapp-web.js');
const { getName, pause } = require("./utils.js");
const fs = require('fs');
const path = require('path');
let optionsResponse = 0;
const { Chat, ChatModel } = require('./core/models/chatModel.js');
const ResponseClientFile = require("./core/interfaces/ResponseClientFile.json");
const { EmployeeModel } = require('./core/models/employeeModel.js');
const { MensajeModel } = require('./core/models/mensajeModel.js');

module.exports = (client) => {

    router.get('/chats', async (req, res) => {
        try {
            const { number } = req.query;
            const resWs = await client.getChats();
            let mensajes = await resWs.find(r => r.id.user == number).fetchMessages();
            res.status(200).send(mensajes.reverse());
        } catch (error) {
            res.status(500).send({ message: 'ocurrió un error en el servidor', error: error.message });
        }
    })
    //check number
    router.get('/checknumber', async (req, res) => {
        try {
            const { number } = req.query;
            const resWs = await client.isRegisteredUser(number)
            res.status(200).send({ exists: resWs });
        } catch (error) {
            res.status(500).send({ message: 'ocurrió un error en el servidor', error: error.message });
        }
    })
    // nombres de archivos para /file
    router.get('/filesname', async (req, res) => {
        try {
            const directoryWhatsapp = path.join(__dirname, 'public', 'whatsapp');
            const files = await fs.promises.readdir(directoryWhatsapp);
            res.status(200).send({ files });
        } catch (error) {
            res.status(500).send({ message: 'ocurrió un error en el servidor', error: error.message });
        }
    });

    router.get('/file', async (req, res) => {
        try {
            const { to, message, fileName } = req.query;
            const valid = await client.isRegisteredUser(to);
            if (!valid) {
                res.status(404).send({ message: 'El número de celular no se encuentra disponible' });
                return;
            }
            const number = `${to}@c.us`;
            // obtener directorio raiz más public/whatsapp
            const directoryWhatsapp = path.join(__dirname, 'public', 'whatsapp');
            const media = MessageMedia.fromFilePath(`${directoryWhatsapp}/${fileName}`);
            /**@type ResponseClientFile */
            const response = await client.sendMessage(number, media, { caption: message.replace(/\\n/g, '\n') || null });
            let { from } = response;
            from = from.replace('@c.us', '');
            /**@type Chat */
            const chat = {
                desde: from,
                para: to,
                mensaje: message,
                tipo: ChatModel.optionsType.BOTH,
                dispositivo: 'api-rest',
                name: from,
                content_type: ChatModel.optionsContentType.IMAGE,
                url: directoryWhatsapp.split("public\\").pop() + '/' + fileName,
                port: process.env.PORT
            }

            const idInsert = await new ChatModel().insertChat(chat);
            const employee = await new EmployeeModel().obtenerEmpleado(to);
            if (employee) {
                const idEmployee = employee.id_empleado;
                new MensajeModel().insertMensaje(idEmployee, 1);
            }


            res.status(200).send({ msg: `envidado a ${to}`, payload: response, idInsert });

        } catch (error) {
            res.status(500).send({ message: 'ocurrió un error en el servidor', error: error.message });
        }
    });

    router.get('/url', async (req, res) => {
        try {
            const { to, message, url } = req.query;
            // const valid = await client.isRegisteredUser(to);
            // if (valid) {
            const number = `${to}@c.us`;
            const media = await MessageMedia.fromUrl(url);
            const r = await client.sendMessage(number, media, { caption: message.replace(/\\n/g, '\n') || null });
            res.status(200).send({ msg: `envidado a ${to}`, payload: r });
            // } else res.status(404).send({ message: 'El número de celular no se encuentra disponible' });
        } catch (error) {
            res.status(500).send({ message: 'ocurrió un error en el servidor', error: error.message });
        }
    });

    router.get('/message', async (req, res) => {
        try {
            const { to, message } = req.query;
            // const valid = await client.isRegisteredUser(to);
            // if (valid) {
            const number = `${to}@c.us`;
            /**@type ResponseClientFile */
            const resWs = await client.sendMessage(number, message.replace(/\\n/g, '\n'), { linkPreview: true });
            let { from } = resWs;
            from = from.replace('@c.us', '');
            /**@type Chat */
            const chat = {
                desde: from,
                para: to,
                mensaje: message,
                tipo: ChatModel.optionsType.BOTH,
                dispositivo: 'api-rest',
                name: from,
                content_type: ChatModel.optionsContentType.IMAGE,
                url: null,
                port: process.env.PORT
            }

            const idInsert = await new ChatModel().insertChat(chat);
            res.status(200).send({ msg: `envidado a ${to}`, payload: resWs, idInsert });
            // } else res.status(404).send({ message: 'El número de celular no se encuentra disponible' });
        } catch (error) {
            res.status(500).send({ message: 'ocurrió un error en el servidor', error: error.message });
        }
    });

    return router;
}