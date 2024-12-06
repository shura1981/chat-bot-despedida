const { EmployeeModel, Employee } = require('../models/employeeModel');

const employeeController = {};

/**
 * 
 * @param {string} numberCell 
 * @returns {Promise<Employee|null>} el empleado encontrado
 */
employeeController.findEmployee = async (numberCell) => {
    if (!numberCell) return null;
    try {
        return await new EmployeeModel().obtenerEmpleado(numberCell);
    } catch (error) {
        console.log('error', error);//todo: guardar el error en un archivo de log
    }
    return null;
}



module.exports = employeeController;