$(function () {
    // 1. 默认渲染第一页
    // 2. 分页展示
    // 3. 点击添加分类的弹框, 默认渲染一级分类
    // 4. 点击上传图片
    // 5. 校验后, 点击添加

    // 1. 默认渲染第一页
    window.page = 1;
    var render = function () {
        getSecondData(function (data) {
            console.log(data);
            $("tbody").html(template('list', data));
            //2. 展示分页
            initPagination(data.total, data.size)

        })

    }
    render();

    // 2. 分页展示
    var initPagination = function (total, size) {
        $('.pagination').bootstrapPaginator({
            //对应bootstrap的3版本
            bootstrapMajorVersion: 3,
            //设置当前页
            currentPage: window.page,
            //页面按钮的数量
            numberOfPages: 2,
            //总页数 : 总条数 / 每一个显示的数量 , 向上取整
            totalPages: Math.ceil(total / size),
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
                 console.log(newPage);
                window.page = newPage; //获取点击当前页面
                //重新渲染
                render();

            }
        })

    }

    // 3. 点击添加分类的弹框, 默认渲染一级分类
    getfirstData(function (data) {
        $(".dropdown-menu").html(template("firstData", data)).find('li').on('click', function () {
            //获取选中的分类名称
            var cateName = $(this).find('a').html();
            $(".dropdown-text").html(cateName);

        })

    })

    //4. 上传图片  ①. 导入四个包 ②. 初始化结构  设置对应的name="pic1" ③ 初始化插件
    // 注释 : 分析上传图片的路径是否存在
    $('[type="file"]').fileupload({
        url: '/category/addSecondCategoryPic',
        dataType:'json',
        //上传完成之后的函数
        done: function (e, data) {
            console.log(data);
            var imgUrl = data.result.picAddr;
            $('.imgUrl').attr('src', imgUrl);
        }
    })


    // 5. 表单校验
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

/*
* 任务 :
* 1. 一级分类模块
* 2. 二级分类模块
* 3. 用户管理模块---(请先理清楚一级分类和二级分类的功能, 再来完成这个)
*
*全体同学交作业
* */


})
//渲染二级分类
var getSecondData = function (callback) {
    $.ajax({
        url:'/category/querySecondCategoryPaging',
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
//渲染一级分类--弹框中的一级分类不考虑分页
var getfirstData = function (callback) {
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        type:'get',
        data:{
            page: 1,
            pageSize: 100
        },
        datatype:'json',
        success: function (data) {
            callback && callback(data);
        }
    })

}