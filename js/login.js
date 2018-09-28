//路径
require.config({
    paths: {
        jquery: "jquery-1.11.0",
        cookie: "jquery.cookie"
    }
});
require(["jquery", "cookie"], function ($, cookie) {
    $(function () {

        //两个弹窗的切换
        $("#numberLogin").click(function () {
            $(".login-form1").css("display", "block");
            $(".login-form2").css("display", "none");
            $(this).css("color", "#ef5b00");
            $("#saoMaLogin").css("color", "#999999");
        })

        $("#saoMaLogin").click(function () {
            $(".login-form2").css("display", "block");
            $(".login-form1").css("display", "none");
            $(this).css("color", "#ef5b00");
            $("#numberLogin").css("color", "#999999");
        })


    });
});
