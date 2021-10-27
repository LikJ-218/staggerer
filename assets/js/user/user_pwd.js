$(function () {
    // 从layui对象中获取form
    var form = layui.form
    // console.log($('#password').value)
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,15}$/
            , '密码必须6到15位，且不能出现空格'
        ],
        uanmepwd: function (value, item) {//value：表单的值、item：表单的DOM对象
            if (value == $('#username').val()) {
                return '新旧密码不能一致';
            }
        },
        sanmepwd: function (value, item) {//value：表单的值、item：表单的DOM对象
            if (value != $('#password').val()) {
                return '两次密码不一致';
            }
        },



    })

    // 给form

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'patch',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.code != 0) {
                    return layer.msg('修改密码失败')
                }
                layer.msg('修改密码成功')
                //    重置表单
                $('.layui-form')[0].reset()
            },

        })

    })
})