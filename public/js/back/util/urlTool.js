/**
 * Created by tlzhang on 2015/4/28.
 */
var utilTool = require('./utilTool');
var viewPath = utilTool.viewPath;
var ajaxLoginPath = utilTool.ajaxLoginPath;

exports.toLoginUrl= viewPath + 'login.html';//login html
exports.loginAjaxUrl = '/login';//login system