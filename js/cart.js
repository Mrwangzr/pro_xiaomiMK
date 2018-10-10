//路径
require.config({
    paths: {
        jquery: "jquery-1.11.0",
        cookie: "jquery.cookie",
        cookieConverts: "cookieConverts",
    }
});

require(["jquery", "cookie", "cookieConverts"], function ($, cookie, cookieConverts) {

    $(function () {
        //处理用户
        var userInfo = $(".wrap-top").find("ul");
        var loginUser = $.cookie("loginUser");
        if (loginUser) {
            var str = ` <li><a href="##">${loginUser}</a></li>
                <li>&nbsp;|&nbsp;</li>
                <li><a href="##">消息通知</a></li>`;
            userInfo.html(str);
        }

        //处理购物车里的东西
        var cart = JSON.parse(window.localStorage.cart);
        var goods = $(".col-goods");
        //商品总数
        var goodCount = 0;
        for (var i in cart) {
            goodCount++;
            var str = `<input type="hidden" value="${i}" disabled>
                    <div class="col-check"><a href="##" class="checkBoxBtn"></a><input type="checkbox" class="checkBox"></div>
                    <div class="col-img"><img src="${cart[i]["img"]}" alt=""></div>
                    <div class="col-name"><a href="##">${cart[i]["name"]}</a></div>
                    <div class="col-price">${cart[i]["onePrice"]}</div>
                    <div class="col-num">
                        <div class="numCountMachine">
                            <a href="##" class="minus">-</a>
                            <a href="##" class="result">${cart[i]["num"]}</a>
                            <a href="##" class="add">+</a>
                        </div>
                    </div>
                    <div class="col-sum">${parseInt(cart[i]["num"]) * parseInt(cart[i]["onePrice"]) + "元"}</div>
                    <div class="col-edit"><a href="##">×</a></div>`;
            $("<div class='col-body'></div>").html(str).appendTo(goods);
        }
        $(".col-foot").find("span").html(goodCount);
        //合计里的数字
        var money = $(".col-foot").find("em");

        //所有的复选框中将全选按钮剔除
        /* var allcheckList = $(".checkBox");
         var checkList = [];
         for(var i = 1, len = allcheckList.length; i < len ; i ++){
             checkList.push(allcheckList[i]);
         }
         checkList = $(checkList);*/
        var checkList = $(".checkBox");
        var checkBtnList = $(".checkBoxBtn");

        //获得总价的函数
        function getMoney() {
            var moneyCount = 0;
            var checkNum = 0;
            for (var i = 1, len = checkList.length; i < len; i++) {
                if ($(checkList[i]).attr("checked")) {
                    moneyCount += parseInt($(checkList[i]).parent("div").siblings(".col-price").html()) * $(checkList[i]).parent("div").siblings(".col-num").find(".result").html();
                    checkNum++;
                }
            }
            $(".col-foot").find("b").html(checkNum);
            money.html(moneyCount);
        }

        //加减号的事件
        $(".add").on("click", function () {
            var numDiv = $(this).siblings(".result");
            var num = parseInt(numDiv.text()) + 1;
            numDiv.html(num);
            changeNumForStorage($(this), num);
            getMoney();
        });
        $(".minus").on("click", function () {
            var numDiv = $(this).siblings(".result");
            var num = parseInt(numDiv.text()) - 1;
            if (num > 0) {
                numDiv.html(num);
                changeNumForStorage($(this), num);
            }
            getMoney();

        });

        //改变locastorage中的num
        function changeNumForStorage(btn, num) {
            var target = JSON.parse(window.localStorage.cart);
            var parent = btn.parent("div").parent("div");
            var key = parent.siblings("input").val();
            parent.siblings(".col-sum").html(num * parseInt(target[key]["onePrice"]) + "元");
            target[key]["num"] = num;
            window.localStorage.cart = JSON.stringify(target);
        }

        //选择结算的事件
        $(".checkBoxBtn:not('#allCheck')").mouseenter(checkBoxEnter).mouseleave(checkBoxleave);

        $(".checkBoxBtn:not('#allCheck')").on("click", function () {
            var check = $(this).siblings("input");

            if (check.attr("checked")) {
                check.attr("checked", false);
                $(this).css({background: "#fff", "border-color": "#999999"});
                $(this).mouseenter($.proxy(checkBoxEnter, this));
                $(this).mouseleave($.proxy(checkBoxleave, this));
                getMoney();
            }
            else {
                $(this).css({
                    background: "url('../img/cart/huangduigou.png') no-repeat center center",
                    "border-color": "#ff6700"
                });
                check.attr("checked", true);
                $(this).unbind("mouseenter mouseleave");
                getMoney();
            }
        });

        function checkBoxEnter() {
            $(this).css("background", "url('../img/cart/huiduigou.png') no-repeat center center");
        }

        function checkBoxleave() {
            $(this).css("background", "#fff");
        }

        //全选按钮的事件
        $("#allCheck").click(function () {
            if ($(this).siblings("input").attr("checked")) {
                $(checkList).attr("checked", false);
                checkBtnList.css({background: "#fff", "border-color": "#999999"});
                checkBtnList.mouseenter($.proxy(checkBoxEnter, this));
                checkBtnList.mouseleave($.proxy(checkBoxleave, this));
                getMoney();
            } else {
                $(checkList).attr("checked", true);
                checkBtnList.css({
                    background: "url('../img/cart/huangduigou.png') no-repeat center center",
                    "border-color": "#ff6700"
                });
                checkBtnList.unbind("mouseenter mouseleave");
                getMoney();
            }
        });

        //删除按钮的事件
        $(".col-edit").on("click","a",function () {

            var id = $(this).parent("div").siblings("input").val();
            console.log(id);

            var target = JSON.parse(window.localStorage.cart);

            delete target[id];

            window.localStorage.cart = JSON.stringify(target);

            $(this).parent("div").parent("div").remove();
        });
    });
});