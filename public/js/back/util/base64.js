/**
 * Created by tlzhang on 2015/5/5.
 */
var crypto = require('crypto');

var prop = {
    'algorithm':'aes-256-cbc',
    'clearEncoding':'utf8',
    'iv':'1234567890000000',
    'cipherEncoding':'base64',
    'base64Key':crypto.createHash('sha256').update('78541561566').digest()
};

exports.base64Cipher = function(data,key,algorithm,clearEncoding,iv,cipherEncoding){
    algorithm = algorithm || prop['algorithm'];
    clearEncoding = clearEncoding || prop['clearEncoding'];
    iv = iv || prop['iv'];
    cipherEncoding = cipherEncoding || prop['cipherEncoding'];
    key = key || prop['base64Key'];

    var cipher = crypto.createCipheriv(algorithm,key,iv);
    var cipherChunks = [];
    cipherChunks.push(cipher.update(data,clearEncoding,cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));
    console.log(cipherEncoding + ' ciphertext: ' + cipherChunks.join(''));
    return cipherChunks.join('');
};

exports.base64Decipher = function(data,key,algorithm,clearEncoding,iv,cipherEncoding){
    algorithm = algorithm || prop['algorithm'];
    clearEncoding = clearEncoding || prop['clearEncoding'];
    iv = iv || prop['iv'];
    cipherEncoding = cipherEncoding || prop['cipherEncoding'];
    key = key || prop['base64Key'];

    var decipher = crypto.createDecipheriv(algorithm, key,iv);
    var plainChunks = [];
    plainChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
    plainChunks.push(decipher.final(clearEncoding));
    console.log(cipherEncoding + " plaintext deciphered: " + plainChunks.join(''));
    return plainChunks.join('');
};