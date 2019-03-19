const path = require('path');
// 编译css，自动添加前缀，抽取css到独立文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 复制并压缩html文件 html-webpack-plugin
const HtmlWebPackPlugin = require("html-webpack-plugin");
// 打包前清理源目录文件 clean-webpack-plugin
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = (env, argv) => {
	const devMode = argv.mode !== 'production'
	return {
		module: {
			// 配置使用babel
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader'
					}
				},
				{
					test: /\.css$/,
					use: [
						devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
						'css-loader',
						'postcss-loader'
					]
				},
				{
                    test: /\.html$/,
                    use: [{
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }]
                },
				{
					test: /\.(png|jpg|gif)$/,
					use: [
					  {
						loader: 'file-loader',
						options: {}
					  }
					]
				}
			],
			plugins: [
				new MiniCssExtractPlugin({
				  filename: "[name].css",
				  chunkFilename: "[id].css"
				}),
				new HtmlWebPackPlugin({
					template: "./src/index.html",
					filename: "./index.html"
				}),
				new CleanWebpackPlugin(['dist']),
			]
		},
		entry: [
			// es6 的解析
			"babel-polyfill",
			path.join(__dirname, './src/index.js')
		],
	}
}