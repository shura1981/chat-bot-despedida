const query = require('../../database/pool-connection-whatsapp.js');
const Chat = require('../interfaces/chat.js');
const Result = require('../interfaces/resultMySlq.js');



class ChatModel {

    static optionsContentType = {
        TEXT: 'TEXT',
        IMAGE: 'IMAGE',
        AUDIO: 'AUDIO',
        VIDEO: 'VIDEO',
        PDF: 'PDF',
        EXCEL: 'EXCEL',
        WORD: 'WORD',
        FILE: 'FILE'
    }

    static optionsType = {
        TEXT: 'TEXT',
        MEDIA: 'MEDIA',
        BOTH: 'BOTH'
    }

    /**
     * 
     * @param {Chat} chat 
     * @returns {Promise<number>} el id del chat insertado
     */
    insertChat(chat) {
        return new Promise(async (resolve, reject) => {
            try {
                /** @type{Result} */
                const result = await query(`
                    INSERT INTO tb_chats SET tipo=?,mensaje=?,url=?,desde=?,para=?,content_type=?,dispositivo=?, name=?`, [chat.tipo, chat.mensaje, chat.url, chat.desde, chat.para, chat.content_type, chat.dispositivo, chat.name]);
                resolve(result.insertId);
            } catch (error) {
                reject(error);
            }
        });

    }

    obtenerUltimoChat(numeroContacto) {
        return new Promise(async (resolve, reject) => {
            try {
                const [firsRow] = await query(`
                    SELECT mensaje FROM tb_chats WHERE para=?  ORDER BY id DESC LIMIT 1`, [numeroContacto]);
                resolve(firsRow ? firsRow.mensaje : null);
            } catch (error) {
                reject(error);
            }
        });
    }


}


module.exports = { Chat, ChatModel };

 