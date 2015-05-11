/**
 * Created by tlzhang on 2015/4/24.
 */
var pbc = './public/';
var common = require('common');
exports.base64 = require('./base64');
exports.propUtil = require('./properties');

//back - base path
exports.cssPath = pbc + 'css/';
exports.viewPath = pbc + 'view/';
exports.jsPath = pbc + 'js/back/';
exports.jsUtilPath = exports.jsPath + 'util/';
exports.viewPath = pbc + 'view/';
exports.modulePath = exports.jsPath + 'module/';
exports.dbPath = exports.jsPath + "dbConnect";


//back require
exports.ajaxLoginPath = exports.modulePath + 'login/login';


//front
exports.jsFrontPath = pbc + 'js/front/';
exports.ajaxPath = exports.jsFrontPath + 'ajax/';

exports.mapUtil = common.map;
exports.listUtil = common.list;
exports.http = common.http;
exports.fs = common.fs;
exports.app = common.route;
exports.session = common.session;