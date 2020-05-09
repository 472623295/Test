//webpack的配置文件
//由于webpack是基于node进行构建的, 所以, 在webpack配置文件中, 任何合法的node代码都是支持

const path = require('path');
//导入在内存中生成html页面的插件
const htmlWebpackPlugin = require('html-webpack-plugin');
//该插件的作用: 1. 自动在内存中根据指定的页面生成了一个内存中的页面
//              2. 自动把内存中打包好的js文件追加到页面中

//通过node操作的模块中, 向外暴露出一个配置对象
module.exports = {
    //配置打包模式为开发模式
    mode: "development",
    //配置入口文件
    entry: path.join(__dirname, './src/index.js'),
    //指定你要打包到哪一个目录
    output:{
        path: path.join(__dirname, './dist'), //打包的目录
        filename: 'main.js', //打包后的文件名
    },
    plugins:[ //所有的webpack的插件,一般都要配置到这个节点上
      new htmlWebpackPlugin({
          template: path.join(__dirname, './src/index.html'), //指定的模板路径
          filename: 'index.html'// 设置生成内存页面的名称
      })
  ],
    //配置所有第三方loader模块的
    module:{
      //模块匹配规则
      rules:[
          {test: /\.css$/, use:[ 'style-loader','css-loader','postcss-loader']},
          {test: /\.less$/, use:[ 'style-loader', 'css-loader', 'less-loader']},
        { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
        { test: /\.(jpg|jpeg|png|gif|bmp|svg)$/, use: "url-loader?limit=1000&name=[hash:5][name].[ext]" },
          // 1. 传参 : ?limit=18675-->图片大小, 若图片的字节大于你设置的字节标准, 则显示路径, 否则显示base64格式的
            // 2. 该图片被编译成了唯一的hash值, 类似于DNA, 一共32位, 继续传参设置自己的图片名 : name=[name].[ext]
            // 3. 为了防止图片名重复, 在图片名的前面设置hash值10位 例 : name=[hash:10][name].[ext]
        { test: /\.(ttf|woff2|woff|eot)$/, use: ['url-loader'] },
        { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      

      ]
      
  }
    
}

