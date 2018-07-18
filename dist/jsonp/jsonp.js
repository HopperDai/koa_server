/* 
    jsonp 请求工具
    @params url 请求的地址
    @params data 请求的参数 -> json
    @returns {Promise} 
*/

const Request = (url, data) => {
    return new Promise((resolve, reject) => {
        // 组装参数形式：xx=yy&aa=bb
        const handleData = (data) => {
            const keys = [''].concat(Object.keys(data)) // -> 避免第一个 tmp
            const keysLen = keys.length
            return keys.reduce((tmp, item, index) => {
                const value = data[item]
                const flag = (index === keysLen - 1) ? '' : '&'
                return `${tmp}${item}=${value}${flag}`
            })
        }

        // 创建 script 标签
        const script = document.createElement('script')
        script.src = `${url}?${handleData(data)}&cb=jsonp`
        document.body.appendChild(script)

        // 接口返回的数据获取
        window.jsonp = (res) => {
            document.body.removeChild(script) // 移除 script
            delete window.jsonp // 删除 jsonp ，释放内存
            resolve(res)
        }
    })
}

// 调用
(async () => {
    let data = await Request(
        'http://localhost:8089/api/aaa', {
            name: 'hopper',
            password: 123456,
            age: 18
        }
    )
    console.log(data)
})()