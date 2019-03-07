const http = require('http')
const url = require('url')
const querystring = require('querystring')
const fs = require('fs')

let users = {}

http.createServer((req,res) => {
    let pathname  = '', get = {}, post = {};
    if(req.method == 'GET'){
        let {pathname, query} = url.parse(req.url, true)
        path = pathname
        get = query
        complete()
    } else if(req.method == 'POST'){
        let arr = []
        pathname = req.url

        req.on('data', buffer => {
            arr.push(buffer)
        });
        req.on('end', () => {
            let buffer = Buffer.concat(arr)
            post = querystring.parse(buffer.toString())
            complete()
        })

        function complete() {
            if(path == '/reg'){
                let {username, password} = get
                if(users[username]){
                    res.write(JSON.stringify({error: 1, msg: '该用户名已存在'}))
                    res.end()
                }else {
                    users[username] = password
                    res.write(JSON.stringify({error: 0, msg: '注册成功'}))
                    res.end()
                }
            }else if(path == '/login'){
                let {username, password} = get

                if(!users[username]){ 
                    res.write(JSON.stringify({error:1, msg: '该用户未注册'}))
                    res.end()
                }else if(users[username] != password) {
                    res.write(JSON.stringify({error:1, msg: '密码错误'}))
                    res.end()
                }else {
                    res.write(JSON.stringify({error: 0, msg: '登录成功'}))
                    res.end()
                }
            }else {
                fs.readFile(`assets${req.path}`, (err, buffer) => {
                    if(err){
                        res.setHeader(404)
                        res.write('Not Found')
                        res.end()
                    }else {
                        res.write(buffer)
                        res.end()
                    }
                })
            }
        }
    }
}).listen(8080)