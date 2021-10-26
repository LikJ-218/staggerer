$(function(){
    // 导入 layer 提示框
    var layer = layui.layer;

    getUserInfo();

    function getUserInfo(){
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            headers:{
                Authorization:localStorage.getItem('token')
            },
            success:function(res){
                if(res.code != 0){
                    return layer.msg('获取用户信息失败')
                }
                // 成功之后拿到信息渲染页面
                renderAvatar(res.data)
            }
        })
    }

    function renderAvatar(user){
        console.log(user);
        // 获取用户名称
        var name = user.nickname || user.username
        $('#welcome').html('欢迎' + name)

        if(user.user_pic){
            $('.layui-nav-img').attr('src',user.user_pic);
            $('.text-avatar').hide()
        }else{
            $('.layui-nav-img').hide();
            $('.text-avatar').show()
            $('.text-avatar').html(name[0].toUpperCase())
        }
    }
})