//获得搜索框
function search_tools(searchObj,ulObj,searchStr) {

searchObj.html("");

//如果内容不为空
if (searchStr !== "") {
    //显示搜索结果框
    searchObj.css("display","block");
    var regExpStr = "/^(" + searchStr + ")/";
    var regExp = eval(regExpStr);
    //读取当前列表
    var list = ulObj.find("ul").children("li");
    //匹配列表
    for (var i = 0, len = list.length; i < len; i++) {
        if (regExp.test($(list[i]).html().toLowerCase())) {
            var li = $(list[i]).clone(true);
            searchObj.append(li);
        }
    }
}
else{
    //为空清空结果框
     searchObj.css("display","none");
}

}

//循环加事件
function addClick(selectObj,targetObj,zzObj) {
    var list = selectObj.find("ul").children("li");
    for(var i = 0 , len = list.length ; i < len ; i ++){
        $(list[i]).click(function () {
            //区分两个不同的菜单
            var str  = $(this).find("span").html()!=undefined ? $(this).find("span").html() : $(this).html();
            targetObj.html(str);
            selectObj.css("display","none");
            if(zzObj)
            zzObj.css("display","none");
        });
    }
}
