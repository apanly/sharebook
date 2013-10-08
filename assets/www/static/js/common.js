;
document.addEventListener("deviceready", onDeviceReady, false);
// PhoneGap is loaded and it is now safe to make calls PhoneGap methods
function onDeviceReady() {
    // 注册回退按钮事件监听器
    document.addEventListener("backbutton", onBackKeyDown, false); //返回键
}

function onConfirm(button) {
    if(button==1) navigator.app.exitApp(); //选择了确定才执行退出
}
// Show a custom confirmation dialog
function onBackKeyDown() {
    navigator.notification.confirm(
        '按确定退出程序!',  // message
        onConfirm,              // callback to invoke with index of button pressed
        '确定要退出程序吗?',            // title
        '确定,取消'          // buttonLabels
    );
}
//1=>home 2=>dc 3=>site 4=>all
var envirment=4;
$(document).ready(function(){
   if(envirment<4){
       $($("#mode").parent()).hide();
   }
});

function getLocationUri(){
    var mode=1;
    if(envirment<4){
        mode=envirment;
    }else{
       mode = $("#mode").val();
    }
    var uri = "www.echocool.net";
    if (mode == 1) {
        uri = "192.168.0.100"
    } else if (mode == 2) {
        uri = "dc.corp.anjuke.com";
    } else if (mode == 3) {
        uri = "www.echocool.net";
    }
    return uri;
}
