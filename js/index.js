//路径
require.config({
    paths: {
        jquery: "jquery-1.11.0",
        cookie: "jquery.cookie",
        cookieConverts: "cookieConverts",
        toptwolevelmenu: "toptwolevelmenu",
        bannerTwoLevelMenu:"bannerTwoLevelMenu"
    }
});

require(["jquery", "cookie", "cookieConverts", "toptwolevelmenu","bannerTwoLevelMenu"], function ($, cookie, cookieConverts, toptwolevelmenu,bannerTwoLevelMenu) {

//顶部的二级菜单
    $(function () {

        var searchNav = $(".search-nav");
        var topMenu =null;
        $.get("../json/topMenu.json", function (data) {
            topMenu = new Toptwolevelmenu(searchNav,data);
        });


        searchNav.on("mouseenter", "li", function () {
            $(".top-twoLevelMenu").slideDown(500);
            var id = parseInt($(this).attr("data-id"));
            topMenu.toView(id);
        });

        searchNav.on("mouseleave", function () {
            $(".top-twoLevelMenu").slideUp(500);
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
    });
});