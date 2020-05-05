$(function () {
    //1. 根据已有的历史记录渲染列表---根据预设的key来获取---
    var historyList = getHistory();
    console.log(historyList);//["1","2","3"]
    //渲染
    $(".lt_history").html(template('history',{list: historyList}));

    // $(".search_btn").on("click", function () {
    //     return false;
    //
    // })
    //2.点击添加历史记录, 跳转到搜索列表
    $(".search_btn").on("tap",function () {
        //获取关键字
        var key = $('.search_input').val();
        console.log(key);
        if(!key){
            //提示
            mui.toast("请输入关键字");
            return false;
        }
        //优化1 : 如果有相同记录, 删除相同的一条, 再添加新的
        $(historyList).each(function (i, item) {
            if(item == key){
                historyList.splice(i, 1);
            }
        })
        //优化2 : 如果超过10条, 删除最早的一条记录
        if(historyList.length >= 10){
            historyList.shift();
        }
        //存
        historyList.push(key);
        //存在localStorage里面
        localStorage.setItem("lt_history ", JSON.stringify(historyList));
        //跳转到搜索列表
        location.href = "searchList.html?key="+key;
        //$(".lt_history").html(template('history',{list: historyList}));

        $('.search_input').val("");


    })
    //3.点击删除记录---委托事件 1,获取对应的索引2,删除对应的数据 删除数组里面的, 更新本地缓存的数据, 重新渲染
    $(".lt_history").on("tap",".fa-close", function () {
        var index = $(this).attr("data-index");//获取对应的索引
        historyList.splice(index, 1);//删除数据
        localStorage.setItem("lt_history ", JSON.stringify(historyList));//更新本地缓存的数据
        $(".lt_history").html(template('history',{list: historyList}));//重新渲染
    })

    //4.点击清空记录---委托事件1 localStorage.setItem('lt_history',''), 又重新渲染
    $(".lt_history").on("tap", '.fa-trash' , function () {
        historyList = [];
        localStorage.setItem("lt_history ", JSON.stringify(historyList));//更新本地缓存的数据
        $(".lt_history").html(template('history',{list: historyList}));//重新渲染

    })
})
//获取数据
var getHistory = function () {
    //1.预设一个key---> lt_history , 储存的是json格式的字符串
    var str = localStorage.getItem("lt_history ") || "[]";
    //2.转成json格式的对象  	["1","2","3"]
    var arr = JSON.parse(str);
    //3.返回可以操作的数组
    return arr;

}