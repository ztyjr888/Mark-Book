(function(window,document,undefined,$){
    var Properties = {
        'reg':Base.PROP.REG['blank'],
        'reg_email':Base.PROP.REG['email'],
        'loginParams':{
            'url':'login',
            'type':'GET',
            'dataType':'JSON',
            'optionsLoading':$("#mk-loading"),
            'isShowError':true,
            'callback':loginAjaxCallback
        }

    };

    function loginAjax(){
        if(!validateForm()){
            return false;
        }

        ajaxLogin();
    }

    function ajaxLogin(){
        var params = {};
        params.email = $("#loginEmail").val().trim();
        params.pwd = $("#loginPwd").val().trim();
        var loginParams = Properties['loginParams'];
        Base.Method['ajax'](loginParams['url'],params,loginParams['callback'],loginParams['dataType'],loginParams['type'],loginParams['isShowError'],loginParams['optionsLoading']);
    }

    function loginAjaxCallback(data){
        if(!data || !data.userLogin){
            alert("用户名或密码错误!");
            return;
        }

        if(data.userLogin == true){
            alert("登陆成功!");
            return;
        }

        alert("用户名或密码错误!");
        return;
    }

    function validateForm(){
       if(validateEmail() && validatePwd()){
           return true;
       }

       return false;
    }

    function validateEmail(){
        var reg = Properties['reg'];
        var reg_email = Properties['reg_email'];
        var email = $("#loginEmail").val().trim();
        if(!email || reg.test(email) || !reg_email.test(email)){
            $("#errorLoginEmail").text('请输入正确的邮箱!');
            return false;
        }

        $("#errorLoginEmail").text('');
        return true;
    }

    function validatePwd(){
        var reg = Properties['reg'];
        var pwd = $("#loginPwd").val().trim();
        if(!pwd || reg.test(pwd)){
            $("#errorLoginPwd").text('请输入正确的密码!');
            return false;
        }

        $("#errorLoginPwd").text('');
        return true;
    }

    function clearLoginForm(){
        $("#loginEmail").val('');
        $("#loginPwd").val('');
        $("#errorLoginEmail").text('');
        $("#errorLoginPwd").text('');
    }

    window.login = {};
    window.login.loginAjax = loginAjax;
    window.login.validateEmail = validateEmail;
    window.login.validatePwd = validatePwd;
    window.login.clearLoginForm = clearLoginForm;
})(window,document,undefined,jQuery);


$(function(){
    $("#registerDiv").click(function(){
        /*$(this).animate({
         height:'100%'
         });*/

        $(this).hide();
        $("#loginPage").hide();
        $("#registerPage").show().end().animate({
            height:'100%'
        });
    });

    $("#registerBack").click(function(){
        login.clearLoginForm();
        $("#registerDiv").show();
        $("#loginPage").show();
        $("#registerPage").hide();
    });

});