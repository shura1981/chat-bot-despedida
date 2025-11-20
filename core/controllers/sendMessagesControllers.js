const { EmployeeModel } = require('../models/employeeModel');
const { CampaignModel } = require('../models/campaignModel');
const { pause } = require('../../utils');
const { Request } = require('../http/request');


 

const testEmployees = [
    { id: 68, id_empleado: 6394880, celular: "3168848850", nombre: "STEVEN REALPE", amarillo: 0 },
    { id: 2, id_empleado: 1118292193, celular: "3163485418", nombre: "BRIGITTE GOMEZ", amarillo: 0 },
    { id: 61, id_empleado: 31323108, celular: "3174733798", nombre: "ANDREAAA MELLIZO", amarillo: 0 },
];

const SendMessagesController = {}

SendMessagesController.sendMessages = async () => {
    const timeOut = 5000;
    const invitacion1 = 'invitacion.webp';
    const invitacion2 = 'invitacion2.webp';

    const employees = testEmployees;

    // const employees = await new EmployeeModel().obtenerEmpleadosSinMensaje(true);
    const campaignModel = await new CampaignModel().getCampaign(1);
    if (!campaignModel) return;

    for (const employee of employees) {
        try {
            const message = campaignModel.mensaje.replace("[nombre]", employee.nombre);
            const to = `57${employee.celular}`;

            const fileName = employee.amarillo === 0 ? invitacion1 : invitacion2;

            await Request.postWhatsappFile({ to, message, fileName })

            await pause(timeOut);
            console.log(`Finished processing employee ${employee.nombre}`);
        } catch (error) {
            console.log(error);
            // guardar log de error
        }
    }

    console.log("Mensajes enviados correctamente");


}


module.exports = { SendMessagesController }


SendMessagesController.sendMessages();