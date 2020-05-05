$(function () {
    //1. 拿到对应的id, 根据id渲染对应的商品详情
    var productId = LT.getParams().productId;
    getProductData(productId, function (data) {
        //渲染数据
        console.log(data);
        $("#product_box").html(template("product", data));
        //初始化轮播图
        mui('.mui-slider').slider({
            interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
        });
        //初始化区域滚动
        mui('.mui-scroll-wrapper').scroll({
            indicators: false, //不显示滚动条
        });

        //4.尺码的选择, 数量的选择-->校验,并友好的提示用户
        $("body").on("tap",'.btn_size',function () {
            $(this).addClass("now").siblings().removeClass('now');

        })
        $("body").on("tap", '.p_number span',function () {
            //获取input框里面的值
            var num = $(this).siblings("input").val();
            //获取库存的值---通过自定义获取的值是字符串类型
            var maxNum = parseInt($(this).siblings("input").attr("data-max"));
            if ($(this).hasClass("jian")) {
                if (num == 0) {
                    mui.toast("该商品只能为正整数")
                    return false;
                }
                num--;
            } else {
                if (num >= maxNum) {
                    //移动端的击穿bug : 点击按钮时, 正好点到消息框, 会立即消失
                    //解决 : 延迟处理
                    setTimeout(function () {
                        mui.toast("库存不足");
                    },300)
                    return false;
                }
                num++;
            }
            //赋值
            $(this).siblings("input").val(num);
        })

    })


    //2.尺码的选择

    //3. 数量的选择


    //4.点击加入购物车
    //  a. 非空校验
    //  b. 提交数据 需要登录的提交, 未登录--> 跳转到登录页  已登录-->显示弹框, 提交数据
    $(".btn_addCart").on("tap", function () {
        //校验数据
        var $size = $(".btn_size.now");

        if (!$size.length) {
            mui.toast("请您选择尺码");
            return false;
        }
        //数量
        var num = $(".p_number input").val();
        if (num <= 0) {
            mui.toast("请您选择数量");
            return false;
        }

        //提交数据----未登录--> 跳转到登录页  已登录-->显示弹框, 提交数据
        //调用封装的ajax
        LT.loginAjax({
            url: '/cart/addCart',
            type: 'post',
            data: {
                productId: productId,
                num :num,
                size : $size.html()
            },
            dataType:'json',
            success: function (data) {
                //登录状态
                if(data.success){
                    //显示消息确认框
                    mui.confirm('添加成功, 去看看?', '温馨提示', ['是', '否'], function(e) {
                        if (e.index == 0) {
                            //点击 "是"按钮, 跳转到购物车
                            location.href = LT.cartUrl;
                        } else {
                            //否, 什么都不做
                        }
                    })
                }
            }
        })




    })


})

/*
* 任务 :
* 1. 商品列表模块
* 2. 商品详情静态 + 动态需求
*          a. 拿到对应的id, 根据id渲染对应的商品详情
*          b. 尺码的选择
*          c. 数量的选择 判断最大和最小
*          d. 点击加入购物车---非空校验
*
* 3.登录静态页面--参考mui中的表单组件
*
* 4.升级作业 ----完成登录提交需求  账号 :  vpclub   密码 : 111111
*
*周二 : 王香玉  王瑞  袁家豪   李慧勇
*
*
*
* */


var getProductData = function (id, callback) {
    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        data: {
            id: id
        },
        datatype: 'json',
        success: function (data) {
            callback && callback(data);
        }
    })
}