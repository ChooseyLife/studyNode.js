const http = require('http')
const multiparty = require('multiparty')

http.createServer((req, res) => {
    let form = new multiparty.Form({
        uploadDir: './upload'
    })
    form.parse(req)
    form.on('field', (name, value)=> {
        console.log('字段:', name, value)
    })
    form.on('file', (name, file)=> {
        console.log('文件:', name, file)
    })
    form.on('close', (name, value)=> {
        res.write('解析完成')
        res.end()
    })
}).listen(8080)