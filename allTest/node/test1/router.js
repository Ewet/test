let http = require('http');
http.createServer((req, res) => {
    res.writeHead(200,{'Content-type': 'text/html;charset=utf8'})
    let urlRouter = req.url;
    if(urlRouter.substr(0, 9) === '/student/'){
        let studentid = urlRouter.substr(9);
        console.log(studentid)
        if(/^\d{10}$/.test(studentid)){
            res.end('学生的id为：' + urlRouter.substr(9));
        }else{
            res.end('路由位数不对')
        }
    } else {
        res.end('请检查路由');
    }
}).listen(8888)