
//index.js : 项目的入口js文件

//1. 使用es6提供了一个导入模块的方式 :  import 接收被暴露出来的对象 from '包名'
import $ from 'jquery'

//2. 经过演示 , 浏览器不识别es6导入模块的方式
//3. 解决 : 通过webpack打包成浏览器能识别的语法
//    a. 根目录下载npm i webpack webpack-cli -D
//    b. 输入命令 : webpack .\src\index.js -o .\dist\main.js --mode development

//使用es6的语法导入css文件 import 'css路径'
import './css/index.css'

//问题 : webpack目前只能处理js文件,类似于jquery.js. 没有办法去处理非js的文件
//解决 : 使用合适的第三方loader加载器

import './css/index.less'
import './css/index.scss'

//导入bootstrap的css
// import '../node_modules/bootstrap/dist/css/bootstrap.css'
//不写node_modules目录, 会自动去node_modules中去找
import 'bootstrap/dist/css/bootstrap.css'

class Person {
  static obj = {name: "莫甘娜"};
}
console.log(Person.obj);

$(function () {
  $("li:odd").css("background", "orange");
  $("li:even").css("background", "red");

})