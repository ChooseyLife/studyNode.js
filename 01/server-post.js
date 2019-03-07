const http = require('http')
const queryStr = require('querystring')

let server = http.createServer(function(req,res){
    let bufArr = []
    req.on('data', buffer => {
        arr.push(buffer)
        console.log(buffer)
    })
    req.on('end', () => {
        let buffer = Buffer.concat(bufArr)
        let post = queryStr.parse(buffer.toString())
        console.log(post)
    })
})
server.listen(8080)