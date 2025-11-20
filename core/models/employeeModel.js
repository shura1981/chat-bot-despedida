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
              const numeroLimpio = numeroContacto.replace(/^57/, '');
                const [firsRow] = await query(`
                    SELECT id, id_empleado, celular, nombre, external, amarillo FROM tb_employees WHERE celular LIKE ?;`, [numeroLimpio]);
                resolve(firsRow ? firsRow : null);
            } catch (error) {
                reject(error);
            }
        });
    }
    /**
     * @param {boolean} external si es true solo se obtienen los empleados externos de otras ciudades
     * @returns {Promise<Employee[]>} empleados que no tienen mensaje se la campaña
     */
    obtenerEmpleadosSinMensaje(external = false) {
        return new Promise(async (resolve, reject) => {
            try {
                let querySql = `
SELECT e.id, e.id_empleado, e.celular, e.nombre, e.external, e.amarillo
FROM tb_employees e 
LEFT JOIN tb_mensajes m ON e.id_empleado = m.id_employee 
WHERE m.id_employee IS NULL`;
                if (external) {
                    querySql += ` AND e.external = 1`;
                }
                const rows = await query(querySql);
                resolve(rows ? rows : []);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
   * @returns {Promise<Employee[]>} empleados que no tienen mensaje se la campaña
   */
    obtenerEmpleadosConRespuesta() {
        return new Promise(async (resolve, reject) => {
            try {
                let querySql = `
SELECT e.* FROM tb_mensajes m INNER JOIN tb_employees e ON m.id_employee= e.id_empleado WHERE m.respuesta= 1 AND e.external= 1 ORDER BY e.id ASC;`;
                const rows = await query(querySql);
                resolve(rows ? rows : []);
            } catch (error) {
                reject(error);
            }
        });
    }

}


module.exports = { EmployeeModel, Employee };





