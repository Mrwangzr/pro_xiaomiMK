//路径
require.config({
    paths:{
        jquery : "jquery-1.11.0"
    }
});

//引入依赖文件
require(["jquery"],function ($) {
    $(function () {

        var xieyi = $("#xieyi");
        var label = $("#checkbox");
//改变checkbox的默认样式 检测checkbox的选中状态
        $("#xieyiDiv").on("click","#checkbox,span",function () {

            if(xieyi.is(":checked")){
                xieyi.prop("checked",false);
                label.css({border:"1px solid #999999",background:"none",width:23,height:23});
            }else{
                xieyi.prop("checked",true);
                label.css({border:"none",width:25,height:26,background:"url('img/reg/duigou.png') no-repeat "});
            }
        });

        //生成二级菜单的内容

        //二级菜单的效果
        $("#zhezhao").click(function () {
            $(".select1").fadeOut(100);
            $(".select2").fadeOut(100);
            $("#zhezhao").css("display","none");
        });
        $("#btnPlace").click(function () {
            $(".select1").fadeToggle(100,function () {
                if($("#zhezhao").css("display") === "none")
                    $("#zhezhao").css("display","block");
                else
                    $("#zhezhao").css("display","none");
            });
        });

        $("#phoneBefore").click(function () {
            $(".select2").fadeToggle(100,function () {
                if($("#zhezhao").css("display") === "none")
                    $("#zhezhao").css("display","block");
                else
                    $("#zhezhao").css("display","none");
            });
        })

        //二级菜单内的搜索事件
    })
});