$(function () {
    //需求 :
    //1. 渲染一级分类
    //2. 根据默认选中的一级分类渲染二级分类
    //3. 点击一级分类渲染对应的二级分类
    

    // $.ajax({
    //     url:'/category/queryTopCategory',
    //     type: 'get',
    //     dataType: 'json',
    //     success: function (data) {
    //         console.log(data);
    //         //开始后续的业务逻辑
    //     }
    // })

    //1. 渲染一级分类
    //调用
    firstData(function (data) {
        //使用模板引擎渲染数据
        var firstHtml = template('firstData', data);
        $(".cate_left ul").html(firstHtml);


        //2. 根据默认选中的一级分类渲染二级分类
        //存一级分类的id 自定义属性
        var cateId = $(".cate_left ul .now").find('a').attr("data-id");
        secondData(cateId, function (secData) {
            //渲染二级分类
            var secondHtml = template('secondData', secData);
            $(".cate_right ul").html(secondHtml);
        })


    })
    
    
    //3. 点击一级分类渲染对应的二级分类
    // 需要给动态生成的元素绑定事件, 用委托事件
    $(".cate_left ul").on('tap', 'a' ,function (e) {
        //优化性能
        if($(this).parent().hasClass('now')) return false;

        // //更改样式
        $(".cate_left ul li").removeClass('now');
        $(this).parent().addClass('now');
        //获取id
        var cateId = $(this).attr("data-id");
        //根据id再获取对应的二级分类
        secondData(cateId, function (data) {
            $(".cate_right ul").html(template('secondData', data));
        })


        return false;


        
    })
    

})

//一级分类的接口
var firstData = function (callback) {
    $.ajax({
        url:'/category/queryTopCategory',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            //开始后续的业务逻辑
            callback && callback(data);
        }
    })

}

//二级分类
//@parmas:  id: 一级分类id
var secondData = function (id, callback) {
    $.ajax({
        url:'/category/querySecondCategory',
        type: 'get',
        dataType: 'json',
        data:{
            id: id
        },
        success: function (data) {
            callback && callback(data);
        }
    })
}

/*
* 1. 首页静态
* 2. 分类模块
* 3. 搜索中心模块 --- 本地缓存
*    a. 根据已有的历史记录渲染列表---根据预设的key来获取
*    b. 点击添加历史记录, 跳转到搜索列表
*           ①优化1 : 如果有相同记录, 删除相同的一条, 再添加新的
*           ②优化2 : 如果超过10条, 删除最早的一条记录
*           ③优化3 : 追加到前面来  unshift()
*    c. 点击删除记录---委托事件 1,获取对应的索引2,删除对应的数据 删除数组里面的, 更新本地缓存的数据, 重新渲染
*    d. 点击清空记录---委托事件1 localStorage.setItem('lt_history',''), 又重新渲染
*
* 4. 搜索列表模块静态
* 升级作业 : 根据关键字渲染数据
*
*
* 日报说明:
* 1. 目前的项目进度(进度没完成请说明原因)
* 2. 遇到的问题, 以及怎么解决的
*
* 每晚10点之前发群里
* 每天会随机抽取几位同学交作业  : 直接打包public文件
* 周一 : 陈虎  余鑫  叶朕  郑忠真

* */



