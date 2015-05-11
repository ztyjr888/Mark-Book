/**
 * Created by tlzhang on 2015/5/4.
 */
var db = require('./../../db/dbConnect.js');
var utilTool = require('./../../util/utilTool');
var urlTool = require('./../../util/urlTool');
var base64 = utilTool.base64;
var propUtil = utilTool.propUtil;
function loginAjax(data,connection){
    if(!data){
        connection.response.end({"userLogin":false});
    }

    var params = {};


    data = JSON.parse(data);
    if(data.length ==0){
        connection.response.end(JSON.stringify({"userLogin":false}));
        return;
    }

    params.email = data[0]["email"];
    var pwd = data[0]["pwd"];

    var connect = new db.dbConnect();
    if(!params.email || !pwd){
        connection.response.end(JSON.stringify({"userLogin":false}));
        return;
    }

    pwd = base64.base64Cipher(pwd);
    connect.singleSelect(propUtil.dbTable['user'],params,function(err,result){
        if(err){
            connection.response.end(JSON.stringify({"userLogin":false}));
            return;
        }

        if(result){
            if(result.pwd == pwd){
                //create session
                var session = utilTool.session.createSession(555);
                if(session){
                    console.log("JSESSIONID="+session.id);
                    connection.response.setHeader("Set-Cookie",["JSESSIONID="+session.id]);
                    session.close();
                }
                connection.response.end(JSON.stringify({"userLogin":true}));
                return;
            }
        }

        connection.response.end(JSON.stringify({"userLogin":false}));
    });
}

exports.loginAjax = loginAjax;