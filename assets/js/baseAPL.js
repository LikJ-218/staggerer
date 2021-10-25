// 注意 : 每次使用 $.get $.post $.ajax 都会被触发
// 在这个函数内部 我们可以渠道ajax给我们配置的对象

$.ajaxPrefilter(function(options){
    console.log(options);
    // 在发起真正的ajax请求之前 同意拼接 地址
    options.url = 'http://www.liulongbin.top:3008' + options.url
})