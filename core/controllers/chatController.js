const ClientResponse = require('../interfaces/MessageClient.json');
const { Chat, ChatModel } = require('../models/chatModel.js');
const port = Number(process.env.PORT || 3000);


const chatController = {};

/**
 * Obtiene el tipo de archivo a partir de la extensión
 * @param {string} extensionFile  extension del archivo
 * @returns {string} tipo de archivo
 */
const getExtension = (extensionFile) => {
    // Mapeo de extensiones a tipos
    const extensionMap = {
        // Archivos generales
        'txt': 'TEXT',
        'json': 'TEXT',
        'csv': 'TEXT',
        // Imágenes
        'jpg': 'IMAGE',
        'jpeg': 'IMAGE',
        'png': 'IMAGE',
        'gif': 'IMAGE',
        'bmp': 'IMAGE',
        'webp': 'IMAGE',
        'svg': 'IMAGE',
        // Audios
        'mp3': 'AUDIO',
        'wav': 'AUDIO',
        'ogg': 'AUDIO',
        'm4a': 'AUDIO',
        // Videos
        'mp4': 'VIDEO',
        'mkv': 'VIDEO',
        'avi': 'VIDEO',
        'mov': 'VIDEO',
        'webm': 'VIDEO',
        // Documentos
        'pdf': 'PDF',
        'xls': 'EXCEL',
        'xlsx': 'EXCEL',
        'doc': 'WORD',
        'docx': 'WORD',
        // Archivos generales
        'zip': 'FILE',
        'rar': 'FILE',
        '7z': 'FILE',
    };

    // Devolver el tipo de extensión o 'FILE' por defecto
    return extensionMap[extensionFile.toLowerCase()] || 'FILE';
};
/**
 * Obtiene la url y el tipo de contenido a partir del archivo
 * @param {string} filePath 
 * @returns {{url:string,content_type:string}} 
 */
const getUrlAndContentType = (filePath) => {

    if (!filePath) {
        return {
            url: null,
            content_type: ChatModel.optionsContentType.TEXT
        }
    }

    const extension = filePath.split("\.").pop();

    return {
        url: filePath,
        content_type: getExtension(extension)
    }



};

/**
 * 
 * @param {ClientResponse} msg 
 *  @param {string} filePath
 */
chatController.insertChat = async (msg, filePath) => {

    const { _data, from, to, deviceType, hasMedia } = msg;

    /**@type Chat */
    const chat = {
        desde: from.replace('@c.us', ''),
        para: to.replace('@c.us', ''),
        mensaje: msg.body,
        tipo: filePath ? ChatModel.optionsType.MEDIA : ChatModel.optionsType.TEXT,
        dispositivo: deviceType,
        name: _data.notifyName,
        content_type: ChatModel.optionsContentType.TEXT,
        url: null,
        port
    }

    if (filePath) {
        const { url, content_type } = getUrlAndContentType(filePath);
        chat.url = url;
        chat.content_type = content_type;
    }

    if (hasMedia && msg.body) {
        chat.tipo = ChatModel.optionsType.BOTH;
    }

    const idInsert = await new ChatModel().insertChat(chat);
    console.log('chat insertado con id:', idInsert);
}


/**
 * guarda la respuesta de un chat
 * @param {ClientResponse} msg 
 *  @param {string} reply
 */
chatController.insertChatReply = async (msg, reply) => {

    const { from, to } = msg;

    /**@type Chat */
    const chat = {
        para: from.replace('@c.us', ''),
        desde: to.replace('@c.us', ''),
        mensaje: reply,
        tipo: ChatModel.optionsType.TEXT,
        dispositivo: 'web',
        name: `${to.replace('@c.us', '')}`,
        content_type: ChatModel.optionsContentType.TEXT,
        url: null,
        port
    }



    const idInsert = await new ChatModel().insertChat(chat);
    console.log('chat insertado con id:', idInsert);
}


/**
 * 
 * @param {string} numeroContacto 
 * @returns {Promise<string>}
 */
chatController.obtenerUltimoChat = async (numeroContacto) => {
    return await new ChatModel().obtenerUltimoChat(numeroContacto);
}

module.exports = chatController;