
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const dotenv = require('./environments/read_env.js');

const port = process.env.PORT;

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: "sessions",
    }),
    puppeteer: {
        executablePath: process.env.DIRECTORYCROME,
    },
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    }
});

require('./eventsclient')(client);

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // support json encoded bodies
app.use(bodyParser.text()); // support text plain encoded bodies
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // support encoded bodies
app.set('port', process.env.PORT || port);
//Configurar ruta a archivos estáticos
app.use(express.static(path.join(__dirname, 'public'), { index: false }));
const server = app.listen(app.get('port'), () => {
    console.log(`server  on port: , http://localhost:${app.get('port')}`);
});

app.use('/whatsapp', require("./router")(client));
app.all('/*', function (req, res) { res.status(404).send("<h1>La ruta que buscas no está disponible</h2>"); });