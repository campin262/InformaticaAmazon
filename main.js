var fs = require('fs');
var express = require('express');
var queue = require('./writequeue');
var cifrado = require('./cifrado');
var app = express();
var bodyParser = require('body-parser');
var https = require('https');
var log4c = require('./log4Candy');

log4c.log('------------------------------------------------');
log4c.log('|         Iniciando Server Amazon              |');
log4c.log('------------------------------------------------');
                                                                                                                            



queue.conexion().on('ready', function () {
    var configuration = JSON.parse(
        fs.readFileSync('config.json')
    );

    const options = {
        pfx: fs.readFileSync(configuration.keystore),
        passphrase: cifrado.decrypt(configuration.keystorePwd)
    };


    log4c.log('Conexión hecha con RabbitMQ y lista para ser usada.');
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({
        extended: true
    })); // support encoded bodies

    app.get(configuration.context, function (req, res) {
        log4c.log("Recibida peticion");
        res.status(400);
        res.send('Hola soy el servicio standAlone :)');
    })

    app.post(configuration.context, function (req, res) {
        var ipOrigen = req.connection.remoteAddress;
        log4c.log("------------------------ Se Recibe Peticion POST  ------------------------");
        log4c.log("\t Ip Origen : " + ipOrigen);        
        res.header("Content-Type", "application/json");
        var user_id = req.body.id;
        if (user_id != undefined) {
            log4c.log("\t solicitud  dulce id : " + String(user_id));
            queue.escribirCola(user_id);
            res.status(200);
            res.send('{"codigo": "0", "descripcion": "descripción: [Recibido]"}');
            log4c.log("\t 200 OK : se envia respuesta codigo 0 [recibido]");
        } else {
            res.status(400);
            res.send('{"codigo": "1", "descripcion": "Error en datos"}');
            log4c.log("\t 400 OK : se envia respuesta codigo 1 [Error en datos]");
        }
    });

    if (configuration.usarHttps) {
        var server = https.createServer(options, app).listen(configuration.puertoSeguro, () => {
            log4c.log("[%s] Escuchando por puerto __SEGURO__ %s", configuration.ambiente, configuration.puertoSeguro);
        });
    } else {


        var server = app.listen(configuration.puerto, function () {
            var host = server.address().address;
            var port = server.address().port;
            log4c.log("[%s] Escuchando por http://%s:%s", configuration.ambiente, host, port);
        });
    }
});