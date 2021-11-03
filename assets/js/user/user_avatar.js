$(function () {

    // 1.获取裁剪区域的图片
    var image = $('#image');
    // 1.2记录图片配置项
    var options = {
        aspectRatio: 1,
        preview: '.img-preview'  // 指定预览区域
    }
    //请求了一次用户信息 将最新的图片更新上去
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.code != 0) {
                return layer.msg('获取用户信息失败!');
            }
            //成功之后拿到信息渲染页面
            if (res.data.user_pic) {
                image.attr('src', res.data.user_pic);
                // 1.3 创建裁剪区域
                image.cropper(options);
            }

        }
    })



    // 2. 给选择图片按钮绑定点击事件 ( 触发 file 标签的click事件 )
    $('#selectImg').click(function () {
        $('#file').click();
    })

    //导入layer提示框
    var layer = layui.layer;

    // 3.为文件选择框绑定 change事件
    $('#file').on('change', function (e) {
        // 获取到用户上传的图片
        var filelist = e.target.files;
        if (filelist.length == 0) {
            return layer.msg('请选择照片!');
        }
        // 取到用户上传的文件
        var file = filelist[0];
        // 将取到的文件转化为 url 路径
        var url = URL.createObjectURL(file);

        // 重新初始化裁剪区
        // image.cropper('destroy'); //销毁旧的裁剪区
        // image.attr('src',url);    // 重新设置传上去的图片
        // image.cropper(options); //重新初始化裁剪区域
        image.cropper('replace', url);
    })

    // 4.点击上传头像按钮 请求接口
    $('#btnUpload').click(function () {
        // 1. 要将用户头像转为 base64
        var dataUrl = image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png');  //将canvas画布上的内容 转成 base64格式的字符串

        //请求后端接口 将base64传过去
        $.ajax({
            method: 'patch',
            url: '/my/update/avatar',
            data: {
                avatar: dataUrl
            },
            success: function (res) {
                if (res.code != 0) {
                    return layer.msg('更新头像失败!');
                }

                layer.msg('更新头像成功!');
                //调用父级页面中的方法 更新 index 页的信息 
                //注意 : 父页面的方法和变量必须在 iframe 标签之前定义
                window.parent.getUserInfo();
            }
        })


    })

})