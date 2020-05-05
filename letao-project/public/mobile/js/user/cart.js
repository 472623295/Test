$(function () {
    //1. 初始化页面, 自动刷新
    //2.点击刷新按钮, 重新再刷新一遍
    //3.侧滑时, 点击删除, 弹出确认框
    //4.侧滑时, 点击编辑, 弹出对话框----选择尺码和数量
    //5.点击复选框, 计算总金额


    //1. 初始化页面, 自动刷新
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",
            down: {
                auto: true, //自动在页面初始化时执行callback
                callback: function () {
                    var that = this;
                    //模拟时间
                    setTimeout(function () {
                        //通过ajax渲染页面
                        cartData(function (data) {
                            console.log(data);
                            $(".mui-table-view").html(template('cart', { data : data}));
                            //释放下拉刷新
                            that.endPulldownToRefresh()
                        })
                    }, 500)
                    //

                }
            }
        }
    });

    //2.点击刷新按钮, 重新再刷新一遍
    $(".fa-refresh").on('tap', function () {
        mui('#refreshContainer').pullRefresh().pulldownLoading();
        $('#cartAmount').html("00.00");
        
    })


    //3.侧滑时, 点击删除, 弹出确认框
    $(".mui-table-view").on('tap', '.mui-btn-red', function () {
        //获取对应的id
        var $this = $(this);
        var id = $this.attr("data-id");
        //显示弹框
        mui.confirm('您是否删除该商品?', '商品删除', ['是', '否'], function(e) {
            if (e.index == 0) {
                //点击确认操作, 请求数据, 根据自定义属性获取对应的id
                LT.loginAjax({
                    type:'get',
                    data:{
                        id: id
                    },
                    url:'/cart/deleteCart',
                    success: function (data) {
                        if(data.success){
                            //说明后台数据删除成功;
                            //页面上的数据通过操作dom删除(原因 : 如果重新渲染数据导致之前选中的状态和计算的金额都被重置了)
                            $this.parent().parent().remove();
                            mui.toast("删除成功");
                            //调用
                            setAmount();
                        }
                        
                    }
                })

            } else {
                //点击否, 关掉当前js对象中的li节点的滑动操作
                mui.swipeoutClose( $this.parent().parent()[0]);
            }
        })
    })


    //4.侧滑时, 点击编辑, 弹出对话框----选择尺码和数量
    $(".mui-table-view").on('tap', '.mui-btn-blue', function () {
        //① 显示弹框
        //④ (先存),再使用自定义属性获取对应的尺码和数量
        var itemObj = this.dataset; //返回值 : 自定义属性集合对象
        //② 分析 : confirm()第一个参数可以解析html标签, 创建模板
        var editHtml = template('edit',itemObj);
        // console.log(editHtml);
        //③ mui中的confirm(), 把 \n 解析成换行了, 使用js把 \n替换掉

        //储存对应的li对象
        var liObj = $(this).parent().parent()[0];

        mui.confirm(editHtml.replace(/\n/g,''), '商品编辑', ['是', '否'], function(e) {
            if (e.index == 0) {
                //点击是, 请求数据
                //获取选中的数量和尺码
                var size = $(".btn_size.now").html();
                var num = $(".p_number input").val();
                LT.loginAjax({
                    url:'/cart/updateCart',
                    type:'post',
                    data:{
                        id:itemObj.id,
                        size: size,
                        num: num
                    },
                    success: function (data) {
                        if(data.success){
                            //说明后台数据修改成功
                            //设置自定义属性, 重置弹框中默认选中的数据
                            itemObj.num = num;
                            itemObj.size = size;
                            //更改页面上的数据, 找到对应的li修改数据
                            $(liObj).find('.number').html( num+'双');
                            $(liObj).find('.size').html('鞋码: '+ size);
                            //修改复选框中的num值
                            $(liObj).find('input').attr("data-num", num);

                            mui.toast("编辑成功");
                            //关键滑动的状态
                            mui.swipeoutClose(liObj);
                            //调用
                            setAmount()
                        }
                    }
                })
            } else {
                mui.swipeoutClose(liObj);
            }
        })
        
    })


    //4.1 尺码的选择
    $("body").on("tap",'.btn_size', function () {
        $(this).addClass("now").siblings().removeClass('now');

    })
    //4.2 数量的选择
    $("body").on("tap", '.p_number span', function () {
        //获取input框里面的值
        var num = $(this).siblings("input").val();
        //获取库存的值---通过自定义获取的值是字符串类型
        var maxNum = parseInt($(this).siblings("input").attr("data-max"));
        if ($(this).hasClass("jian")) {
            if (num == 1) {
                mui.toast("不能再改了")
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




    //5.点击复选框, 计算总金额
    $(".mui-table-view").on('change','[type="checkbox"]', function () {
        //计算公式 : 总金额 = 每一个商品的数量*每一个单价的总和
        setAmount();
    })


})


var cartData = function (callback) {
    LT.loginAjax({
        url: '/cart/queryCart',
        type:'get',
        success: function (data) {
            callback && callback(data);
        }
    })
    
}

var setAmount = function () {
    var $checked = $('[type="checkbox"]:checked');
    var total = 0;//记录总金额
    $checked.each(function (i, item) {
        var num = $(this).attr("data-num");
        var price =$(this).attr("data-price");
        console.log(num);
        total += num * price;
    })
    //保存小数点后两位
    total = total.toFixed(2);

    //直接赋值
    $('#cartAmount').html(total);

}

/*
* 任务 :
* 1. 商品详情模块
* 2. 登录模块
* 3. 购物车模块
*   计算金额思路 : a. :checked 获取选中的jq对象
*                  b. each() 遍历的获取 对应的单价 * 数量 的总和, 使用data-*存储对应的数据
*                  c. 赋值
*                  d. 因为操作编辑和删除时, 都要计算, 建议fengzhuang, 多次调用
*
* 4. 写完了的同学继续往后面写其他的静态页面
*
*周三 : 詹星辰  周力   汤澳  石章雨
*
*
* */