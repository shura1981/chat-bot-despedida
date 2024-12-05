const mysql = require('mysql2/promise');
const dotenv = require('../environments/read_env.js');

const poolConfig = {
    connectionLimit: 60,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_CAMPAIGNS,
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
};

// Crea el pool de conexiones
const pool = mysql.createPool(poolConfig);


/**
 * Función para ejecutar consultas usando el pool de conexiones
 * @param {string} sql sentencia sql 
 * @param {Array} values  parámetros de la consulta
 * @returns  {Promise<object>} results resultados de la consulta
 * @throws {Error} Error al ejecutar la consulta
 * @example
 * try {
 const query = `
 SELECT * FROM tb_visitas WHERE fecha BETWEEN ? AND ? ORDER BY id_visita DESC
 `;
 const [results] = await Query(query, [fechaI, fechaF]);
 console.log("results", results);
 return results.map(row => { return this.obtenerFila(row); });
 } catch (error) {
 throw error;
 }
 */
async function query(sql, values) {
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.execute(sql, values);
        return results;
    } catch (error) {
        throw new Error('Error al ejecutar la consulta: ' + error.message);
    } finally {
        connection.release();
    }
}



module.exports = query;
