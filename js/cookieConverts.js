//将cookie字符串转化成json对象
function convertCookieStrToObj(str) {
    //如果是空串
    if(!str){
        //返回一个空对象
        return {}
    }
    return JSON.parse(str);
}

//将json对象转化成cookie字符串

function convertCookieObjToStr(obj) {
    var str = "";
    for(var value in obj){

    }
}