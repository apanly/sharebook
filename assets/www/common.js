;
$(function () {
    $("#btnbarcode").click(function () {
        window.plugins.barcodeScanner.scan(
            BarcodeScanner.Type.QR_CODE,
            function (result) {
                $("#barcodediv").html("" + result);
                $.ajax({
                    type:"POST",
                    url:"http://192.168.0.100/library/?a=scan",
                    data:result,
                    dataType:'json',
                    beforeSend:function () {
                        $("#info").html("sending");
                    },
                    success:function (response) {
                        $("#info").html(response.name);
                    }
                });
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

