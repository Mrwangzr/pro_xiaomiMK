//路径
require.config({
    paths: {
        jquery: "jquery-1.11.0",
        cookie: "jquery.cookie",
        cookieConverts:"cookieConverts"
    }
});
require(["jquery", "cookie","cookieConverts"], function ($, cookie,cookieConverts) {
    $(function () {

        //两个弹窗的切换
        $("#numberLogin").click(function () {
            $(".login-form1").css("display", "block");
            $(".login-form2").css("display", "none");
            $(this).css("color", "#ef5b00");
            $("#saoMaLogin").css("color", "#999999");
        });

        $("#saoMaLogin").click(function () {
            $(".login-form2").css("display", "block");
            $(".login-form1").css("display", "none");
            $(this).css("color", "#ef5b00");
            $("#numberLogin").css("color", "#999999");
        });

        //登录检测
        $("#loginSub").click(function () {
            var str = $("#username").val();
            var cookieStr = $.cookie("user") ? $.cookie("user"):"";
            if(!cookieStr){
                $(".tishi").css("display","block");
            }
            else{
                var userArr = cookieStr.split(",");
                if(userArr.indexOf(str) !== -1){
                    //登录成功
                    $("#username").css("border-color","#999999");
                    $(".tishi").css("display","none").html("用户名或密码错误");
                    $.cookie("loginUser",str,{expires:7,path:"/"});
                    location.href = "index.html";
                }
                else{
                    //登录失败
                    $(".tishi").css("display","block").html("用户名或密码错误");
                    $("#username").css("border-color","#ef5b00");
                }
            }
        });


    });
});
