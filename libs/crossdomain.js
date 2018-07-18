/* 跨域 
    参考文档：
        - https://mp.weixin.qq.com/s/VWqk6lmQuluOBdo79Xqggg
        - https://github.com/zadzbw/koa2-cors
*/
const cors = require('koa2-cors');
class CrossDomain {
    static async jsonp(ctx) {
        // 前端的参数
        const query = ctx.request.query
        console.log(query)
        // 设置 cookie
        ctx.cookies.set('tokenId', 1)
        /* 
            query.cb 是前后端约定的方法名，后端返回一个直接执行的方法给前端
            前端是用script请求的，返回的方法立即执行，数据作为方法的参数传给前端
        */
        ctx.body = `${query.cb}({"msg":"script jsonp 跨域请求的参数"})`
    }

    // static async CORS(ctx, next) {
    //     // 设置指定的 origin
    //     ctx.set('Access-Control-Allow-Origin', 'http://localhost:80')
    //     // 非简单的 cors , 增加一次‘预检’请求
    //     // 需要设置 Access-Control-Request-Method 和 Access-Control-Allow-Headers
    //     ctx.set('Access-Control-Request-Method', 'GET,POST,PUT,DELETE,OPTIONS')
    //     ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, h')
    //     next()
    // }
    static async CORS() {
        return cors({
            origin: function (ctx) {
                return 'http://localhost:80'
            },
            exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
            maxAge: 5,
            allowMethods: ['GET', 'POST', 'DELETE'],
            allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
        })
    }

}

module.exports = CrossDomain