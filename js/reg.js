//路径
require.config({
    paths: {
        jquery: "jquery-1.11.0",
        search: "search_tools",
        cookie: "jquery.cookie"
    }
});

//引入依赖文件
require(["jquery", "search", "cookie"], function ($, search, cookie) {
    $(function () {

        var xieyi = $("#xieyi");
        var label = $("#checkbox");
//改变checkbox的默认样式 检测checkbox的选中状态
        $("#xieyiDiv").on("click", "#checkbox,span", function () {

            if (xieyi.is(":checked")) {
                xieyi.prop("checked", false);
                label.css({border: "1px solid #999999", background: "none", width: 23, height: 23});
            } else {
                xieyi.prop("checked", true);
                label.css({border: "none", width: 25, height: 26, background: "url('img/reg/duigou.png') no-repeat "});
            }
        });

        //生成二级菜单的内容

        //二级菜单的效果
        $("#zhezhao").click(function () {
            $(".select1").fadeOut(100);
            $(".select2").fadeOut(100);
            $("#zhezhao").css("display", "none");
        });
        $("#btnPlace").click(function () {
            $(".select1").fadeToggle(100, function () {
                if ($("#zhezhao").css("display") === "none")
                    $("#zhezhao").css("display", "block");
                else
                    $("#zhezhao").css("display", "none");
            });
        });

        $("#phoneBefore").click(function () {
            $(".select2").fadeToggle(100, function () {
                if ($("#zhezhao").css("display") === "none")
                    $("#zhezhao").css("display", "block");
                else
                    $("#zhezhao").css("display", "none");
            });
        });

        var select1 = $(".select1");
        var select2 = $(".select2");
        //向列表里添加点击事件
        addClick(select1, $("#place"), $("#zhezhao"));
        addClick(select2, $("#phoneBefore"), $("#zhezhao"));


        //二级菜单内的搜索事件
        //菜单1
        $(".select1 em input").focusin(function () {
            //输入框1的按键事件
            $(this).keyup(function (e) {
                //获得输入框当前的内容
                var str = $(this).val().toLowerCase();
                //检索搜索菜单的函数
                search_tools($(".mark_select1"), select1, str);
            });
        });

//输入框1的失去焦点事件
        $(".select1 em input").focusout(function () {
            $(this).keypress(null);
        })
        //菜单2

        $(".select2 em input").focusin(function () {
            //输入框1的按键事件
            $(this).keyup(function (e) {
                //获得输入框当前的内容
                var str = $(this).val().toLowerCase();
                //检索搜索菜单的函数
                search_tools($(".mark_select2"), select2, str);
            });
        });

//输入框2的失去焦点事件
        $(".select2 em input").focusout(function () {
            $(this).keypress(null);
        });

        //手机号输入框的设置
        var flagPhone = 0;
        $("#phone").focusout(function () {
            //检测手机号的正则
            var regExp = /^[1][3,4,5,7,8][0-9]{9}$/;

            var str = $(this).val();
            //如果填写的手机号不符合条件
            if (str == "") {
                $(".sjtishi").css("display","block").html("请输入手机号码");
            }
            else if (!regExp.test(str)) {
                flagPhone = 0;
                $(".sjtishi").css("display","block").html("手机号码格式错误");
            } else {
                flagPhone = 1;
                $(".sjtishi").css("display","none");
            }

        });

        //提交按钮的设置
        $("#regSub").click(function () {
            if(flagPhone){
                if($("#xieyi").prop("checked")){
                    $(".xytishi").css("display","none");
                    var str = $("#phone").val();
                    var cookieObj = { "phone" :  str};
                    $.cookie("user",JSON.stringify(cookieObj),{expire : 7 , path: "/"});
                    alert("注册成功");
                }
                else{
                    $(".xytishi").css("display","block").html("请您同意用户条款");
                }
            }else{
                if(!$("#xieyi").prop("checked")){
                    $(".xytishi").css("display","block").html("请您同意用户条款");
                }
            }
        });

    });
});
