//路径
require.config({
    paths: {
        jquery: "jquery-1.11.0",
        cookie: "jquery.cookie",
        cookieConverts: "cookieConverts",
        toptwolevelmenu: "toptwolevelmenu",
        indexModel: "indexModel"
    }
});
require(["jquery", "cookie", "cookieConverts", "toptwolevelmenu", "indexModel"], function ($, cookie, cookieConverts, toptwolevelmenu, indexModel) {

    $(function () {

        //顶部二级菜单
        var searchNav = $(".search-nav");
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
        });
        //全部商品二级菜单
        var allGoodListBtn = $(".allGoodListBtn");
        var allGoodList  = $(".allGoodList");
        var allGoodMenu = $(".allGoodMenu");
        allGoodList.on("mouseenter","a",function () {
            allGoodMenu.slideDown(0);
        });

        allGoodList.on("mouseleave",function () {
            allGoodMenu.slideUp(0);
        });
//全部商品的二级菜单
        //banner的二级菜单
        var allGoodMenuUl = $(".allGoodMenuUl");
        var allGoodMenuCont = null;
        $.get("../json/bannerMenu.json", function (data) {
            allGoodMenuCont = new BannerTowLevelMenu(allGoodMenuUl,data);
        });
        //---
        //---
        allGoodMenuUl.on("mouseenter", "a", function () {
            $(".allGoodMenuUl>li>a").css("background","#3333333");
            $(this).css("background","#f15b00")
            $(".bannerTwoLevelMenu").show(0);
            var id = parseInt($(this).attr("data-id"));
            allGoodMenuCont.toView(id);
        });

        allGoodMenuUl.on("mouseleave", function () {
            $(".bannerMenuUl>li>a").css("background","#3333333");
            $(".bannerTwoLevelMenu").hide(0);
        });
        //----
//        顶部固定定位 网页架构原因最后再做
        var goodTag = $(".goodTag1");
        $(document).scroll(function () {
            console.log($(this).scrollTop());
            if($(this).scrollTop()>=177){
                goodTag.slideDown(500);
            }
            else{
                goodTag.slideUp(500);
            }
        });
        //---------
    })
});