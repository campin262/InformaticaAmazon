function log() {
    var ahora = new Date().toLocaleString();
    var logMensaje = "";
    logMensaje = logMensaje.concat("[",ahora,"] " arguments[0])
    for (var i = 1; i < arguments.length; i++) {
        logMensaje = logMensaje.replace("%s", arguments[i]);
    }

    console.log(logMensaje);
}

exports.log = log;