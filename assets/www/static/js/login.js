;
jQuery(document).ready(function () {
    var cookieuid =  localStorage.getItem("uid");
    var cookieusername = localStorage.getItem("username");
    if (cookieuid && cookieusername) {
        window.location.href = "index.html";
    } else {
        //输入事件
        $("input[id]").bind("focus", function () {
            if ($(this).attr("id") == 'username' && $(this).attr("value") == '请填写邮箱或者手机') {
                $(this).attr("value", "");
            }
        });
        $("input[id]").bind("blur", function () {
            if ($(this).attr("id") == 'username' && $(this).attr("value") == '') {
                $(this).attr("value", "请填写邮箱或者手机");
            }
        });
        $("#loginform").submit(function(){
            return false;
        });
//提交
        $("#submit").bind("click", function () {
            uri=getLocationUri();
            if (valid()) {
                $.ajax({
                    type:"POST",
                    url:"http://" + uri + "/library/index.php?a=dologin",
                    data:$("form#loginform").serialize(),
                    dataType:'json',
                    success:function (response) {
                        var code = response.code;
                        if (code == 1) {
                            localStorage.setItem("uid",response.message.id);
                            localStorage.setItem("username",response.message.username);
                            window.location.href="index.html";
                        } else {
                            alert("登录失败");
                        }
                    },
                    error:function (obj, errorinfo) {
                        alert(obj);
                    }
                });
            }
        });
    }
});
//输入信息验证
function valid() {
    var username = $.trim($("#username").val())
    var pwd = $.trim($("#password").val());
    var regemail = /^([0-9a-z_\.-]+)@([0-9a-z\.-]+)\.([a-z]{2,6})$/;
    var regphone = /^(1\d{10})$/
    if (!regemail.test(username) && !regphone.test(username)) {
        alert("用户名请填写邮件或者手机号码");
        $("#username").val("");
        $("#username").focus();
        return false;
    }
    if (pwd.length <= 0) {
        alert("请输入密码");
        $("#password").focus();
        return false;
    }
    return true;
}
;