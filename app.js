/**
 * Created by tlzhang on 2015/4/28.
 */
var utilTool = require('./public/js/back/util/utilTool');
var urls = require(utilTool.jsUtilPath + 'urls');
var login = require(utilTool.ajaxLoginPath);

var mapUtil = utilTool.mapUtil;
var map = new mapUtil['Map'];
if(typeof urls != 'object'){
    return;
}

for(var key in urls){
    if(urls[key].url && urls[key].type){
        map.put(key,urls[key]);
    }
}

if(map.size() == 0)
    throw new Error("Please input urls into map.");

var app = utilTool.app;
var route = new app(map,utilTool.propUtil.port,"/public");
console.log("route:"+route);
route.get('/',function(){

});

route.get('/login',function(data,connection){
    login.loginAjax(data,connection);
});



/*
for(var key in urls){
    if(urls[key].url && urls[key].type){
        route.get(key,function(){
        });
    }
}*/
