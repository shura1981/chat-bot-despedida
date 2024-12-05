// get the client
const mysql = require('mysql2/promise');
const dotenv = require('../environments/read_env.js');

/**
 * Crea la conexión a la base de datos
 * @param {boolean} isDbWhatsapp - Indica si la conexión es a la base de datos de Whatsapp
 * @returns {Promise<mysql.Connection>} connection
 * @throws {Error} Error al conectar a la base de datos
 * @example
try {
            const connection = await connect();
            const value = enviar_correo ? 1 : 0;
            const sql = `UPDATE inscritos SET enviar_correo = ? WHERE documento = ?`;
            const [results] = await connection.execute(sql, [value, documento]);
            return results.affectedRows;
        } catch (error) {
            throw new Error('Error al actualizar el campo enviar_correo: ' + error.message);
        } finally {
            connection.end();
        }
 */
async function connect(isDbWhatsapp = true) {
    const connectionConfig = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: isDbWhatsapp ? process.env.DB_NAME_WHATSAPP : process.env.DB_NAME_CAMPAIGNS,
        dateStrings: true,
        supportBigNumbers: true,
        typeCast: function castField(field, useDefaultTypeCasting) {
            // We only want to cast bit fields that have a single-bit in them. If the field
            // has more than one bit, then we cannot assume it is supposed to be a Boolean.
            if ((field.type === "BIT") && (field.length === 1)) {
                var bytes = field.buffer();
                // A Buffer in Node represents a collection of 8-bit unsigned integers.
                // Therefore, our single "bit field" comes back as the bits '0000 0001',
                // which is equivalent to the number 1.
                return (bytes[0] === 1);
            }
            return (useDefaultTypeCasting());
        },
    }

    try {
        const connection = await mysql.createConnection(connectionConfig);
        console.log('Conexión a la base de datos establecida');
        return connection;
    } catch (error) {
        throw new Error('Error al conectar a la base de datos: ' + error.message);
    }
}

module.exports = connect;



