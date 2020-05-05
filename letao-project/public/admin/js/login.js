$(function () {
    /*
    * 表单校验插件 : bootstrapValidator.js
    * 1. 导入五个包
    * 2. 使用插件的结构条件 : form表单 --> class : form-group  --> input控件中有name名, class: form-control  , 在label标签中设置class名 : control-label  -->  按钮 : submit
    * 3. 初始化当前的表单验证
    *
    *
    * */
    $('#login').bootstrapValidator({
        // 默认的提示消息
        // message: 'This value is not valid',
        //图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //配置需要校验的表单元素
        fields: {
            //通过name指定需要校验的元素
            username: {
                // 配置校验规则, 可以设置多个
                validators: {
                    // 非空校验
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //校验长度
                    stringLength: {
                        min: 2,
                        max: 10,
                        message: '用户名长度必须在2到10位之间'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: '用户名只能包含大写、小写、数字和下划线'
                    },
                    //校验规则名 : 处理后台所响应回来的数据
                    callback: {
                        message: "用户名不存在"
                    }

                }
            },
            password:{
                validators:{
                    notEmpty: {
                        message: "不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 15,
                        message: "密码6-15字符"
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }

        },
        //触发submit按钮

    }).on('success.form.bv', function (e) {
        //触发submit按钮
        e.preventDefault();
        var $form = $(this);
        console.log($form.serialize());

        //请求数据
        $.ajax({
            url:'/employee/employeeLogin',
            type:'post',
            data: $form.serialize(),
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if(data.error === 1000) {
                    //说明 : 用户名不存在
                    // 四种状态 : 未校验 NOT_VALIDATED  校验失败  INVALID  校验成功 VALID, 正在校验中 VALIDATING
                    //设置校验失败的状态  updateStatus('要设置的元素name名','修改什么状态', "要验证的校验规则名"), 基于bootstrapValidator组件来调用
                    $form.data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')



                }else if(data.error === 1001){
                    //说明 : 密码错误
                    $form.data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')

                }else  if(data.success === true){
                    //跳转到首页
                    location.href = "index.html";
                }
            }
        })

    })




    //点击重置
    $('[type="reset"]').on('click', function () {
        $('#login').data('bootstrapValidator').resetForm();

    })

})