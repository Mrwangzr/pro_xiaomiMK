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
   })

    //生成二级菜单的内容

    //二级菜单的效果
    $("#zhezhao").click(function () {
        $(".select1").fadeOut(100);
        $(".select2").fadeOut(100);
        $("#zhezhao").css("display","none");
    });
    $("#btnPlace").click(function () {
        $(".select1").fadeToggle(100,function () {
            if( $("#zhezhao").css("display") == "none")
                $("#zhezhao").css("display","block");
            else
                $("#zhezhao").css("display","none");
        });
    })

    $("#phoneBefore").click(function () {
        $(".select2").fadeToggle(100,function () {
            if( $("#zhezhao").css("display") == "none")
                $("#zhezhao").css("display","block");
            else
                $("#zhezhao").css("display","none");
        });
    })





  /*  var h2 = $("h2");
    var tit_gj = $("#tit_gj");
    var b = $("b");
    var tit_ph = $("#tit_ph");
    var place = $("#place");
    var phone = $("#phone");
    var regSub = $("#regSub");
    var xieyiDiv = $("#xieyiDiv");
    var liLast = $(".lastLi");
    var bottomSpanA = $("#bottom span:first");
    var bottomSpanB = $("#bottom span:last");

    var jianti = $("ul a:first");
    var fanti = $("ul a:nth-of-type(1)");
    var english = $("ul a:nth-of-type(2)");

    fanti.click(function () {
        h2.html("註冊小米帳號");
        tit_gj.html("國家/地區");
        place.val("中国台湾");
        b.html("成功註冊帳號後，國家/地區將不能被修改");
        tit_ph.html("手機號碼");

    })
*/

})