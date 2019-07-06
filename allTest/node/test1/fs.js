let http = require('http');
let fs = require('fs');
http.createServer((req, res) => {
    res.writeHead(200,{'Content-type': 'text/html;charset=utf8'})
    fs.readFile('../office/1.txt',function(err, data){
        if(err){
            throw err;
        }
        res.end(data)
    })
}).listen(8888)