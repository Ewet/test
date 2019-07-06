const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-type':'text/plain;charset=utf8'})
    let pathQuery = url.parse(req.url, true).query;
    let name = pathQuery.name;
    let age = pathQuery.age;
    res.end('服务器收到了form表单的数据' + name + age);
}).listen(8888)