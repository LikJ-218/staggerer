$(function(){
    // 导入form 表单
    var form = layui.form;

    form.verify({
        nickname:function(value){
            if(value.length > 6){
                return " 昵称长度必须在1~6之间!"
            }
        }
    })

    getUserInfo();
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
                form.val('getUserInfo',res.data)
            },

        })
    }

    $('#btnReset').click(function(e){
        // 阻止表单默认清空行为
        e.preventDefault();
        getUserInfo()
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault();

        $.ajax({
            type: 'put',
            url: '/my/userinfo',
            data:$(this).serialize(),
            success: function (res) {
                if (res.code != 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('修改用户信息成功呢')

                // 调用父级页面中的方法
                // 注意 : 父页面的方法和变量必须在 iframe 标签之前定义
                window.parent.getUserInfo() 
               
               
            },

        })

    })
})