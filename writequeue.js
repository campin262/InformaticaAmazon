var amqp = require('amqp');
var fs = require('fs');
var servicio = require('./callsoap');
var cifrado = require('./cifrado');

var configuration = JSON.parse(
        fs.readFileSync('config.json')
    );

var connection = amqp.createConnection({
    host: configuration.rabbitMQServer
    , port: configuration.rabbitMQPuerto
    , login: configuration.rabbitMQUsuario
    , password: cifrado.decrypt(configuration.rabbitMQPwd)
});

connection.on('error', function () {
    console.error(arguments);
});

function escribirCola(mensaje) {
    connection.publish('QEntrada', mensaje);
}

function conexion() {
    return connection;
}


(function (connection) {
    setTimeout(function () {

        //nombre de la cola que estaremos consumiendo los mensajes
        var cola = 'QSalida';

        connection.queue(cola, {
            durable: true
            , autoDelete: false
        }, function (cola) {

            // comodin para capturar todos los mensajes
            cola.bind('#');

            cola.subscribe(function (message) {
                //{ data:<buffer>,contentType:'application/octet-stream' }
                try {
                    var buffer = new Buffer(message.data);
                    var json = JSON.parse(buffer.toString());

                    servicio.llamarServicioExterno(json.id, json.codigo, json.codigo === '0' ? 'Exitoso' : 'Error');
                } catch (err) {
                    console.error('error al llamar servicio' + err.message);
                }
            });
        });
    }, 5000);
})(connection);

exports.escribirCola = escribirCola;
exports.conexion = conexion;