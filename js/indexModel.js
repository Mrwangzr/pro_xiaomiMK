//banner上的二级菜单
class BannerTowLevelMenu {
    constructor(faterObj, data) {
        this.faterDiv = faterObj;
        this.view = null;
        this.data = data;
        this.divArr = [];
        this.init();
    }

    init() {
        this.view = $("<div></div>");
        this.view.addClass("bannerTwoLevelMenu").addClass("clear_fix").appendTo(this.faterDiv);
        this.initDivArr();
    }

    initDivArr() {
        var indexA = 0;
        for (var key in this.data) {
            var dataStr = this.data[key];

            var dataArr = eval(dataStr);
            var $div = $("<div></div>");
            var $ulArr = [$("<ul></ul>"), $("<ul></ul>"), $("<ul></ul>"), $("<ul></ul>")];
            var indexB = -1;
            var img = ["../img/common/smallimg1.png","../img/common/smallimg2.jpg","../img/common/smallimg3.jpg","../img/common/smallimg4.png","../img/common/smallimg5.png",
                "../img/common/smallimg6.png","../img/common/smallimg7.png","../img/common/smallimg8.png"];
            var imgNum = 0
            for (var i = 0, len = dataArr.length; i < len; i++) {
                if (!i) {
                    indexB++;
                    $ulArr[indexB].appendTo($div);
                }
                var li =   $("<li></li>");
                $("<img/>").attr("src",img[++imgNum]).appendTo(li);
                if(!(imgNum%8)){
                    imgNum = 0;
                }
                li.append(dataArr[i]).appendTo($ulArr[indexB]);
             /*   $("<i></i>").addClass("iconfont").addClass("icon-shoujidaoshouji").css("font-size","30px").appendTo(li);*/

                if((i + 1) % 6===0&&(i+1)!==len){
                    indexB++;
                    $ulArr[indexB].appendTo($div);
                }
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
function initBannerTowLevelMenu() {
    var allGoodListBtn = $(".allGoodListBtn");
    var allGoodList = $(".allGoodList");
    var allGoodMenu = $(".allGoodMenu");
    allGoodList.on("mouseenter", "a", function () {
        allGoodMenu.slideDown(0);
    });

    allGoodList.on("mouseleave", function () {
        allGoodMenu.slideUp(0);
    });
    //banner的二级菜单
    var allGoodMenuUl = $(".allGoodMenuUl");
    var allGoodMenuCont = null;
    $.get("../json/bannerMenu.json", function (data) {
        allGoodMenuCont = new BannerTowLevelMenu(allGoodMenuUl, data);
    });
    //---
    //---
    allGoodMenuUl.on("mouseenter", "a", function () {
        $(".allGoodMenuUl>li>a").css("background", "#3333333");
        $(this).css("background", "#f15b00")
        $(".bannerTwoLevelMenu").show(0);
        var id = parseInt($(this).attr("data-id"));
        allGoodMenuCont.toView(id);
    });

    allGoodMenuUl.on("mouseleave", function () {
        $(".bannerMenuUl>li>a").css("background", "#3333333");
        $(".bannerTwoLevelMenu").hide(0);
    });
    //----
}

//再附带一个banner的轮播图
class Slide{
    constructor(ul,dot){
        this.ul = ul;
        this.imgArr = ul.find("img");
        this.length = this.imgArr.length;
        this.leftBtn = $(' <a href="##" class="bannerBtn leftBtn">&lt;</a>');
        this.rightBtn = $('<a href="##" class="bannerBtn rightBtn">&gt;</a>');
        this.zIndex = 10;
        this.now = 0;
        this.dotList = dot.find(".banner-dot");
        this.init();
    }
    toImg(last,now){
        this.now = now ;
        if(this.now === this.length){
            this.now = 0;
        }
        if(this.now === -1){
            this.now = this.length-1;
        }

        $(this.imgArr[last]).css({
            opacity:0
        });
        $(this.dotList[last]).removeClass("banner-dot1");

        $(this.dotList[this.now]).addClass("banner-dot1");

        $(this.imgArr[this.now]).css({
            opacity:1,
            "z-index": ++this.zIndex
        });
    }
    autoplay(){

        this.timer =  setInterval($.proxy(this.setPlayTimer,this),3000);
    }
    setPlayTimer() {
        this.toImg(this.now,++this.now);
    }
    init(){
        $(this.imgArr[this.now]).css({
            opacity:1
        });
        this.autoplay();

        $(this.ul.parent()).mouseenter($.proxy(this.ulMouseEnter,this));
        $(this.ul.parent()).mouseleave($.proxy(this.ulMouseLeave,this));

        $.each(this.dotList,$.proxy(this.eachDotList,this));

        this.leftBtn.appendTo(this.ul);
        this.rightBtn.appendTo(this.ul);
        this.leftBtn.click($.proxy(this.leftBtnClick,this));
        this.rightBtn.click($.proxy(this.rightBtnClick,this));

    }
    leftBtnClick(){
        this.toImg(this.now,--this.now);

    }
    rightBtnClick(){
        this.toImg(this.now,++this.now);
    }
    eachDotList(i){
        this.dotList.eq(i).on("mouseover",i,$.proxy(this.dotMouseOver,this));
    }

    ulMouseEnter(){
        clearInterval(this.timer);
    }
    ulMouseLeave(){
        this.autoplay();
    }
    dotMouseOver(i){
        this.toImg(this.now,i.data);
    }


}
//闪购下的滑动栏目
class CrossSlip{
    constructor(targetDiv,leftBtn,rightBtn){
        this.div = targetDiv;
        this.leftBtn = leftBtn;
        this.rightBtn = rightBtn;
        this.modelList = this.div.find("a");
        this.width = parseInt(this.modelList.eq(0).find("div").css("width"));
        this.margin = parseInt(this.modelList.eq(0).find("div").css("margin-right"));
        this.leftCss = parseInt(this.div.css("left"));
        this.leftlength = 0;
        this.rightlength =this.modelList.length-4;
        this.init();
    }

    init(){
        this.leftBtn.attr("disabled","disabled");

        this.leftBtn.click($.proxy(this.leftBtnClick,this));
        this.rightBtn.click($.proxy(this.rightBtnClick,this));
    };

    leftBtnClick(){
        var num = this.leftlength>4 ? 4 : this.leftlength;
        console.log(num);
        this.leftlength-=num;
        this.rightlength+=num;
        this.leftCss +=num*(this.width+this.margin);
        this.div.css({
            left:this.leftCss,
            width: (parseInt(this.div.css("width"))-Math.abs(num*(this.width+this.margin)))
        });
        this.disableBtn();

    }

    rightBtnClick(){
        var num = this.rightlength>4 ? 4 : this.rightlength;
        console.log(num);
        this.rightlength-=num;
        this.leftlength+=num;
        this.leftCss -=num*(this.width+this.margin);
        this.div.css({
            left:this.leftCss,
            width: (parseInt(this.div.css("width"))+Math.abs(num*(this.width+this.margin)))
        });
        this.disableBtn();


    }
    disableBtn(){
        if(this.leftlength){
            this.leftBtn.attr("disabled",false);
        }
        else{
            this.leftBtn.attr("disabled",true);
        }
        if(this.rightlength){
            this.rightBtn.attr("disabled",false);
        }
        else{
            this.rightBtn.attr("disabled",true);
        }
    }
}
