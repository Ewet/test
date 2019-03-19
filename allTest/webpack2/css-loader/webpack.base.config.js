var path = require('path');
module.exports = {
	entry: {
		"main": "./src/pages/main.js"
	},
	output: { 
		path: path.resolve('./dist'), // 相对路径转绝对路劲
		filename: './build.js'
	},
	watch: true
}