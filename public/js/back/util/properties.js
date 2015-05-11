/**
 * Created by Administrator on 2015/4/23.
 */
(function(){

    var defaultProperties = {
        port:3000,
        eventType:{'LOGIN':'LOGIN', 'LOGOUT':'LOGOUT', 'SPEAK':'SPEAK', 'LIST_USER':'LIST_USER', 'ERROR':'ERROR', 'LIST_HISTORY':'LIST_HISTORY'},
        host:'localhost',
        dbConnect:{
            'host':'127.0.0.1',
            'user':'mark',
            'password':'mark',
            'database':'mark',
            'port':27017
        },
        dbTable:{
            'user':'mark_user'
        }

    };

    function deepCopy(source){
        var target = {};
        for(var src in source){
            if(source.hasOwnProperty(src)){
                if(typeof source[src]==="object"){
                    target[src] = deepCopy(source[src])
                }else{
                    target[src] = source[src];
                }

               // target[src] = typeof source[src]==='object'? deepCopy(source[src]): source[src];
            }

        }

        return target;
    }

    module.exports = deepCopy(defaultProperties);
})();