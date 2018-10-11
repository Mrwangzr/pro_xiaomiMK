
class Toptwolevelmenu {
    constructor(faterDiv,data) {
        this.faterDiv = faterDiv;
        this.view = null;
        this.data = data;
        this.divArr = [];
        this.init();

    }
    init(){
        this.view = $("<div></div>");
        this.view.addClass("top-twoLevelMenu").addClass("clear_fix").appendTo(this.faterDiv);
        this.initDivArr();
    }
    addToTopMenu(src,emStr,strongStr,obj){
        var span = $("<span></span>").css("background-image",src);
        var em = $("<em></em>").html(emStr);
        var strong = $("<strong></strong>").html(strongStr);
        $("<div></div>").append(span).append(em).append(strong).appendTo(obj);
    }
    initDivArr(){
        var indexA = 0;

        for(var key in this.data){
            var dataNum = this.data[key];
            var $div = $("<div></div>");
            for(var variables in dataNum){
                var tagA =  $("<a href='##'></a>");
                var dataN = dataNum[variables];
                this. addToTopMenu(dataN["src"],dataN["name"],dataN["price"],tagA);
                $div.append(tagA);
            }
            this.divArr[indexA] = $div;
            indexA++;
        }
    }
    toView(id){
        this.view.html("");
        this.view.append(this.divArr[id]);
    }
}
function initToptwolevelmenu() {
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

}



