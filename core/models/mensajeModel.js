const query = require('../../database/pool-connection-campaigns.js');
const Mensaje = require('../interfaces/mensaje.js');
const Result = require('../interfaces/resultMySlq.js');



class MensajeModel {

    /**
     * 
     * @param {idEmployee} idEmployee
     * @param {idCampaign} idCampaign
     * @returns {Promise<number>} el id del empleado insertado
     */
    insertMensaje(idEmployee, idCampaign) {
        return new Promise(async (resolve, reject) => {
            try {
                /** @type{Result} */
                const result = await query(`
                   INSERT INTO tb_mensajes SET id_employee=?, id_campaign=? `, [idEmployee, idCampaign]);
                resolve(result.insertId);
            } catch (error) {
                reject(error);
            }
        });

    }

    /**
     * 
     * @param {{respuesta:number;  id_employee: number;}} param0 
     * @returns 
     */
    updateMensaje({ respuesta, id_employee } = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                /** @type{Result} */
                const result = await query(`
                   UPDATE tb_mensajes SET tiempo_respuesta = current_timestamp(), respuesta=? WHERE id_employee=?`, [respuesta, id_employee]);
                resolve(result.affectedRows);
            } catch (error) {
                reject(error);
            }
        });
    }




    saveMeetingPlace({ id_employee = 0, punto_encuentro = "" }) {
        return new Promise(async (resolve, reject) => {
            try {
                /** @type{Result} */
                const result = await query(`
                    INSERT INTO tb_punto_encuentro SET id_empleado=?, lugar=?`, [id_employee, punto_encuentro]);
                resolve(result.insertId);
            } catch (error) {
                reject(error);
            }
        });

    }






}


module.exports = { MensajeModel };



