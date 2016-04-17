var amqp = require('amqp');

var connection = amqp.createConnection({
    host: '52.37.50.140'
    , port: 5672
    , login: 'alozano'
    , password: 'alex506071006'
});

connection.on('error', function () {
    console.error(arguments);
});

function escribirCola(mensaje) {
    connection.publish('procesar', mensaje);
}

function conexion() {
    return connection;
}

exports.escribirCola = escribirCola;
exports.conexion = conexion;