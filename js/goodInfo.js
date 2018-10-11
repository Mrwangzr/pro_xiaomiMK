//路径
require.config({
    paths: {
        jquery: "jquery-1.11.0",
        cookie: "jquery.cookie",
        cookieConverts: "cookieConverts",
        toptwolevelmenu: "toptwolevelmenu",
        indexModel: "indexModel",
        cartNav:"cartNav"
    }
});
require(["jquery", "cookie", "cookieConverts", "toptwolevelmenu", "indexModel","cartNav"], function ($, cookie, cookieConverts, toptwolevelmenu, indexModel,cartNav) {



    $(function () {

        var userInfo = $(".nav_right");
        var loginUser = $.cookie("loginUser");
        var id = GetRequest();
        if(loginUser){
            var str = ` <li><a href="##">${loginUser}</a></li>
                <li><span>|</span></li>
                <li><a href="##">注销</a></li>
                <li><span>|</span></li>
                <li><a href="##">消息通知</a></li>`;
            userInfo.html(str);
        }
        function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            if (url.indexOf("?") !== -1) {  //判断是否有参数
                var str = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
                var strs = str.split("=");  //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
                return strs[1];    //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
            }
        }
        //获得全部轮播图的图片
        var imgListStr = [];
        //初始化全部信息
        $.get("../json/phoneInfo.json", function (data) {
            var phoneData = data[id];
            $(".goodTag").find("p").html(phoneData["name"]);
            document.title = phoneData["name"];
            //基本信息
            var goodContentInfo = $(".goodContent-info");
            goodContentInfo.find("h2").html(phoneData["name"])
            goodContentInfo.find("strong").html("<span></span>" + phoneData["desc"]["other"]);
            goodContentInfo.find("strong").find("span").html(phoneData["desc"]["state"]);
            goodContentInfo.find("b").html(phoneData["mainPrice"]);

            //版本
            var goodContentVersion = $(".goodContent-version").find("ul");
            //for(var i= 0 , len = phoneData["version"].length; i < len; i ++){
            for (var i in  phoneData["version"]) {
                //创建模板字符
                var str = `<a href="##"><b>${phoneData["version"][i]["versionStr"]}</b> <span>${phoneData["version"][i]["price"]}</span></a>`;
                //创建li
                $("<li></li>").html(str).appendTo(goodContentVersion);
            }
            //颜色
            var goodContentColor = $(".goodContent-color").find("ul");
            for (var i in  phoneData["color"]) {
                //创建模板字符
                var str = `<a href="##" data-img = "${i}">${phoneData["color"][i]["name"]}</a>`;
                //创建li
                $("<li></li>").html(str).appendTo(goodContentColor);
                imgListStr[i] = phoneData["color"][i]["img"];
            }
            initPage();
        });


        function initPage() {

            //顶部二级菜单
         /*   var searchNav = $(".search-nav");
            var topMenu = null;
            $.get("../json/topMenu.json", function (data) {
                topMenu = new Toptwolevelmenu(searchNav, data);
            });


            searchNav.on("mouseenter", "li", function () {
                $(".top-twoLevelMenu").slideDown(100);
                var id = parseInt($(this).attr("data-id"));
                topMenu.toView(id);
            });

            searchNav.on("mouseleave", function () {
                $(".top-twoLevelMenu").slideUp(100);
            });*/
         initToptwolevelmenu();
            //全部商品二级菜单
            initBannerTowLevelMenu();
//        顶部固定定位+轮播图定位
            var goodTag = $(".goodTag1");
            var goodSlideDiv = $(".goodSlideDiv");
            $(document).scroll(function () {
                if ($(this).scrollTop() >= 177) {
                    //顶部
                    goodTag.slideDown(500);

                }
                else {
                    goodTag.slideUp(500);
                }
                //轮播图
                if ($(this).scrollTop() >= 177 && $(this).scrollTop() <= 847) {
                    var num = ($(this).scrollTop() - 115) / 8 * 10;
                    goodSlideDiv.css("top", num);
                }
            });
            //---------
            //总价计算
            // 版本的计算--------
            //版本行
            var versionP = $(".versionP");
            //版本列表
            var goodVersion = $(".goodContent-version").find("ul");
            //版本价格
            var versionPrice = $(goodVersion.find("li")[0]).find("a").find("span").text();
            //版本名
            var versionStr = $(goodVersion.find("li")[0]).find("a").find("b").text();
            //颜色
            var goodColor = $(".goodContent-color").find("ul");
            var goodColorStr = $(goodColor.find("li")[0]).find("a").text();

            // 初始化价格信息
            function init() {
                versionP.find("span").html(versionStr);
                versionP.find("em").html(goodColorStr);
                versionP.find("b").html(versionPrice);
                $(goodVersion.find("li")[0]).find("a").css("border", "1px solid #ff6700");
                $(goodVersion.find("li")[0]).find("span").css("color", "#999");
                $(goodColor.find("li")[0]).find("a").css("border", "1px solid #ff6700");
                sumPrice();
            }

            //版本事件
            goodVersion.on("click", "li", function (ev) {
                $(this).siblings().find("a").css("border", " border: 1px solid #d7d7d7;");
                $(this).siblings().find("span").css("color", "#d7d7d7");
                var target = $(ev.target);
                target.css("border", "1px solid #ff6700").find("span").css("color", "#999999");
                versionStr = target.find("b").text();
                versionPrice = target.find("span").text();

                //写入
                versionP.find("span").html(versionStr);
                versionP.find("b").html(versionPrice);

                sumPrice();

            });
            //颜色事件
            //轮播图初始化
            var imgArr = eval(imgListStr[0]);
            var goodSlideUl = $(".goodSlideUl");
            dotNum(imgArr.length);
            for (var i = 0, len = imgArr.length; i < len; i++) {
                $("<img/>").attr('src',imgArr[i]).attr("alt","").appendTo(goodSlideUl);
            }
            var slide = new Slide(goodSlideUl, $(".dotList"));
            //切换商品颜色
            goodColor.on("click", "li", function (ev) {
                $(this).siblings().find("a").css("border", " border: 1px solid #d7d7d7;");
                $(this).siblings().find("span").css("color", "#d7d7d7");
                var target = $(ev.target);
                target.css("border", "1px solid #ff6700").find("span").css("color", "#999999");
                goodColorStr = target.text();

                //写入
                versionP.find("em").html(goodColorStr);

                //改变轮播图的图片
                var imgNum = $(this).find("a").attr("data-img");
                imgArr = eval(imgListStr[imgNum]);
                goodSlideUl.html("");
                dotNum(imgArr.length);
                for (var i = 0, len = imgArr.length; i < len; i++) {
                    $("<img/>").attr('src',imgArr[i]).attr("alt","").appendTo(goodSlideUl);
                }
                slide = new Slide(goodSlideUl,$(".dotList"));
            });

            //额外服务的计算---------
            var serviceP = $(".serviceP");
            var goodService = $(".goodContent-service").find("ul");
            var goodServicePrice = 0;
            var goodServiceStr = "";
            //列表第一个的边框
            //给第一个列表特殊化
            $(goodService.find("li")[0]).css({height: $(goodService.find("li")[0]).css("height") + 1, "top": "-1px"});

            goodService.on("click", "a", function () {
                //取消
                if ($(this).find("input").prop("checked")) {
                    $(this).find("input").prop("checked", false);
                    $(this).find("li").css("border", "1px solid #d7d7d7");
                    $(this).find("h3").css("color", "#666666");
                    serviceP.css("display", "none");
                    goodServicePrice = 0;

                    sumPrice();

                }//确认
                else {
                    //样式
                    var other = $(this).siblings();
                    $(this).find("input").prop("checked", true);
                    other.find("input").prop("checked", false);
                    $(this).find("li").css({"border": "1px solid #ff6700"});
                    other.find("li").css({
                        "border": "1px solid #d7d7d7",
                    });
                    $(this).find("h3").css("color", "#ff6700");
                    other.find("h3").css("color", "#666666");
                    //写入价格
                    goodServicePrice = $(this).find("b").text();
                    goodServiceStr = $(this).find("h3").text();
                    serviceP.css("display", "block");
                    serviceP.find("strong").html(goodServiceStr);
                    serviceP.find("b").html(goodServicePrice);

                    sumPrice();
                }

                // $(this).find("li").css("border","1px solid #ff6700");
                /* $(this).siblings().find("li").css({
                     "border":"1px solid #d7d7d7",
                     "border-top":"none"
                 });*/

            });

            //计算价格
            function sumPrice() {
                $(".goodContent-money").find("h4").html("总计 : " + (parseInt(goodServicePrice) + parseInt(versionPrice)) + "元");
            }

            //改变图片点阵的数量
            function dotNum(num) {
                var dotList = $(".dotList");
                dotList.html("");
                for (var i = 0; i < num; i++) {

                    var a =  $('<a href="##" class="banner-dot"></a>');
                    a.appendTo(dotList);
                    if(i === num-1){
                        a.addClass("lastLi-common");
                    }
                    if(!i){
                        a.addClass("banner-dot1");
                    }
                }
            }


            init();

            //加入购物车
            /*
            * {
            *   "商品1": {
            *       img: ---,
            *       name: ---,
            *       onePrice:---,
            *       num: --.
            *   }
            * }
            *
            * */
            //
            $(".toCart").click(function () {
                var storage = window.localStorage;
                var cartObj = {};
                var num = 0;
                if(storage.cart){
                    cartObj = JSON.parse(storage.cart);
                    if(cartObj[id]){
                        console.log(cartObj[id]["num"]);
                        num = parseInt(cartObj[id]["num"]);
                    }
                }
                var oneGood = {
                    "img" : $(slide.imgArr[0]).attr("src"),
                    "name" : $(".goodContent-info").find("h2").text()+versionP.find("span").text()+versionP.find("em").text(),
                    "onePrice" : versionP.find("b").text(),
                    "num" : num+1
                }
                cartObj[id] = oneGood;
                storage.cart = JSON.stringify(cartObj);
                alert("加入购物车成功");
                location.href  = "cart.html";
            });
            //购物车
            setCartMenu();
        }
    });
});