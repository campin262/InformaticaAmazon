var fs = require('fs');
// Part of https://github.com/chris-rock/node-crypto-examples

// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'standalone';

//var configuration = JSON.parse(
//        fs.readFileSync('config.json')
//    );
//
//    console.log("[%s] :  '%s'", configuration.keystorePwd, encrypt(configuration.keystorePwd));
//    console.log("[%s] :  '%s'", configuration.rabbitMQPwd, encrypt(configuration.rabbitMQPwd));


function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;