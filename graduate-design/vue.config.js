const express = require('express')
const app = express()

var appData = require('./mock/goods.json')
var goods = appData.result

var apiRoutes = express.Router()
app.use('/api',apiRoutes)

module.exports={
    
    lintOnSave: false,
    // devServer: {
    //     overlay: {
    //         warnings: false,
    //         errors: false
    //     },
    //     port:8080,
    //     open:true,
    //     before: function(app){
    //         app.get('/api/goods',(req,res,next)=>{
    //         res.json({result:goods});
    //         })
    //     }
    // }
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
        port:8080,
        open:true,
        proxy: {
            '/goods': {
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true,  // 是否跨域
            },
            '/goods/*': {
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true,  // 是否跨域
            },
            '/users': {
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true,  // 是否跨域
            },
            // '/foo': {
            //     target: '<other_url>'
            // }
        }
    }
}
