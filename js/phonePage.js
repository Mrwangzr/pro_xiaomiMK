//路径
require.config({
    paths: {
        jquery: "jquery-1.11.0",
        cookie: "jquery.cookie",
        cookieConverts: "cookieConverts",
        toptwolevelmenu: "toptwolevelmenu",
        indexModel: "indexModel",
        cartNav: "cartNav"
    }
});
require(["jquery", "cookie", "cookieConverts", "toptwolevelmenu", "indexModel", "cartNav"], function ($, cookie, cookieConverts, toptwolevelmenu, indexModel, cartNav) {

    $(function () {

        setCartMenu();
        initToptwolevelmenu();
        initBannerTowLevelMenu();
        var slide = new Slide($(".banner-right-img"),$(".banner-right-dot"));

        var divXiaomi = $(".xiaomishouji");
        var divHongmi = $(".hongmishouji");

        $.get("../json/phonePage.json",function (data) {
            init(data);
        });

        function init(data) {
       /*     var bigXiaomi = divXiaomi.find(".phoneTagBig");
            var smallXiaomi = divXiaomi.find(".phoneTagSmall");
            var bigHongmi = divHongmi.find(".phoneTagBig");
            var smallHongomi = divHongmi.find(".phoneTagSmall");*/


            var xiaomiArr = data["xiaomishouji"];
            var hongmiArr = data["hongmishouji"];

            setPhoneDiv(xiaomiArr,0,divXiaomi);
            setPhoneDiv(hongmiArr,1,divHongmi);

        }
        function setPhoneDiv(arr,flag,target) {
            var num = 0;
            var small = 1;
            for(var i in arr){
                var str = "";
                var div =   $("<div class='goAnimation'></div>");
                if(num<=flag){
                    //大标签
                    str = ` <img src="${arr[i]['img']}" alt="">
                <div>
                    <h3>${arr[i]["name"]}</h3>
                    <h4>${arr[i]["desc"]}</h4>
                    <p><span>${parseInt(arr[i]["price"])}</span>元起<em>${arr[i]["old"]}</em></p>
                    <a href="##">了解产品></a>
                </div>`;
                    div.addClass("phoneTagBig");
                }
                else{
                    //小标签
                    str=`<img src="${arr[i]['img']}" alt="">
                <div>
                    <div>
                      <h3>${arr[i]["name"]}</h3>
                        <h4>${arr[i]["desc"]}</h4>
                    </div>
                    <p><span>${parseInt(arr[i]["price"])}</span>元<em>${arr[i]["old"]}</em></p>
                </div>`;
                    div.addClass("phoneTagSmall");
                    if(!(small%2)){
                        div.addClass("phoneTagSmall-nm");
                    }
                    small++;
                }
                div.html(str).appendTo(target);
                num++;
            }
        }
    });
});