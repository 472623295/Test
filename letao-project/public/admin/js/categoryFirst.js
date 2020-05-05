$(function () {
    //1. 渲染一级分类
    //2. 展示分页
    //3. 点击显示模态框, 添加数据


    //1. 渲染一级分类
    window.page = 1;
    var render = function(){
        getfirstData(function (data) {
            // console.log(data);
            $("tbody").html(template("firstData", data));

            //2. 展示分页
            $('.pagination').bootstrapPaginator({
                //对应bootstrap的3版本
                bootstrapMajorVersion: 3,
                //设置控件的对齐方式
                alignment: 'right',
                //设置当前页
                currentPage: window.page,
                //页面按钮的数量
                numberOfPages: 2,
                //总页数 : 总条数 / 每一个显示的数量 , 向上取整
                totalPages: Math.ceil(data.total / data.size),
                //设置分页的文本
                itemTexts: function (type, page, current) {
                    switch(type){
                        case "next":
                            return "下一页";
                            break;
                        case "last":
                            return "尾页";
                            break;
                        case "prev":
                            return "上一页";
                            break;
                        case "first":
                            return "首页";
                            break;
                        case "next":
                            return "下一页";
                            break;
                        case "page":
                            return page;

                    }
                },
                //显示提示信息
                tooltipTitles: function (type, page, current) {
                    switch(type){
                        case "next":
                            return "下一页";
                            break;
                        case "last":
                            return "尾页";
                            break;
                        case "prev":
                            return "上一页";
                            break;
                        case "first":
                            return "首页";
                            break;
                        case "next":
                            return "下一页";
                            break;
                        case "page":
                            return page;

                    }
                },
                //监听点击按钮改变事件
                onPageChanged: function (event, oldPage, newPage) {
                    // console.log(event, oldPage, newPage);
                    window.page = newPage; //获取点击当前页面
                    //重新渲染
                    render();

                }
            })
        })
    }

    render();



    //3. 表单校验
    $('#form').bootstrapValidator({
        //图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //配置需要校验的表单元素
        fields: {
            //通过name指定需要校验的元素
            categoryName: {
                // 配置校验规则, 可以设置多个
                validators: {
                    // 非空校验
                    notEmpty: {
                        message: '一级分类不能为空'
                    },
                    // regexp: {
                    //     regexp: /(\w[-])+$/,
                    //     message: '一级分类不能包含下划线和特殊字符'
                    // }

                }
            }

        },
        //触发submit按钮

    }).on('success.form.bv', function (e) {
        //触发submit按钮
        e.preventDefault();
        var $form = $(this);
        // console.log($form.serialize());

        //请求数据
        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data: $form.serialize(),
            dataType: 'json',
            success: function (data) {
                if(data.success){
                    //关闭模态框
                    $("#addModal").modal('hide');
                    //默认渲染第一页的数据
                    window.page = 1;
                    render();

                }

            }
        })

    })


    // 监听模态框隐藏触发的事件
    $("#addModal").on('hide.bs.modal', function () {
        //重置表单的样式和value值
        $('#form').data('bootstrapValidator').resetForm();
       $('#form').find("input").val('');

    })





})
var getfirstData = function (callback) {
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        type:'get',
        data:{
            page: window.page || 1,
            pageSize: 2
        },
        datatype:'json',
        success: function (data) {
            callback && callback(data);
        }
    })

}