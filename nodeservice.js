const Service = require('node-windows').Service

const svc = new Service({
    name: "nodeBasicServer",
    description: "Web Server",
    script: "C:\\xampp\\htdocs\\bauereg\\api\\app.js"
})

svc.on('install', () => {
    svc.start()
})

svc.install()