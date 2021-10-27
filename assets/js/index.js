$(function () {
    // 导入 layer 提示框
    var layer = layui.layer;

    getUserInfo();

    $('.logoutBtn').click(function () {
        layer.confirm('确认退出登录？', { icon: 3, title: '提示' }, function (index, layero) {
            //确定的回调
            // 清空本地储存的token
            localStorage.removeItem('token');
            // 跳转到登录页面
            location.href = 'login.html'
            // 关闭弹出询问框
            layer.close(index);
        });
    })
})

// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.code != 0) {
                return layer.msg('获取用户信息失败')
            }
            // 成功之后拿到信息渲染页面
            renderAvatar(res.data)
        },

    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎' + name)

    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').show()
        $('.text-avatar').html(name[0].toUpperCase())
    }
}