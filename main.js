var fs = require('fs');
var express = require('express');
var queue = require('./writequeue');
var app = express();
var bodyParser = require('body-parser');

queue.conexion().on('ready', function () {
    console.log('Conexión hecha con RabbitMQ y lista para ser usada.');
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({
        extended: true
    })); // support encoded bodies

    var configuration = JSON.parse(
        fs.readFileSync('config.json')
    );

    app.post('/hw.v1.entrega', function (req, res) {
        res.header("Content-Type", "application/json");
        var user_id = req.body.id;
        if (user_id != undefined) {
            queue.escribirCola(user_id);
            res.status(200);
            res.send('{"codigo": "0”, "descripcion": "descripción: [Recibido]"}');
            console.log("recibe peticion para entregar dulce:[" + String(user_id) + "]");
        } else {
            res.status(400);
            res.send('{"codigo": "1”, "descripcion": "Error en datos"}');
        }
    });


    var server = app.listen(configuration.puerto, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log("[%s] Escuchando por http://%s:%s", configuration.ambiente, host, port);
    });
});