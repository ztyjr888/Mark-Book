/**
 * Created by tlzhang on 2015/4/29.
 */
var utilTool = require('././utilTool');
var propUtil = utilTool.propUtil;
var mongodb = require('mongodb');


var  db = new mongodb.Db(propUtil.dbconnect['database'], server, {safe:true});

db.open(function(err,db){

});

(function(){

    function dbConnection(connectionName,callback){
        this.getConnection.call(this,connectionName,callback);
    }

    getConnection.prototype = function(){
      createDB = function(){
          if(!this.db){
              var server = createServer();
              this.db = new mongodb.Db(propUtil.dbconnect['database'], server, {safe:true});
          }
      };

      createServer = function(){
          return new mongodb.Server(
              propUtil.dbconnect['host'],
              propUtil.dbconnect['port'],
              {auto_reconnect: true}
          );
      };

      getConnection = function(connectionName,callback){
           this.createDB();
           this.db.authenticate(propUtil.dbconnect['user'], propUtil.dbconnect['password'],function(err,val){
                if(err)
                    callback&&callback('Authorize failed !',undefined);

                db.createCollection(connectionName,function(err,collection){
                    callback&&callback(undefined,collection);
                });
            });
        };

        return {
            getConnection:this.getConnection
        }
    };

    var db;
    function createServer(){
        var server  = new mongodb.Server(
            propUtil.dbconnect['host'],
            propUtil.dbconnect['port'],
            {auto_reconnect: true}
        );

        return server;
    }

    function createDB(){
        var server = createServer();
        db = new mongodb.Db(propUtil.dbconnect['database'], server, {safe:true});
    }

    function getConnection(connectionName,callback){
        db.authenticate(propUtil.dbconnect['user'], propUtil.dbconnect['password'],function(err,val){
            if(err)
                callback&&callback('Authorize failed !',undefined);

            db.createCollection(connectionName,function(err,collection){
                callback&&callback(undefined,collection);
            });
        });
    }

    function mongodbConnect(connectionName,callback){
        createDB();
        if(!db){
           callback("Failed to connect db.",undefined);
        }

        getConnection(connectionName,callback);
    }
})();

