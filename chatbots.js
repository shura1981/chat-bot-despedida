const { repplyMessage, getDate, getTime, pause, writeMessagesPoll, removeEmojis, sendNotification, responseButtons } = require("./utils");
const { List, Buttons, MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');
const ClientResponse = require('./core/interfaces/MessageClient.json');
const { MensajeModel } = require('./core/models/mensajeModel.js');
const chatController = require('./core/controllers/chatController');
const employeeController = require('./core/controllers/employeeController');
const { PuntosEncuentro } = require('./core/interfaces/puntoEncuentro.js');


const mensajeRespuestaIncorrecta = "Por favor ingresa el número que corresponda a tu respuesta.";

const messageQuestion = `
Hola 👋 *[nombre]* Nutramerican Pharma tiene el gusto de invitarte a la despedida de fin de año, por favor confirma tu asistencia escribiendo el número que corresponda con tu respuesta:

1️⃣ ¡Por supuesto que voy! no me lo pierdo por nada del mundo.

2️⃣ No puedo ir, pero gracias por la invitación.

Simplemente responde con el número correspondiente. ¡Espero tu respuesta! 💪⭐
`

const flujoDeRespuesta = {
    confirmacion: {
        mensaje: `
¡Super! 🥳 ahora elije la ruta más cercana de tu casa:

1️⃣ Rozo. Primer puente.
2️⃣ Troncal. Parqueadero parque de la caña.
3️⃣ Sameco. Tienda D1 Sameco, Cl. 70 #2N-30.
4️⃣ Terminal logístico. Elitenut. 
5️⃣ Palmira. Parque Bolivar.

Simplemente responde con el número correspondiente. ¡Espero tu respuesta! 💪⭐`,
        patron: "por favor confirma tu asistencia escribiendo el número que corresponda con tu respuesta:"
    },
    volverAInvitar: {
        mensaje: `
¿Enserio te vas a perder la despedida de fin de año? 😢, vamos anímate y confirma tu asistencia. Digita el número de tu respuesta:

1️⃣ ¡Si voy!.
2️⃣ lo siento pero no puedo ir, de nuevo gracias por la invitación.
`,
        patron: "por favor confirma tu asistencia escribiendo el número que corresponda con tu respuesta:"
    },
    negativo: {
        mensaje: `¡Qué pena! 😢 esperamos contar contigo para el próximo año.`,
        patron: `¿Enserio te vas a perder la despedida de fin de año?`
    },
    despedida: {
        mensaje: `Te esperamos a las 8:30 am en el punto de encuentro seleccionado, no olvides llevar tu traje de baño 🩲🩱🩳. El party será hasta las 6:30 pm`,
        patron: `¡Super! 🥳 ahora elije la ruta más cercana de tu casa:`
    }
}

/**
 * 
 * @param {ClientResponse} msg 
 */
const chatbot = async (msg, client) => {
    try {
        if (msg.body === 'video') {
            // Send a new message as a reply to the current one
            const text = '*Connection info* https://nutramerican.com';
            const media = MessageMedia.fromFilePath('./mediaSend/load.mp4');
            client.sendMessage(msg.from, media, { caption: text || null });


            //     client.sendMessage(msg.from, `
            //     *Connection info* https://nutramerican.com
            // `, { linkPreview: true });

        } else if (msg.body === '!ping') {
            // Send a new message to the same chat

            client.sendMessage(msg.from, 'pong https://nutramerican.com');

        }

        else if (msg.body === 'url') {
            // Send a new message to the same chat

            setTimeout(async () => {
                client.sendMessage(msg.from, 'https://nutramerican.com', { linkPreview: true });


                // var locationLink = '*Ubicación* \n https://www.google.com/maps/search/?api=1&query=' + 3.5282862186431885 + ',' + -76.27495574951172;
                // let locationLink = `*Ubicación* \nhttps://maps.google.com/maps?q=${3.5282862186431885},${-76.27495574951172}&z=17&hl=en`
                // const res = await client.sendMessage(msg.from, locationLink);
                // console.log('res', res);
            }, 5000);

        }
        else if (msg.body.startsWith('!sendto ')) {
            // Direct send a new message to specific id
            let number = msg.body.split(' ')[1];
            let messageIndex = msg.body.indexOf(number) + number.length;
            let message = msg.body.slice(messageIndex, msg.body.length);
            number = number.includes('@c.us') ? number : `${number}@c.us`;
            let chat = await msg.getChat();
            chat.sendSeen();
            client.sendMessage(number, message);

        } else if (msg.body.startsWith('!subject ')) {
            // Change the group subject
            let chat = await msg.getChat();
            if (chat.isGroup) {
                let newSubject = msg.body.slice(9);
                chat.setSubject(newSubject);
            } else {
                msg.reply('This command can only be used in a group!');
            }
        } else if (msg.body.startsWith('!echo ')) {
            // Replies with the same message
            msg.reply(msg.body.slice(6));
        } else if (msg.body.startsWith('!desc ')) {
            // Change the group description
            let chat = await msg.getChat();
            if (chat.isGroup) {
                let newDescription = msg.body.slice(6);
                chat.setDescription(newDescription);
            } else {
                msg.reply('This command can only be used in a group!');
            }
        } else if (msg.body === '!leave') {
            // Leave the group
            let chat = await msg.getChat();
            if (chat.isGroup) {
                chat.leave();
            } else {
                msg.reply('This command can only be used in a group!');
            }
        } else if (msg.body.startsWith('!join ')) {
            const inviteCode = msg.body.split(' ')[1];
            try {
                await client.acceptInvite(inviteCode);
                msg.reply('Joined the group!');
            } catch (e) {
                msg.reply('That invite code seems to be invalid.');
            }
        } else if (msg.body === '!groupinfo') {
            let chat = await msg.getChat();
            if (chat.isGroup) {
                msg.reply(`
                *Group Details*
                Name: ${chat.name}
                Description: ${chat.description}
                Created At: ${chat.createdAt.toString()}
                Created By: ${chat.owner.user}
                Participant count: ${chat.participants.length}
            `);
            } else {
                msg.reply('This command can only be used in a group!');
            }
        } else if (msg.body === '!chats') {
            const chats = await client.getChats();
            client.sendMessage(msg.from, `The bot has ${chats.length} chats open.`);
        } else if (msg.body === '!info') {
            let info = client.info;
            client.sendMessage(msg.from, `
            *Connection info*
            User name: ${info.pushname}
            My number: ${info.wid.user}
            Platform: ${info.platform}
        `);
        } else if (msg.body === '!mediainfo' && msg.hasMedia) {
            const attachmentData = await msg.downloadMedia();
            msg.reply(`
            *Media info*
            MimeType: ${attachmentData.mimetype}
            Filename: ${attachmentData.filename}
            Data (length): ${attachmentData.data.length}
        `);
        } else if (msg.body === '!quoteinfo' && msg.hasQuotedMsg) {
            const quotedMsg = await msg.getQuotedMessage();

            quotedMsg.reply(`
            ID: ${quotedMsg.id._serialized}
            Type: ${quotedMsg.type}
            Author: ${quotedMsg.author || quotedMsg.from}
            Timestamp: ${quotedMsg.timestamp}
            Has Media? ${quotedMsg.hasMedia}
        `);
        } else if (msg.body === '!resendmedia' && msg.hasQuotedMsg) {
            const quotedMsg = await msg.getQuotedMessage();
            if (quotedMsg.hasMedia) {
                const attachmentData = await quotedMsg.downloadMedia();
                client.sendMessage(msg.from, attachmentData, { caption: 'Here\'s your requested media.' });
            }
        } else if (msg.body === '!location') {
            let locationLink = `*Ubicación* \nhttps://maps.google.com/maps?q=${3.5282862186431885},${-76.27495574951172}&z=17&hl=en`
            msg.reply(locationLink);
        } else if (msg.location) {
            msg.reply(msg.location);
        } else if (msg.body.startsWith('!status ')) {
            const newStatus = msg.body.split(' ')[1];
            await client.setStatus(newStatus);
            msg.reply(`Status was updated to *${newStatus}*`);
        } else if (msg.body === '!mention') {
            const contact = await msg.getContact();
            const chat = await msg.getChat();
            chat.sendMessage(`Hi @${contact.number}!`, {
                mentions: [contact]
            });
        } else if (msg.body === '!delete') {
            if (msg.hasQuotedMsg) {
                const quotedMsg = await msg.getQuotedMessage();
                if (quotedMsg.fromMe) {
                    quotedMsg.delete(true);
                } else {
                    msg.reply('I can only delete my own messages');
                }
            }
        } else if (msg.body === '!pin') {
            const chat = await msg.getChat();
            await chat.pin();
        } else if (msg.body === '!archive') {
            const chat = await msg.getChat();
            await chat.archive();
        } else if (msg.body === '!mute') {
            const chat = await msg.getChat();
            // mute the chat for 20 seconds
            const unmuteDate = new Date();
            unmuteDate.setSeconds(unmuteDate.getSeconds() + 20);
            await chat.mute(unmuteDate);
        } else if (msg.body === '!typing') {
            const chat = await msg.getChat();
            // simulates typing in the chat
            chat.sendStateTyping();
        } else if (msg.body === '!recording') {
            const chat = await msg.getChat();
            // simulates recording audio in the chat
            chat.sendStateRecording();
        } else if (msg.body === '!clearstate') {
            const chat = await msg.getChat();
            // stops typing or recording in the chat
            chat.clearState();
        } else if (msg.body === '!jumpto') {
            if (msg.hasQuotedMsg) {
                const quotedMsg = await msg.getQuotedMessage();
                client.interface.openChatWindowAt(quotedMsg.id._serialized);
            }
        } else if (msg.body === '!buttons') {
            let button = new Buttons('Button body', [{ body: 'bt1' }, { body: 'bt2' }, { body: 'bt3' }], 'title', 'footer');
            client.sendMessage(msg.from, button);
        } else if (msg.body === '!list') {
            let sections = [{ title: 'Nutramerican', rows: [{ title: '🥰', description: 'Excelente' }, { title: '😍', description: 'Bueno' }, { title: '☺️', description: 'Adecuado' }, { title: '😢', description: 'Pobre' }] }];
            let list = new List('¿Deseas Calificar el servicio del mensajero?', 'Calificar', sections, 'Nutramerican', 'nutramerican.com');
            client.sendMessage(msg.from, list);
        } else if (msg.body === '!reaction') {
            msg.react('👍');
        }

    } catch (error) {
        console.log(error.message);
    }

}
/**
 * @return {string} filePath | null
 * @param {ClientResponse} msg 
 */
const saveMedia = async (msg) => {
    try {
        if (msg.hasMedia) {
            try {
                // Descarga el medio
                const media = await msg.downloadMedia();
                if (media) {
                    // Define una ruta de almacenamiento
                    const mediaPath = path.join('public', 'whatsapp', 'uploads');

                    if (!fs.existsSync(mediaPath)) {
                        fs.mkdirSync(mediaPath, { recursive: true });
                    }

                    // Determina la extensión según el mimetype
                    let extension = media.mimetype.split('/')[1];

                    // Ajusta la extensión para audios
                    if (media.mimetype.startsWith('audio/')) {
                        extension = 'ogg'; // Normalizamos a 'ogg'
                    }

                    // Ajusta la extensión para stickers
                    const isSticker = media.mimetype === 'image/webp';
                    const fileName = `${new Date().getTime()}.${isSticker ? 'webp' : extension}`;
                    const filePath = path.join(mediaPath, fileName);

                    // Guarda el archivo en el sistema
                    fs.writeFileSync(filePath, media.data, { encoding: 'base64' });

                    return filePath.split("public\\")[1];
                }
            } catch (error) {
                console.error('Error al descargar el medio:', error);
            }
        }
    } catch (error) {
        console.error('Error general:', error.message);
    }
    return null;
};

/**
 * 
 * @param {ClientResponse} msg 
 */
const chatbotWhatsapp = async (msg) => {
    try {
        const { from, body } = msg;

        // 1. guardar el mensaje en la base de datos
        const filePath = await saveMedia(msg);
        chatController.insertChat(msg, filePath);
        const employeer = await employeeController.findEmployee(from.replace('@c.us', ''));
        if (employeer == null) return; //si el número no está registrado en la base de datos de la campaña no se procesa


        // 2. determinar la respuesta del chatbot
        const lastMessage = await chatController.obtenerUltimoChat(from.replace('@c.us', ''));//verificar si el número ya ha sido contactado con el mensaje de la campaña

        if (!lastMessage) {
            return;
        }

        const messageModel = new MensajeModel();
        // validar si body se puede convertir a número
        const isNumber = !isNaN(body);
        // Crear una expresión regular para buscar la parte del texto
        const regexPrimerFlujo = new RegExp(flujoDeRespuesta.confirmacion.patron, "i");
        const regexSegundoFlujo = new RegExp(flujoDeRespuesta.volverAInvitar.patron, "i");
        const regexTercerFlujo = new RegExp(flujoDeRespuesta.negativo.patron, "i");
        const regexCuartoFlujo = new RegExp(flujoDeRespuesta.despedida.patron, "i");

        if (regexPrimerFlujo.test(lastMessage)) {

            if (!isNumber) {
                repplyMessage(msg, `Te escribimos de nutramerican, queremos que confirmes tu asistencia a la fiesta de despedida de este año. ${mensajeRespuestaIncorrecta}`);
                return;
            }

            if (body == 1) {
                await chatController.insertChatReply(msg, flujoDeRespuesta.confirmacion.mensaje);
                await messageModel.updateMensaje({ respuesta: 1, id_employee: employeer.id_empleado });
                repplyMessage(msg, flujoDeRespuesta.confirmacion.mensaje);
            } else if (body == 2) {
                await chatController.insertChatReply(msg, flujoDeRespuesta.volverAInvitar.mensaje);
                await messageModel.updateMensaje({ respuesta: 2, id_employee: employeer.id_empleado });
                repplyMessage(msg, flujoDeRespuesta.volverAInvitar.mensaje);
            }

            return;
        }

        if (regexSegundoFlujo.test(lastMessage)) {

            if (!isNumber) {
                repplyMessage(msg, mensajeRespuestaIncorrecta);
                return;
            }

            if (body == 1) {
                await chatController.insertChatReply(msg, flujoDeRespuesta.confirmacion.mensaje);
                await messageModel.updateMensaje({ respuesta: 1, id_employee: employeer.id_empleado });
                repplyMessage(msg, flujoDeRespuesta.confirmacion.mensaje);
            } else if (body == 2) {
                await chatController.insertChatReply(msg, flujoDeRespuesta.negativo.mensaje);
                repplyMessage(msg, flujoDeRespuesta.negativo.mensaje);
            }

            return;
        }

        if (regexTercerFlujo.test(lastMessage)) {

            if (!isNumber) {
                repplyMessage(msg, mensajeRespuestaIncorrecta);
                return;
            }

            if (body == 1) {
                await chatController.insertChatReply(msg, flujoDeRespuesta.confirmacion.mensaje);
                await messageModel.updateMensaje({ respuesta: 1, id_employee: employeer.id_empleado });
                repplyMessage(msg, flujoDeRespuesta.confirmacion.mensaje);
            } else if (body == 2) {
                await chatController.insertChatReply(msg, flujoDeRespuesta.negativo.mensaje);
                repplyMessage(msg, flujoDeRespuesta.negativo.mensaje);
            }

            return;
        }

        if (regexCuartoFlujo.test(lastMessage)) {

            if (!isNumber) {
                repplyMessage(msg, mensajeRespuestaIncorrecta);
                return;
            }
            // guardar en lugar de recogida
            await chatController.insertChatReply(msg, flujoDeRespuesta.despedida.mensaje);

            await messageModel.saveMeetingPlace({ id_employee: employeer.id_empleado, punto_encuentro: PuntosEncuentro.get(parseInt(body)) });

            repplyMessage(msg, flujoDeRespuesta.despedida.mensaje);
            return;
        }


    } catch (error) {
        console.log(error.message);
    }
}




module.exports = {
    chatbotWhatsapp, chatbot
}