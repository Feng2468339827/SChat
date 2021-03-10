const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "闲聊 - 专注于校园聊天的平台"
    }
  },
  productionSourceMap: false, // 设置是否打包生成map，默认不打包生成
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 需要请求的地址
        changeOrigin: true, // 是否跨域
        ws: false,
        pathRewrite: {
          '^/api': '/' // 替换target中的请求地址,例如请求的时候把'/api'换成'/'
        }
      },
      '/ws': {
        target: 'http://localhost:3000', // 需要请求的地址
        changeOrigin: true, // 是否跨域
        ws: false,
        pathRewrite: {
          '^/ws': '/' 
        }
      }
    }
  },
  css: {
    loaderOptions: {
      // 给 stylus-loader 传递选项
      stylus: {
        // 传入共享全局变量
        import: '~@/assets/styl/standCss.styl'
      }
    }
  },
  configureWebpack: {
    // externals: {
    //   'vue': 'Vue',
    //   'vue-router': 'VueRouter',
    //   'axios': 'axios'
    // },
    // 配置别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  }
}
