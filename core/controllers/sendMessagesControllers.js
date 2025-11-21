const { EmployeeModel } = require('../models/employeeModel');
const { CampaignModel } = require('../models/campaignModel');
const { pause } = require('../../utils');
const { Request } = require('../http/request');


 

const testEmployees = [
    { id: 68, id_empleado: 6394880, celular: "3168848850", nombre: "STEVEN REALPE", external: 0 },
    { id: 2, id_empleado: 1118292193, celular: "3163485418", nombre: "BRIGITTE GOMEZ", external: 0 },
    { id: 61, id_empleado: 31323108, celular: "3174733798", nombre: "ANDREAAA MELLIZO", external: 0 },
    { id: 125, id_empleado: 79218898, celular: "3226351709", nombre: "LINA MARÍA", external: 1 },
];

const SendMessagesController = {}

SendMessagesController.sendMessages = async () => {
    const timeOut = 5000;
    const invitacion1 = 'invitación-2025-v1.jpg';
    const invitacion2 = 'invitación-2025-v2.jpg';// para los que están fuera del valle del cauca.

    const employees = testEmployees;

    // const employees = await new EmployeeModel().obtenerEmpleadosSinMensaje(false);
    const campaignModel = await new CampaignModel().getCampaign(1);
    if (!campaignModel) return;

    for (const employee of employees) {
        try {
            const message = campaignModel.mensaje.replace("[nombre]", employee.nombre);
            const to = `57${employee.celular}`;

            const fileName = employee.external === 0 ? invitacion1 : invitacion2;

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