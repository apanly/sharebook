;
function submitbook(result,forceflag){
    var cookieuid =  localStorage.getItem("uid");
    var cookieusername = localStorage.getItem("username");
    uri=getLocationUri();
    $("#barcodediv").html("" + result);
    $.ajax({
        type:"POST",
        url:"http://"+uri+"/library/index.php?a=scan&uid="+cookieuid,
        data:result,
        dataType:'json',
        beforeSend:function () {
            $("#info").html("sending");
            if(forceflag){
//                setTimeout(function(){
//                    $($("#forcebutton").parent()).show();
//                },300);
                $($("#forcebutton").parent()).show();
            }
        },
        success:function (response) {
            $("#info").html(response.name);
            $($("#forcebutton").parent()).hide();
        },
        error:function(obj,errorinfo){
            $("#info").html(errorinfo);
            $($("#forcebutton").parent()).show();
        }
    });
}
$(function () {
    var cookieuid =  localStorage.getItem("uid");
    var cookieusername = localStorage.getItem("username");
    $("#userinfo h3").html(cookieusername);
    $($("#forcebutton").parent()).hide();
    $("#forcebutton").click(function(){
        var result= $.trim($("#barcodediv").html());
        submitbook(result,false);
    });
    $("#logout").click(function(){
        localStorage.removeItem("uid");
        localStorage.removeItem("username");
        //$.mobile.changePage ('login.html');
        window.location.href="login.html";
    });
    $("#btnbarcode").click(function () {
        $($("#forcebutton").parent()).hide();
        window.plugins.barcodeScanner.scan(
            BarcodeScanner.Type.QR_CODE,
            function (result) {
                submitbook(result,true);
            },
            function (error) {
                $("#barcodediv").html("扫描失败：" + result);
            },{
                installTitle:"安装提示",
                installMessage:"请先安装开源免费的ZXing二维码扫描器",
                yesString:"确定",
                noString:"取消"
            }
        );
    });
});

