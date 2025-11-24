const { EmployeeModel } = require('../models/employeeModel');
const { CampaignModel } = require('../models/campaignModel');
const { pause } = require('../../utils');
const { Request } = require('../http/request');


 

const testEmployees = [
    { id: 187, id_empleado: 6394880, celular: "3168848850", nombre: "STEVEN REALPE", external: 1 },
    // { id: 61, id_empleado: 31323108, celular: "3174733798", nombre: "ANDREAAA MELLIZO", external: 0 },
];

const SendMessagesController = {}
const CAMPAIGNS = {
first: 1,
second: 2,
}

SendMessagesController.sendMessages = async () => {
    const invitacion1 = 'invitación-2025-v1.jpg';
    const invitacion2 = 'invitación-2025-v2.jpg';// para los que están fuera del valle del cauca.

    const employees = testEmployees;

    // const employees = await new EmployeeModel().obtenerEmpleadosSinMensaje(false);
    console.log("total empleados",employees.length);
    
    const campaignFirst = await new CampaignModel().getCampaign(CAMPAIGNS.first);
    const campaignSecond = await new CampaignModel().getCampaign(CAMPAIGNS.second);

    if (!campaignFirst || !campaignSecond) return;

    let count = 0;

    for (const employee of employees) {
        try {
            const currentCampaign = count < 172 ? campaignSecond : campaignFirst;
            const message = currentCampaign.mensaje.replace("[nombre]", employee.nombre);
            const to = `57${employee.celular}`;

            const fileName = employee.external == 0 ? invitacion1 : invitacion2;

            await Request.postWhatsappFile({ to, message, fileName, idCampaign: currentCampaign.id })
            console.log(`Finished processing employee ${employee.nombre}`, fileName, to);

            // Generar un delay aleatorio entre 15 y 45 segundos
            const randomDelay = Math.floor(Math.random() * (45000 - 15000 + 1) + 15000);
            await pause(randomDelay);
            

            count++;
            // Pausa por lotes: cada 50 mensajes descansa 3 minutos para mayor seguridad
            if (count % 50 === 0 && count < employees.length) {
                console.log(`Lote de 50 mensajes completado. Pausando por 3 minutos...`);
                await pause(180000);
            }

        } catch (error) {
            console.log(error);
            // guardar log de error
        }
    }

    console.log("Mensajes enviados correctamente");


}


module.exports = { SendMessagesController }


SendMessagesController.sendMessages();