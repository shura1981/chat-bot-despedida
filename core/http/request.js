
const fetch = require('node-fetch');
const Request = {}

Request.postWhatsappFile = async ({ to, message, fileName, idCampaign=1 }) => {
    const messageEncode = encodeURIComponent(message);// codificar message a urlEncode componet
    const url = `http://localhost:8999/whatsapp/file?to=${to}&message=${messageEncode}&fileName=${fileName}&idCampaign=${idCampaign}`;
  const response= await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}


Request.postWhatsappMessage = async ({ to, message, fileName }) => {
    const messageEncode = encodeURIComponent(message);// codificar message a urlEncode componet
    const url = `http://localhost:8999/whatsapp/message?to=${to}&message=${messageEncode}`;
  const response= await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}

module.exports = { Request }

