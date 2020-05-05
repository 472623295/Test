$(function () {
    //公共的js模块

    //进度条

    //ajax开始请求时, 显示进度条  start()
    $(window).ajaxStart(function () {
        NProgress.start();
    })
    //ajax完成请求时, 进度条走完  end()
    $(window).ajaxComplete(function () {
        NProgress.done();
    })
    //禁止进度环
    NProgress.configure({
        showSpinner: false
    })


    //操作模态框 : 把html代码转化为字符串拼接的形式 -->在线html转字符串
    var modalHtml = ['<div class="modal fade bs-example-modal-sm" id="myModal">',
        '    <div class="modal-dialog modal-sm">',
        '        <div class="modal-content">',
        '            <div class="modal-header">',
        '                <!--data-dismiss="modal" 实现关闭效果-->',
        '                <button class="close" data-dismiss="modal"><span>&times;</span></button>',
        '                <h4 class="modal-title">温馨提示</h4>',
        '            </div>',
        '            <div class="modal-body">',
        '                <p class="text-danger"><span class="glyphicon glyphicon-info-sign"></span>您确定退出后台管理系统?</p>',
        '            </div>',
        '            <div class="modal-footer">',
        '                <button class="btn btn-default" data-dismiss="modal">取消</button>',
        '                <button class="btn btn-primary">确定</button>',
        '            </div>',
        '        </div>',
        '    </div>',
        '</div>'].join("");

    //添加到页面
    $('body').append(modalHtml);
    
    //通过js显示模态框
    $(".glyphicon-log-out").on('click', function () {
        $('#myModal').modal().find('.btn-primary').on('click', function () {
            //登出请求
            $.ajax({
                url:'/employee/employeeLogout',
                type:'get',
                dataType:'json',
                success: function (data) {
                    if(data.success){
                        //通过js的方式关闭模态框
                        $("#myModal").modal('hide');
                        location.href = 'login.html';

                    }
                }
            })
        })
        
    })


    //点击操作二级菜单
    $(".itemMenu").on('click', function () {
        $(this).siblings('.child').slideToggle();

    })

})