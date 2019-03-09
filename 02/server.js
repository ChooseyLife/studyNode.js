const http = require('http')
const fs = require('fs')
const util = require('./Buffer-操作')

http.createServer((req, res) => {
    let boundary = req.headers['content-type'].split(';')[1].split('=')[1]

    let arr = []

    req.on('data', buffer => {
        arr.push(buffer)
    })
    req.on('end', () => {
        let buf = Buffer.concat(arr)
        let post = util.bufSplit(buf, boundary)
        post.pop()
        post.shift()

        post.forEach(b => {
            b = b.slice(2, b.length-2)

            let n = b.indexOf('\r\n\r\n')
            let info = b.slice(0,n).toString()
            let data = b.slice(n+4)

            if(info.indexOf('\r\n')!=-1){
                let res = info.split('\r\n')[0].split(";")
                let name = res[1].split("=")[1]
                let filename = res[2].split("=")[1]
                name = name.substring(1, name.length-1)
                filename = filename.substring(1, filename.length-1)

                fs.writeFile(`upload/${filename}`, err => {
                    if(err){
                        console.log(err)
                    }else {
                        console.log("上传成功")
                    }
                })
            }else {
                // 普通数据
                let name = info.split(";")[1].split("=")[1]
                name = name.substring(1, name.length-1)
            }
        })
        console.log(post)
    })
}).listen(8080)