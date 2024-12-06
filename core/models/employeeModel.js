const query = require('../../database/pool-connection-campaigns.js');
const Employee = require('../interfaces/employee.js');
const Result = require('../interfaces/resultMySlq.js');



class EmployeeModel {



    /**
     * 
     * @param {Employee} employee
     * @returns {Promise<number>} el id del empleado insertado
     */
    insertEmployee(chat) {
        return new Promise(async (resolve, reject) => {
            try {
                /** @type{Result} */
                const result = await query(`
                    INSERT INTO tb_chats SET tipo=?,mensaje=?,url=?,desde=?,para=?,content_type=?,dispositivo=?, name=?, port=?`, [chat.tipo, chat.mensaje, chat.url, chat.desde, chat.para, chat.content_type, chat.dispositivo, chat.name, chat.port]);
                resolve(result.insertId);
            } catch (error) {
                reject(error);
            }
        });

    }

    /**
     * 
     * @param {string} numeroContacto 
     * @returns {Promise<Employee|null>} el empleado encontrado
     */
    obtenerEmpleado(numeroContacto) {
        return new Promise(async (resolve, reject) => {
            try {
                const [firsRow] = await query(`
                    SELECT id, id_empleado, celular, nombre FROM tb_employees WHERE celular LIKE ?;`, [numeroContacto.split("57").pop()]);
                resolve(firsRow ? firsRow : null);
            } catch (error) {
                reject(error);
            }
        });
    }
    /**
     * 
     * @returns {Promise<Employee[]>} empleados que no tienen mensaje se la campaña
     */
    obtenerEmpleadosSinMensaje() {
        return new Promise(async (resolve, reject) => {
            try {
                const rows = await query(`SELECT e.id, e.id_empleado, e.celular, e.nombre
FROM tb_employees e LEFT JOIN tb_mensajes m ON e.id_empleado = m.id_employee WHERE m.id_employee IS NULL;`);
                resolve(rows ? rows : []);
            } catch (error) {
                reject(error);
            }
        });
    }


}


module.exports = { EmployeeModel, Employee };





