var soap = require('soap');
var fs = require('fs');
var log4c = require('./log4Candy');

function llamarServicioExterno(_idTransaccion, _estado, _descripcion) {
    log4c.log("Invocando el servicio externo _idTransaccion [%s] _estado [%s] _descripcion [%s]",_idTransaccion, _estado,_descripcion)
    var configuration = JSON.parse(
        fs.readFileSync('config.json')
    );

    soap.createClient(configuration.url, {
        forceSoap12Headers: true
    }, function (err, client) {
        client.confirmaEntregaDulce({
            r: {
                idTtransaccion: _idTransaccion
                , estado: _estado
                , descripcion: _descripcion
            }
        }, function (err, result) {
            log4c.log(result);
        });
    });
}

exports.llamarServicioExterno = llamarServicioExterno;