//路径
require.config({
    paths: {
        jquery: "jquery-1.11.0",
        cookie: "jquery.cookie",
        cookieConverts: "cookieConverts",
        toptwolevelmenu: "toptwolevelmenu"
    }
});

require(["jquery", "cookie", "cookieConverts", "toptwolevelmenu"], function ($, cookie, cookieConverts, toptwolevelmenu) {

//顶部的二级菜单
    $(function () {

        var searchNav = $(".search-nav");
        var topMenuData = "";
        var topMenu =null;
        $.get("../json/topMenu.json", function (data) {
            topMenuData = data;
            topMenu = new Toptwolevelmenu(searchNav,topMenuData);
        });


        searchNav.on("mouseenter", "li", function () {
            $(".top-twoLevelMenu").slideDown(500);
            var id = parseInt($(this).attr("data-id"));
            topMenu.toView(id);
        });

        searchNav.on("mouseleave", function () {
            $(".top-twoLevelMenu").slideUp(500);
        });


    });
});