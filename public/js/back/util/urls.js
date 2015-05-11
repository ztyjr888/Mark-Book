/**
 * Created by tlzhang on 2015/4/28.
 */
var urlTool = require('./urlTool');
(function(){
    var urls = {
        '/':{
            url: urlTool.toLoginUrl,
            type:'html'
        },
        '/login':{
            url:urlTool.loginAjaxUrl,
            type:'json'
        }
    };

    module.exports = urls;
})();