var http = require('http'),
    url = require('url'),
    fs = require('fs');
http.createServer(function(req, res) {    
    var uri = url.parse(req.url);
    switch(uri.pathname) {
        case '/':
            index();
        break;
        case '/sse':
            res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' });
            res.write(':' + Array(2049).join(' ') + '\n'); //2kb padding for IE
            //res.write('data: ' + Date() + '\n\n');
            msg();
            
            var t = setInterval(function () {
                //res.write('data: ' + Date() + '\n\n');
                msg();
            }, 1000);

            res.socket.on('close', function () {
                clearInterval(t);
            });
        break;
        default:
            res.writeHead(404);
            res.end();
    }
    
    var i = 0;
    function msg() {
        res.write(String(i += 1));
        i++;
    }
    
    function index() {
        fs.readFile('./index.html', function(err, data) {
            if(err) {
                res.writeHead(500);
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });   
    }
}).listen(process.env.PORT || 80);