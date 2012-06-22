{"ts":1339829906124,"silentsave":true,"restoring":false,"patch":[[{"diffs":[[1,"var http = require('http'),\n    url = require('url'),\n    fs = require('fs');\nhttp.createServer(function(req, res) {    \n    var uri = url.parse(req.url);\n    switch(uri.pathname) {\n        case '/':\n            index();\n        break;\n        case '/sse':\n            res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' });\n            res.write(':' + Array(2049).join(' ') + '\\n'); //2kb padding for IE\n            //res.write('data: ' + Date() + '\\n\\n');\n            msg(res, 0);\n            \n            var t = setInterval(function () {\n                //res.write('data: ' + Date() + '\\n\\n');\n                msg();\n            }, 1000);\n\n            res.socket.on('close', function () {\n                clearInterval(t);\n            });\n        break;\n        default:\n            res.writeHead(404);\n            res.end();\n    }\n    \n    function msg(res, i) {\n        return function() {\n            res.write(i += 1);\n        };\n    }\n    \n    function index() {\n        fs.readFile('./index.html', function(err, data) {\n            if(err) {\n                res.writeHead(500);\n                res.end();\n            } else {\n                res.writeHead(200, { 'Content-Type': 'text/html' });\n                res.end(data);\n            }\n        });   \n    }\n}).listen(process.env.PORT || 80);"]],"start1":0,"start2":0,"length1":0,"length2":1340}]],"length":1340}