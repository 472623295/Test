
$(function () {
    //初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //不显示滚动条
    });

    //操作轮播图
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
    });
    //操作选项卡
    $(".mui-bar-tab a").click(function () {
        $(this).removeClass("mui-active");
        location.href = $(this).attr("href");

    })





})


var LT = {};
LT.loginUrl = '/mobile/user/login.html';
LT.indexUrl = "/mobile/user/index.html";
LT.cartUrl = "/mobile/user/cart.html";
//获取地址栏上的参数
LT.getParams = function () {
    var obj = {};
    var search = decodeURI(location.search); // decodeURI() 解码
    //?key=1&name=za
    //判断有search
    if(search){
        search = search.replace("?", ""); //key=1&name=za
        var searchArr = search.split("&"); //[ "key=1", "name=za"]
        searchArr.forEach(function (item, i) {
            var itemArr = item.split("=");
            obj[itemArr[0]] = itemArr[1];
        })
    }
    return obj;
}

//需要登录的ajax
//@params :   params  对象
LT.loginAjax = function (params) {
    $.ajax({
        url: params.url || '#',
        type: params.type || 'get',
        data: params.data || '',
        datatype: params.dataType || 'json',
        success: function (data) {
            //根据data.error值判断是否登陆
            if(data.error === 400){
                //未登录, 跳转到登录页, 拼接当前的地址, 为了登陆成功, 跳回来
                location.href = LT.loginUrl + "?returnUrl=" + location.href;
                return false;
            }
            //已登录状态 : 正常获取我的数据, 即接口成功的数据
            params.success && params.success(data);
        },
        error: function () {
            mui.toast("服务器繁忙")
        }
    })
}
