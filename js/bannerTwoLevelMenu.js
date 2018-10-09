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
            for (var i = 0, len = dataArr.length; i < len; i++) {
                if (!i) {
                    indexB++;
                    $ulArr[indexB].appendTo($div);
                }
                var li =   $("<li></li>");
                li.html(dataArr[i]).appendTo($ulArr[indexB]);
                $("<i></i>").addClass("iconfont").addClass("icon-shoujidaoshouji").css("font-size","30px").appendTo(li);
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

