// 引用模块
const http = require('http');
// 创建服务器
http.createServer(function(req, res){
	res.writeHead(200,{'Content-Type':'text/text;charset=utf8'});
	console.log(req.url);
	res.end('服务器链接成功'); // 必须包含的方法
}).listen(8888)


