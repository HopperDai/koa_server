const Koa = require('koa')
const config = require('./config')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const koaStatic = require('koa-static')
const Router = require('koa-router')
const cors = require('koa2-cors')

const app = new Koa()
const router = new Router()

// 第三方中间件
app.use(bodyParser()) // post 请求，数据解析
app.use(koaStatic(path.resolve(__dirname, './dist'))) // 处理静态资源，前端build好的目录
router.use('/api/', require('./routers')) // 路由
app.use(router.routes()).use(router.allowedMethods())

/* 
    CORS 跨域
    - https://github.com/zadzbw/koa2-cors
    - 非简单的 cors , 增加一次‘预检’请求
    - 需要设置 Access-Control-Request-Method 和 Access-Control-Allow-Headers
*/
app.use(cors({
    origin: () => {
        return 'http://localhost'
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'h'],
}));

// 监听端口
app.listen(config.PORT)
console.log(`Starting at ${config.PORT}`)