module.exports = {
  mode: 'development',
  entry: './main.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // 将代码打包成兼容代码
            plugins: [
              [
                "@babel/plugin-transform-react-jsx", // jsx 转换
                { pragma: "ToyReact.createElement" }, // 将jsx编译成对应的函数
              ]
            ]
          }
        }
      }
    ]
  },
  optimization: {
    minimize: false, // 是否压缩
  }
}