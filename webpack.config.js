const { Configuration }  = require('webpack')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin")

/**
 * @type {Configuration}
 */1
const config = {
    mode: "development",
    entry: "./src/main.ts",
    output: {
        filename: '[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      port: 9001,
      proxy: {

      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: "vue-loader" 
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.less$/, //解析 less
          use: ["style-loader", "css-loader", "less-loader"],
        },
        {
          test: /\.ts$/,  //解析ts
          loader: "ts-loader",
          options: {
              configFile: path.resolve(process.cwd(), 'tsconfig.json'),
              appendTsSuffixTo: [/\.vue$/]
          },
        }
      ]
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.vue', '.js', '.ts']
    },
    stats: 'errors-only',
    plugins: [new htmlWebpackPlugin({
        template: "./public/index.html"
      }),
      new VueLoaderPlugin(),
      new CleanWebpackPlugin(),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo:{ //美化样式
            messages:['You application is running here http://localhost:9001']
        }       
      }),      
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    // externals: {
    //   vue: 'Vue'
    // }
}

module.exports  = config