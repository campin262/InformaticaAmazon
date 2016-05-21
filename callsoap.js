var soap = require('soap');
var fs = require('fs');

function llamarServicioExterno(_idTransaccion, _estado, _descripcion) {
    var configuration = JSON.parse(
        fs.readFileSync('config.json')
    );

    soap.createClient(configuration.url, {
        forceSoap12Headers: true
    }, function (err, client) {
        client.confirmaEntregaDulce({
            idTtransaccion: _idTransaccion
            , estado: _estado
            , descripcion: _descripcion
        }, function (err, result) {
            console.log(result);
        });
    });
}

exports.llamarServicioExterno = llamarServicioExterno;