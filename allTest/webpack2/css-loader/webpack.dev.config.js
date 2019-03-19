var path = require('path');
module.exports = {
	entry: {
		"main": "./src/pages/main.js"
	},
	output: { 
		path: path.resolve('./dist'), // 相对路径转绝对路劲
		filename: './build.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.(jpg|png|jpeg|gif|svg)$/,
				loader: 'url-loader?limit=189899' ,//如果图片大小小于limit值，则编译成一个base64格式图片，大于的话编译成相应格式
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader'
			},
		]
	}
}