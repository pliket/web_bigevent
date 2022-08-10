$.ajaxPrefilter(function(options) {
    // 发起ajax请求之前，主动拼接请求的url地址
    options.url = 'http://www.liulongbin.top:3007' + options.url
})