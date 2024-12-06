const query = require('../../database/pool-connection-campaigns.js');
const Employee = require('../interfaces/employee.js');
const Result = require('../interfaces/resultMySlq.js');



class CampaignModel {



    /**
     * 
     * @param {Employee} employee
     * @returns {Promise<number>} el id del empleado insertado
     */
    insertCampaign(chat) {
        throw Error('Not implemented');
    }

    /**
     * 
     * @param {id} idCampaign 
     * @returns {Promise<{id:number; nombre: string; fecha: string; mensaje: string; }|null>} el empleado encontrado
     */
    getCampaign(idCampaign) {
        return new Promise(async (resolve, reject) => {
            try {
                const [firsRow] = await query(`
                    SELECT id, nombre, fecha, mensaje FROM tb_campaign WHERE id = ?;`, [idCampaign]);
                resolve(firsRow ? firsRow : null);
            } catch (error) {
                reject(error);
            }
        });
    }


}


module.exports = { CampaignModel, Employee };



