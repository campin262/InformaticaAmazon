var amqp = require('amqp');
var servicio = require('./callsoap');

var connection = amqp.createConnection({
    host: 'localhost'
    , port: 5672
    , login: 'alozano'
    , password: 'alex506071006'
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
                    console.error(err.message);
                }
            });
        });
    }, 5000);
})(connection);

exports.escribirCola = escribirCola;
exports.conexion = conexion;