$(function () {

    /*
* 1. 页面初始化时, 关键字在输入框内
* 2. 页面初始化完成之后, 根据关键字渲染第一页的数据4条
* 3. 点击搜索根据新关键字重新渲染
* 4. 点击排序, 根据排序的选项, 重新进行排序, 选中时默认是升序, 再点击同一个是降序
* 5. 当用户下拉时要刷新, 根据当时的条件重置排序功能
* 6. 当用户上拉的时候, 加载下一页, 没有数据要友好的提醒用户
* */


    window.page = 0;

    //1. 页面初始化时, 关键字在输入框内
    //http://localhost:3306/myMobile/searchList.html?key=1&name=za
    // var getParams = function () {
    //     var obj = {};
    //     var search = decodeURI(location.search); // decodeURI() 解码
    //     //?key=1&name=za
    //     //判断有search
    //     if(search){
    //         search = search.replace("?", ""); //key=1&name=za
    //         var searchArr = search.split("&"); //[ "key=1", "name=za"]
    //         searchArr.forEach(function (item, i) {
    //             var itemArr = item.split("=");
    //             obj[itemArr[0]] = itemArr[1];
    //         })
    //     }
    //     return obj;
    // }

    var urlParams = LT.getParams();
    //赋值
    $(".search_input").val(urlParams.key);

    // 2. 页面初始化完成之后, 根据关键字渲染第一页的数据4条
    // getData({
    //     proName: urlParams.key,
    //     page: 1,
    //     pageSize: 4
    // }, function (data) {
    //     //渲染数据
    //     $("#product_box").html(template("list", data));
    //
    // })

    //3. 点击搜索根据新关键字重新渲染
    $(".search_btn").on('tap', function () {
        // //获取关键字
        // var key = $.trim($(".search_input").val());
        // //非空校验
        // if(!key) return mui.toast("请输入关键字");
        // //重新渲染
        // getData({
        //     proName: key,
        //     page: 1,
        //     pageSize: 4
        // }, function (data) {
        //     //渲染数据
        //     $("#product_box").html(template("list", data));
        //     //优化 : 点击搜索触发下拉刷新
        //     mui('#refreshContainer').pullRefresh().pulldownLoading();
        //
        // })
        mui('#refreshContainer').pullRefresh().pulldownLoading();




    })

   // 4. 点击排序, 根据排序的选项, 重新进行排序, 选中时默认是升序, 再点击同一个是降序
    $(".lt_order a").on('tap', function () {
        //① 改变当前的样式
        //判断如果当前已经选中了, 改变箭头
        if($(this).hasClass('now')){
            var arrow = $(this).find("span");
            //再次判断是下箭头, 更换上箭头
            if(arrow.hasClass('fa-angle-down')){
                arrow.removeClass('fa-angle-down').addClass('fa-angle-up');
            }else {
                arrow.removeClass('fa-angle-up').addClass('fa-angle-down');
            }
        }else {
            $(this).addClass('now').siblings().removeClass('now').find('span').removeClass("fa-angle-up").addClass('fa-angle-down');
        }

        //②点击获取对应的参数名, 根据自定义属性存对应的参数名
        // var type = $(this).attr('data-type');
        // //获取对应的参数值 , 根据箭头的方向传值
        // var value = $(this).find('span').hasClass('fa-angle-up') ? 1 : 2;
        // //获取对应的key值
        // var key = $.trim($(".search_input").val());
        // //非空校验
        // if(!key) return mui.toast("请输入关键字");
        // var params= {
        //     proName: key,
        //     page:1,
        //     pageSize: 4
        // }
        // //追加参数
        // params[type] = value;
        // getData(params, function (data) {
        //     //渲染数据
        //     $("#product_box").html(template("list", data));
        // })

        //重置上拉加载
        // mui('#refreshContainer').pullRefresh().refresh(true);
        //直接触发下拉刷新
        mui('#refreshContainer').pullRefresh().pulldownLoading();

    })


    //5. 当用户下拉时要刷新, 根据当时的条件重置排序功能
    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            //下拉刷新
            down : {
                auto: true,//可选,默认false.首次加载自动下拉刷新一次, 自动执行callback
                callback :function () {
                    var that = this;
                    setTimeout(function () {
                        //重置排序的样式
                        // $('.lt_order a:first').addClass('now').siblings().removeClass('now').find('span').removeClass("fa-angle-up").addClass('fa-angle-down');
                        //②点击获取对应的参数名, 根据自定义属性存对应的参数名
                        var type = $(".lt_order a.now").attr('data-type');
                        //获取对应的参数值 , 根据箭头的方向传值
                        var value = $(".lt_order a.now").find('span').hasClass('fa-angle-up') ? 1 : 2;
                        //获取对应的key值
                        var key = $.trim($(".search_input").val());
                        //非空校验
                        if(!key) {
                            //释放下拉刷新
                            that.endPulldownToRefresh();
                            $("#product_box").html('');
                            return mui.toast("请输入关键字");
                        }
                        //渲染数据
                        var params = {
                            proName: key,
                            page: 1,
                            pageSize: 4
                        };
                        params[type] = value;
                        getData(params, function (data) {
                            //渲染数据
                            $("#product_box").html(template("list", data));

                        })

                        //释放下拉刷新
                        that.endPulldownToRefresh();
                        //重置上拉加载, 传true
                        that.refresh(true);
                    },500)

                }
                
            },
            //上拉加载
            up:{
                callback: function () {
                    var that = this;
                    window.page++;
                    //②点击获取对应的参数名, 根据自定义属性存对应的参数名
                    var type = $(".lt_order a.now").attr('data-type');
                    //获取对应的参数值 , 根据箭头的方向传值
                    var value = $(".lt_order a.now").find('span').hasClass('fa-angle-up') ? 1 : 2;
                    //获取对应的key值
                    var key = $.trim($(".search_input").val());
                    //非空校验
                    if(!key) return mui.toast("请输入关键字");
                    var params= {
                        proName: key,
                        page:window.page,
                        pageSize: 4
                    }
                    //追加参数
                    params[type] = value;
                    getData(params, function (data) {

                        setTimeout(function () {
                            //追加数据
                            $("#product_box").append(template("list", data));
                            //判断 : 根据data里面有没有数据而显示对应的提示语
                            if(data.data.length){
                                //结束上拉加载, 默认值: false
                                that.endPullupToRefresh();
                            }else {
                                that.endPullupToRefresh(true);
                            }

                        },500)
                    })






                    
                }
            }
        }
    });




})

//@params: obj 传过去的参数
var getData = function (obj, callback) {
    $.ajax({
        url:'/product/queryProduct',
        data:obj,
        type:'get',
        dataType: 'json',
        success: function (data) {
            window.page = data.page;
            callback && callback(data);
        }
    })

}