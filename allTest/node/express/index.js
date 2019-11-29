let express = require('express');

let app = express;

app.use("/admin",function(req, res){
    res.write(req.path+ '\n');
    res.end('nihao')
})
app.listen(3000)