const dotenv  = require('dotenv');
const STATE = require('../state/index.js');
// modo desarrollo o produccion
const NODE_ENV = STATE.prod;
// activar variables de entorno
dotenv.config({
    path: `environments/.env.${NODE_ENV}`
});
// obtener variables de entorno

module.exports= dotenv;