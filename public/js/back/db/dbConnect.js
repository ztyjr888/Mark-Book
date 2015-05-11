/**
 * Created by tlzhang on 2015/4/29.
 */
var utilTool = require('./../util/utilTool');
var propUtil = utilTool.propUtil;
var mongodb = require('mongodb');
(function(){

    function dbConnection(){
        this.createDB();
    }

    dbConnection.prototype = function(){
      createDB = function(){
          if(!this.db){
              var server = createServer();
              this.db = new mongodb.Db(propUtil.dbConnect['database'], server, {safe:true});
          }
      };

      createServer = function(){
          return new mongodb.Server(
              propUtil.dbConnect['host'],
              propUtil.dbConnect['port'],
              {auto_reconnect: true}
          );
      };

      getConnection = function(connectionName,callback){
          var self = this;
           this.db.authenticate(propUtil.dbConnect['user'], propUtil.dbConnect['password'],function(err,val){
                if(err)
                    callback&&callback('Authorize failed !',undefined);

               self.db.createCollection(connectionName,function(err,collection){
                    callback&&callback(undefined,collection);
                });
            });
        };

        openDB = function (connectionName,callback) {
            var self = this;
            this.db.open(function(error){
                if (error){
                    callback&&callback('can not open datebase !',undefined);
                    return;
                }

                this.getConnection.call(self,connectionName,callback);
            });
        };

        add = function(connectionName,param,callback){
            this.openDB(connectionName,function(err,collection){
                collection.insert(param,function(err,data){
                    this.db.close();
                    if(callback)
                        callback && callback(err,data);
                });
            });
        };

        select = function(connectionName,param,callback){
            var self = this;
            this.openDB(connectionName,function(err,collection){
                collection.find(param).toArray(function(err,data){
                    self.db.close();
                    if(callback)
                        callback && callback(err,data);
                });
            });
        };

        singleSelect = function(connectionName,param,callback){
            var self = this;
            this.openDB(connectionName,function(err,collection){
                collection.findOne(param,function(err,data){
                    self.db.close();
                    if(callback)
                        callback && callback(err,data);
                });
            });
        };

        return {
            getConnection:this.getConnection,
            createDB:this.createDB,
            openDB:openDB,
            add:add,
            select:select,
            singleSelect:singleSelect
        }
    }();

    exports.dbConnect = dbConnection;
})();

