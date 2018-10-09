//路径
require.config({
    paths: {
        jquery: "jquery-1.11.0",
        cookie: "jquery.cookie",
        cookieConverts: "cookieConverts",
        toptwolevelmenu: "toptwolevelmenu",
        indexModel:"indexModel"
    }
});

require(["jquery", "cookie", "cookieConverts", "toptwolevelmenu","indexModel"], function ($, cookie, cookieConverts, toptwolevelmenu,indexModel) {

//顶部的二级菜单
    $(function () {

        var searchNav = $(".search-nav");
        var topMenu =null;
        $.get("../json/topMenu.json", function (data) {
            topMenu = new Toptwolevelmenu(searchNav,data);
        });


        searchNav.on("mouseenter", "li", function () {
            $(".top-twoLevelMenu").slideDown(100);
            var id = parseInt($(this).attr("data-id"));
            topMenu.toView(id);
        });

        searchNav.on("mouseleave", function () {
            $(".top-twoLevelMenu").slideUp(100);
        });
    //banner的二级菜单
        var bannerLeft = $(".bannerMenuUl");
        var bannerMenu = null;
        $.get("../json/bannerMenu.json", function (data) {
            bannerMenu = new BannerTowLevelMenu(bannerLeft,data);
        });
        bannerLeft.on("mouseenter", "a", function () {
            $(".bannerMenuUl>li>a").css("background","#3333333");
            $(this).css("background","#f15b00")
            $(".bannerTwoLevelMenu").show(0);
            var id = parseInt($(this).attr("data-id"));
            bannerMenu.toView(id);
        });

        bannerLeft.on("mouseleave", function () {
            $(".bannerMenuUl>li>a").css("background","#3333333");
            $(".bannerTwoLevelMenu").hide(0);
        });
    //轮播图
        var slide = new Slide($(".banner-right-img"),$(".banner-right-dot"));

        //倒计时
        var daojishi = $(".daojishi");
        setInterval(function () {
            var date  =  new Date();
            var shi =date.getHours();
            var fen = date.getMinutes();
            var miao = date.getSeconds();

            var nowHours = shi-12>0 ? 24-(shi-12) : 12-shi;
            var nowFen = 60 - fen ;
            var nowSec = 60 - miao;

            var spanList = daojishi.find("p>span");
            $(spanList[0]).html(nowHours);
            $(spanList[1]).html(nowFen);
            $(spanList[2]).html(nowSec);
        },1000);
        //倒计时后面的商品列表
        var sgGoodlong  = $(".sgGoodlong");
        var sgLeftBtn = $(".sgBtn-left");
        var sgRightBtn = $(".sgBtn-right");
        var crossSlip = new CrossSlip(sgGoodlong,sgLeftBtn,sgRightBtn);
        console.log(crossSlip);
        //返回顶部

        $(document).scroll(function (ev) {
            if($(this).scrollTop()>3000){
                $(".returnTop").css("display","block");
            }
            else{
                $(".returnTop").css("display","none");
            }
        });
        $(".returnTop").click(function () {
           $(document).scrollTop(0);
        });
    });
});