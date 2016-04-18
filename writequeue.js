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
    connection.publish('QEntrada', mensaje);
}

function conexion() {
    return connection;
}

 
(function(connection){
          setTimeout(function() {
 
              //nombre de la cola que estaremos consumiendo los mensajes
              var cola = 'QSalida';
 
              connection.queue(cola, {durable : true, autoDelete : false },function (cola) {
 
                  // comodin para capturar todos los mensajes
                  cola.bind('#');
 
                  cola.subscribe(function (message) {
                      //{ data:<buffer>,contentType:'application/octet-stream' }
                      var buffer = new Buffer(message.data);
 
                      console.log("Enviar esta respuesta al Server",buf.toString());
                  });
              });
          }, 5000);
})(connection);

exports.escribirCola = escribirCola;
exports.conexion = conexion;