$(function(){

    // 导入layer提示框
    var layer = layui.layer;

    var form = layui.form;
    // 获取分类列表
    gitCateList()
   function gitCateList(){
    $.get('/my/cate/list',function(res){
        if(res.code != 0){
            return layer.msg('获取分类列表失败')
        }
        var strhtml = template('tpl-tble',res);
        $('tbody').html(strhtml)
     
    })
   }
    var index ;
       // 给添加分类按钮注册点击事件
       $('#btnAddCate').click(function(){
        index = layer.open({
            type:1,
            area:['500px','250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html(),
          });
    })

    // 添加分类表单注册提交事件 (form 动态创建的 代理的形式添加事件)
    $('body').on('submit','#form-add',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/my/cate/add',
            data:$(this).serialize(),
            success:function(res){
                if(res.code !=0 ){
                    return layer.msg('添加文章分类失败!')
                }
                layer.close(index) 
                gitCateList()
            }
        })
        
    })

    // 给修改按钮注册点击事件()
    var index1 ;
    $('body').on('click','#btn-edit',function(){
        // 得到当前的那条数据的id
        var id = $(this).attr('data-id')

        // 特定两条数据不能删除
        if(id == 1 || id ==2){
            return layer.msg('不允许修改!',{icon:0})
        }
        $.ajax({
            type:'get',
            url:'/my/cate/info?id='+id,
            success:function(res){
                console.log(res);
                if(res.code !=0 ){
                    return layer.msg('添加文章分类失败!')
                }
                // 给表单添加值
                form.val('form-edit', res.data);
            }
        })
        
        index1 = layer.open({
            type:1,
            area:['500px','250px'],
            title: '添加文章分类',
            content: $('#dialog-edit').html(),
          });
        
        
    })

    
        // 添加分类表单注册提交事件 (form 动态创建的 代理的形式添加事件)
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault();
        $.ajax({
            type:'put',
            url:'/my/cate/info',
            data:$(this).serialize(),
            success:function(res){
                if(res.code !=0 ){
                    return layer.msg('更新文章分类失败!')
                }
                layer.close(index1) 
                // 重新渲染分类列表
                gitCateList()
            }
        })
        
    })

    $('body').on('click','#btn-dele',function(){
        // 得到当前的那条数据的id
        var id = $(this).attr('data-id')
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index2, layero) {
            //确定的回调 删除数据
            $.ajax({
                type:'DELETE',
                url:'/my/cate/del?id='+id,
                success:function(res){
                    if(res.code !=0 ){
                        return layer.msg('删除文章分类失败!')
                    }
                    layer.msg('删除文章分类成功!')
                    // 重新渲染
                    gitCateList()
                }
            }) 
            // 关闭弹出询问框
            layer.close(index2);
        });  
    })
})