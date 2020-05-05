$(function () {
    //点击确认按钮, 获取表单数据, 请求接口
    $(".mui-btn-primary").on('tap', function () {
        //1. 获取表单序列化数据  serialize() -->基于name属性来作为key值
        var data = $("form").serialize();
        //2. 非空校验

        //3. 请求数据
        $.ajax({
            url:'/user/login',
            type:'post',
            data:data,
            datatype: 'json',
            success: function (data) {
                if(data.success){
                    //登陆成功
                    //跳回去 : 截取传过来的地址
                    var url = location.search.replace("?returnUrl=", "");
                    //判断有拼接地址, 才跳回去
                    if(url){
                        location.href = url;
                    }else {
                        //没有地址调换到个人中心
                        location.href = LT.indexUrl;
                    }
                }else {
                    //登录失败
                    mui.toast(data.message);
                }
            }
        })

    })





})