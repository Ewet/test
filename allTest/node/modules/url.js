// 引用模块
const http = require('http');
const url = require('url');
// 创建服务器
http.createServer(function(req, res){
// 	const path = url.parse(req.url).pathname;
// 	const host = url.parse(req.url).host;
// 	const href = url.parse(req.url).href;
// 	console.log(path);
// 	console.log(host);
// 	console.log(href);
	console.log(url.parse(req.url));
	res.writeHead(200,{'Content-Type':'text/text;charset=utf8'});
	res.end('服务器链接成功'); // 必须包含的方法
}).listen(8888)


