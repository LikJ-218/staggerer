$(function () {
    // 1.获取裁剪区域的图片
    $("#image").cropper({
        aspectRatio: 1, // 纵横比
        viewMode: 2,
        preview: '.img-preview' // 预览图的class名
    });

   

    // 给选择图片按钮绑定点击事件(触发 file 标签的点击事件)
    $('#selectImg').click(function(){
        $('#file').click()
    })
    // 导入 layer 提示框
    var layer = layui.layer;

    // 为文件选择框绑定change事件
    $('#file').change(function(e){
        // 获取用户上传的图片
        var filelist = e.target.files
        if(filelist.length == 0){
            return layer.msg('请选择照片')
        }

        // 取到用户上传的文件
        var file = filelist[0];
        // 将取到的文件转化为 url 路径
        var url = URL.createObjectURL(file)
        // replace(url[, onlyColorChanged])—替换图像的src并重新构建cropper
        $('#image').cropper('replace',url)
        // 销毁旧的裁剪区     重新设置传上去的图片
        // $("#image").cropper('destroy').attr('src',url)
        $('#image').cropper("getCroppedCanvas")
        
    })

    $('#btnUpload').click(function(){
        var dataUrl = $('#image').cropper("getCroppedCanvas",{
            width:100,
            height:100
        }).toDataURL('image/png');

        // 请求后端接口 将base64传过去
        $.ajax({
            type:'PATCH',
            url:'/my/update/avatar',
            data:{
                avatar:dataUrl,
            },
            success:function(res){
                console.log(res);
                if(res.code != 0){
                    return layer.msg('更新头像失败')
                }
                layer.msg('更新头像成功')
                 // 调用父级页面中的方法
                // 注意 : 父页面的方法和变量必须在 iframe 标签之前定义
                window.parent.getUserInfo() 
            }

        })
    })
})