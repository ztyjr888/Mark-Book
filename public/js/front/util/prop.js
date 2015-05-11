/**
 * Created by tlzhang on 2015/5/4.
 */
(function(window,document,undefined){
    var PROP = {
        'REG':{
            'email':/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
            'blank':/^[ ]+$/
        }
    };

    var Method = {
      'ajax':function(url,params,callback,dataType,type,isShowError,optionsLoading){
          if(!type)
            type = 'GET';

          if(!dataType)
            dataType = 'JSON';

          $.ajax({
              type: type,
              url:url,
              data: params,
              dataType:dataType,
              beforeSend:function(){
                  optionsLoading.show();
              },
              success:callback,
              error:function(XMLHttpRequest, textStatus, errorThrown){
                  if(isShowError == true){
                      alert("服务器异常,请稍候再试试!");
                  }

                  if(optionsLoading)
                      optionsLoading.hide();
                  /* alert(XMLHttpRequest.status);
                   alert(XMLHttpRequest.readyState);
                   alert(textStatus);*/
              }
          });
      }
    };

    function StringBuilder(){
        this.data = new Array;
    }

    StringBuilder.prototype.append = function(str){
        this.data.push(str);
    };

    StringBuilder.prototype.toString = function(){
        return this.data.join("");
    };

    window.Base = {};
    window.Base.PROP = PROP;
    window.Base.Method = Method;
    window.Base.StringBuilder = StringBuilder;
})(window,document,undefined);