$(function () {
    // 点击注册链接 注册页展示
    $('#link_reg').click(function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })

    // 点击注册链接 注册页展示
    $('#link_login').click(function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从layui对象中获取form
    var form = layui.form
    // console.log($('#password').value)
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,15}$/
            , '密码必须6到15位，且不能出现空格'
        ],
        sanmepwd: function (value, item) {//value：表单的值、item：表单的DOM对象
            if (value != $('#password').val()) {
                return '两次密码不一致';
            }
        },


    })

    // 监听注册表单的 提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg input[name=username]').val(),
            password: $('#form_reg input[name=password]').val(),
            repassword: $('#form_reg input[name=repassword]').val()
        }
        // 发起ajax请求
        $.post('/api/reg', data, function (res) {
            console.log(res);
            if (res.code != 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录');
            // 自动触发点击事件 去登录
            $('#link_login').click()

        })
    })

    // 监听登录按钮
    $('#form_login').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            type:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if (res.code != 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功');
                // 将登录成功之后得到的token 字符创 , 存在 localStorage
                localStorage.setItem('token',res.token);
                // 自动触发点击事件 去登录
                location.href = './index.html';
              
            }
        })
    })

})