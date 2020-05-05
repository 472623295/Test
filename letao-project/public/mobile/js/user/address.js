$(function () {

    //1. 渲染数据
    getAddressData(function (data) {
        $(".mui-table-view").html(template('addressTpl',{list: data, name: "xiaoming"} ))
    })


    //2. 侧滑是, 点击删除
    $("body").on('tap', '.mui-btn-red', function () {
        //获取当前的地址id
        var addressId = $(this).attr("data-id");
        deleteAddress(addressId, function (data) {
            if(data.success){
                //说明后台删除成功, 重新渲染
                getAddressData(function (data) {
                    $(".mui-table-view").html(template('addressTpl',{list: data, name: "xiaoming"} ))
                })

            }
        })
        
    })
        .on("tap",'.mui-btn', function (e) {
            //点击跳转
            location.href=" addressManage.html"
            //阻止tap的默认事件
            e.detail.gesture.preventDefault();
        })



})

var getAddressData = function (callback) {
    LT.loginAjax({
        url:'/address/queryAddress',
        success: function (data) {
            callback && callback(data)
        }
    })

}


var deleteAddress = function (id, callback) {
    LT.loginAjax({
        url:'/address/deleteAddress',
        type:'post',
        data: {
            id: id
        },
        success: function (data) {
            callback && callback(data);
        }
    })
    
}