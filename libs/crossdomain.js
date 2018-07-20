/* 跨域 
    参考文档：
        - https://mp.weixin.qq.com/s/VWqk6lmQuluOBdo79Xqggg
*/
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
}

module.exports = CrossDomain