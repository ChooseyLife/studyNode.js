const http = require('http')

let allowOrigin = {
    'http://localhost': true,
    'http://aaa.com': true
}

http.createServer((req, res) => {
    // 设置资源可被白名单请求
    if(allowOrigin[req.headers.origin]){
        res.setHeader('access-control-allow-origin', '*')
    }
    res.write('{a:b,c:d}')
    res.end()
}).listen(8080)