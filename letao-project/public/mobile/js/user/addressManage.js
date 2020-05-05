$(function () {
    /*
    * 分析:
    * 1. 点击地址框, 弹出城市选择列表  popPicker组件
    * 2. 根据地址栏是否有传值而判断到底是修改地址还是添加地址
    * 3. 点击确认, 表单校验, 根据有传过来的值请求对应的接口数据
    *
    * */

    // 1. 点击地址框, 弹出城市选择列表  popPicker组件
    //① 通过 new PopPicker() 初始化popPicker组件
    var city = new mui.PopPicker({
        //显示的列表
        layer: 3
    })
    //② 设置数据
    city.setData(cityData);
    //③ 点击地址框, 弹出城市选择列表
   $('body').on('click', '.addresss',function () {
        city.show(function (items) {
            console.log(items);
            //判断两个文字相同, 清除一个
            if(items[0].text == items[1].text){
                items[1].text = '';
            }
            $(".addresss").val(items[0].text + items[1].text + items[2].text);

        })
    })


    //2. 根据地址栏是否有传值而判断到底是修改地址还是添加地址
    var addressId = LT.getParams().id;
    if(addressId){
       //操作修改地址的需求
        $(".lt_header h3").html("修改收货地址");
        //渲染地址数据
        getAddressData(function (data) {
            //根据id找对应的数据  filter() 筛选出符合条件的数据, 以数组的形式返回
            var arr = data.filter(function (item, i) {
                return item.id == addressId
            })
            $('[name="recipients"]').val(arr[0].recipients);
            $('[name="postcode"]').val(arr[0].postCode);
            $('[name="address"]').val(arr[0].address);
            $('[name="addressDetail"]').val(arr[0].addressDetail);
        })

    }else {
        $(".lt_header h3").html("添加收货地址");
    }


    //3. 点击确认, 表单校验(自己做), 根据有传过来的值请求对应的接口数据
    $(".btn_register").on("tap", function () {
        var dataStr = decodeURI($("form").serialize());
        console.log(dataStr);

        //表单校验(自己做)

        //根据传值而判断请求的接口地址
        var dataUrl = '/address/addAddress';
        if(addressId){
            //则是修改地址的接口
            dataUrl = '/address/updateAddress'
            //添加id参数
            dataStr += "&id=" + addressId;
        }
        console.log(dataUrl)
        console.log(dataStr);

        editAddressData(dataUrl, dataStr, function (data) {
            if(data.success){
                mui.toast("编辑成功");
                //跳转
                location.href = "address.html";
            }
        })



    })




})

/*
* 上午任务任务 :
* 1. 收获地址
* 2. 添加/修改收获地址
*
* 下午 :  后台管理操作-登录模块
*
* 周六 : 所有同学教mobile文件夹 作业
*
*
* */


var getAddressData = function (callback) {
    LT.loginAjax({
        url:'/address/queryAddress',
        success: function (data) {
            callback && callback(data)
        }
    })

}


var  editAddressData = function (url, data, calbback) {
    LT.loginAjax({
        type:'post',
        url: url,
        data: data,
        success: function (data) {
            calbback && calbback(data);
        }

    })

}