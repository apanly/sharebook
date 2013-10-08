;
jQuery(document).ready(function() {
    //输入事件
    $("input[id]").bind("focus",function () {
        if($(this).attr("id")=='username' &&  $(this).attr("value") == '请填写邮箱或者手机'){
            $(this).attr("value","");
        }
    });
    $("input[id]").bind("blur",function () {
        if($(this).attr("id")=='username' &&  $(this).attr("value") == ''){
            $(this).attr("value","请填写邮箱或者手机");
        }
    });
    $("#registform").submit(function(){
        return false;
    });
    //提交
    $("#regist").bind("click", function() {
        if (valid()) {
            uri=getLocationUri();
            $.ajax({
                type: "POST",
                url:"http://"+uri+"/library/index.php?a=doreg",
                data: $("form#registform").serialize(),
                dataType:'json',
                success: function(response){
                    var code=response.code;
                    if(code==1){
                        localStorage.setItem("uid",response.message.id);
                        localStorage.setItem("username",response.message.username);
                        alert("注册成功");
                        window.location.href="index.html";
                        //$.mobile.changePage("index.html","slidedown", true, true);
                    }else{
                        alert("注册失败:"+response.message);
                    }
                },
                error:function(obj,errorinfo){
                    alert(obj);
                }
            });
        }
    });
});
//输入信息验证
function valid(){
    var username= $.trim($("#username").val())
    var pwd= $.trim($("#password").val());
    var regemail = /^([0-9a-z_\.-]+)@([0-9a-z\.-]+)\.([a-z]{2,6})$/;
    var regphone= /^(1\d{10})$/
    if(!regemail.test(username) && !regphone.test(username)){
        alert("用户名请填写邮件或者手机号码");
        $("#username").val("");
        $("#username").focus();
        return false;
    }
    if(pwd.length<6){
        alert("密码必须大于6位");
        $("#password").focus();
        return false;
    }
    var status= $.trim($('input[name="status"]:checked').val());
    return true;
};