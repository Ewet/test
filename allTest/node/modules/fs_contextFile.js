let http = require('http');
let fs = require('fs');
http.createServer((req, res) => {
	res.writeHead(200,{'Content-type': 'text/html;charset=utf8'})
	// 读取文件
	fs.readFile('../office/1.txt', (err, data) => {
		console.log(data)
	})

	// 创建文件夹
	fs.mkdir('../office/aaa',() => {
		console.log('文件创建成功')
	});

	fs.stat('../office/aaa', (err, statObj) => {
		console.log(statObj)
		// 检测找到的是否为文件夹
		console.log(statObj.isDirectory())
	})

	


	res.end('响应结束')
}).listen(8888)