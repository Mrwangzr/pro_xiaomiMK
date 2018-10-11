function getCart() {
    var cartStr = window.localStorage.cart;
    var cartCount = 0;
    var money = 0;
    if (!cartStr || cartStr == "{}") {
        $(".empty").css("display", "block");
        $(".goodsList").css("display", "none");
        $(".foot").css("display","none");
    } else {
        $(".empty").css("display", "none");
        $(".goodsList").css("display", "block");
        $(".foot").css("display","block");
        var cart = JSON.parse(cartStr);
        var goodsList = $(".goodsList");
        for (var i in cart) {
            cartCount++;
            money += cart[i]["num"]*parseInt(cart[i]["onePrice"]);
            var str = ` <img src="${cart[i]["img"]}" alt="">
                            <p>${cart[i]["name"]}</p>
                            <b><strong>${cart[i]["onePrice"]}</strong> × <em>${cart[i]["num"]}</em></b>`;
            $("<div class='goods'></div>").html(str).appendTo(goodsList);
        }
    }
    $(".cart").find("span").html(cartCount);
    $(".foot").find("span").html(cartCount);
    $(".foot").find("b").html(money);
}

function setCartMenu() {
    getCart();
    $(".cartMenu").on("mouseenter",".cart",function () {

        $(this).css({
            "background": "#ffffff url('../img/index/gouwuche-ho.png') no-repeat 15px center",
            "background-size": "25px 27px",
            "color":"#f15b00"
        });
        $(".cartTwoLevelMenu").slideDown(500);
    }).on("mouseleave",function () {
        $(".cartTwoLevelMenu").slideUp(500,$.proxy(changeCss,this));
    });
}
function changeCss() {
    $(this).find(".cart").css({
        "background": "#424242 url('../img/index/gouwuche.png') no-repeat 15px center",
        "background-size": "25px 27px",
        "color": "#999999"
    } );
}