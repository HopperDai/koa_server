/* 路由模块的入口 */
const Router = require('koa-router')
const router = new Router()

const {
    jsonp
} = require('../libs/crossdomain')

router.get('jsonp', async (ctx, next) => {
    jsonp(ctx)
})

router.get('cors', async ctx => {
    ctx.body = '123'
})

module.exports = router.routes()