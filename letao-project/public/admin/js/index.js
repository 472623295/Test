$(function () {
    //1. 下载导入ECharts.js
    //2. 准备好容器, 初始化ECharts

    //绘制柱状图
    barCharts();

    //绘制饼状图
    picCharts();




})

var barCharts = function () {
    //基于准备好dom, 初始化echarts实例
    var myCharts = echarts.init(document.getElementById("first"));

    //模拟后台数据
    var data = [
        { name: '一月', value: '300'},
        { name: '二月', value: '200'},
        { name: '三月', value: '400'},
        { name: '四月', value: '500'},
        { name: '五月', value: '250'},
    ]
    //把数据分成两个数组
    var xData = [], yData = [];
    data.forEach(function (item, i) {
        xData.push(item.name)
        yData.push(item.value)

    })

    //配置图标的参数和数据
    var option = {
        title: {
            text: '2020注册人数'
        },
        //悬浮上去所显示的信息
        tooltip: {},
        //配置状态图的说明
        legend: {
            data:['注册人数']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '注册人数',
            type: 'bar',
            data: [5, 20, 100, 10, 10, 20]
        }]
    };

    //重置参数
    option.xAxis.data = xData;
    option.series[0].data = yData;
    //3. 显示图标
    myCharts.setOption(option);

}

var picCharts = function () {
    var myCharts = echarts.init(document.getElementById("second"));

    var option = {
        title: {
            text: '热门品牌销售',
            subtext: '2020年6月',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            // a  : name名
            // b  : data中的name
            // c  : data中的value
            // d  : 占比
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['匡威', '阿迪', '乔丹', '耐克', '李宁', 'a锥']
        },
        series: [
            {
                name: '数据',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: 335, name: '匡威'},
                    {value: 310, name: '阿迪'},
                    {value: 234, name: '乔丹'},
                    {value: 135, name: '耐克'},
                    {value: 548, name: '李宁'},
                    {value: 248, name: 'a锥'},

                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    myCharts.setOption(option);
}


/*
* 任务 ;
*   1. 登录的进度条
*   2. 首页的图表
*   3. 点击右上角弹出模态框---静态---动态, 请求成功, 跳到登录页
*   4. 一级分类
*
* 中奖的同学 : 刘非 , 涂天亮,  童品樵,  徐正本
*
*
* */


