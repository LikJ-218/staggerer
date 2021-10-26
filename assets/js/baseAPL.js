// 注意 : 每次使用 $.get $.post $.ajax 都会被触发
// 在这个函数内部 我们可以取到ajax给我们配置的对象

$.ajaxPrefilter(function (options) {
    console.log(options);
    // 在发起真正的ajax请求之前 同意拼接 地址
    options.url = 'http://www.liulongbin.top:3008' + options.url
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局同一挂载 complete 函数
    options.complete = function (res) {
        console.log(res);
        if (res.responseJSON.code == 1 && res.responseJSON.message == '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token')
            // 强行跳回登录页
            location.replace('login.html')
        }
    }

})