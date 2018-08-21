const config = {
	entry:{
		app:'./js/app.js'
	},
	output:{
		filename:'bundle.js',
		path: '/pages/dist/'
	},
	module:{
		rules:[
			{
				test:'\.js$',
				use:'babel-loader'
			}
		]
	}
}

//module.exports = config;
