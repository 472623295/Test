$(function () {
    //点击注册按钮提交数据
    $(".btn_register").on('tap', function () {
        var data = {
            username: $.trim($('[name="username"]').val()),
            password: $.trim($('[name="password"]').val()),
            mobile: $.trim($('[name="mobile"]').val()),
            vCode: $.trim($('[name="vCode"]').val()),
        }
        //非空校验
        if(!data.username) return mui.toast('请输入用户名');
        if(!data.mobile) return mui.toast('请输入手机号');
        if(!/^[1]\d{10}$/.test(data.mobile)) return mui.toast('请输入合法的手机号');

        if(!data.password) return mui.toast('请输入密码');

        var rePass = $.trim($('[name="rePass"]').val());

        if(!rePass) return mui.toast('请再次输入密码');

        if(data.password !== rePass){
            return mui.toast("密码需要一致");
        }

        if(!data.vCode) return mui.toast('请输入认证码');

        //请求数据
        $.ajax({
            type:'post',
            url:'/user/register',
            data: data,
            dataType:'json',
            success: function (data) {
                if(data.success){
                    mui.toast("注册成功");
                    location.href = LT.loginUrl; //跳转到登录页
                }else {
                    mui.toast(data.message);
                }


            }
        })



    })

    //点击获取验证码
    $(".btn_getCode").on('tap', function () {
        //判断 : 当前如果有btn_disabled类名, 阻止后面的程序
        var btn = $(".btn_getCode");
        if(btn.hasClass("btn_disabled")){
            return false;
        }
        LT.loginAjax({
            url:'/user/vCode',
            success: function (data) {
                console.log("ok");
                $('[name="vCode"]').val(data.vCode);
                var time = 60;
                //禁用
               btn.addClass("btn_disabled").html(60 + "秒之后再获取");
                var timeId = setInterval(function () {
                    time--;
                    btn.html(time + "秒之后再获取");
                    if(time<= 0){
                        clearInterval(timeId);
                        btn.removeClass("btn_disabled").html("获取认证码");
                    }

                },1000)

            }
        })

    })
/*
* 任务 :
* 0. 购物车计算
* 1. 会员中心模块
*       a. 渲染用户信息
*       b. 退出登陆操作 , 退出成功, 跳转到登录页
*       c. 注册模块
*       d. 点击账号安全, 操作修改密码模块
*
* 2. 收货地址模块
*       address.html  -->  a. 静态页面(请参考购物车结构)
*                          b. 渲染收货地址数据
*                          c. 点击删除按钮, 请求数据, 实现删除操作
*
        addAddress.html -->a. 静态页面
                           b. 点击确认, 表单校验
*
* */


})