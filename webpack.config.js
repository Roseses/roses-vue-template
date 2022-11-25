const webpack = require('webpack')
const { Configuration }  = require('webpack')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin")
const dotenv = require('dotenv')
 env = dotenv.config().parsed
// require('dotenv').config({ path: path.resolve(__dirname, './env/.env.' + process.env.NODE_ENV) })
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

/**
 * @type {Configuration}
 */
const config = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: "./src/main.ts",
    output: {
        filename: '[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      port: 9001,
      hot: true,
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
      new webpack.DefinePlugin(envKeys)
    ],
    // externals: {
    //   vue: 'Vue'
    // }
}

module.exports  = config