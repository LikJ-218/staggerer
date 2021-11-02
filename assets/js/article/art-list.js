$(function () {
    var params = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }
    initTable()
    // 请求文章列表数据
    function initTable() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: params,
            success: function (res) {
                if (res.code != 0) {
                    return layer.msg('获取文章列表数据失败!!')
                }
                // 使用模板语法渲染
                var strhtml = template('tpl-tble', res);
                $('tbody').html(strhtml)
                renderPage(res.total)
            }
        })
    }

    // 定义一个渲染分页的函数

    function renderPage(total) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;

            //执行一个laypage实例
            laypage.render({
                elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
                , count: total, //数据总数，从服务端得到
                limit: params.pagesize,
                curr: params.pagenum,
                limits: [2, 5, 10, 15, 20],
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                jump: function (obj, first) {
                    //obj包含了当前分页的所有参数，比如：
                    //console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    // console.log(obj.limit); //得到每页显示的条数
                    //  把最新的页码 , 赋值到请求的参数
                    params.pagenum = obj.curr;
                    // 把最新的的条码数 赋值到 params 里面去 然后在去请求接口
                    params.pagesize = obj.limit;
                    // 重新渲染列表接口

                    //首次不执行
                    if (!first) {
                        initTable()
                    }
                }
            });
        });
    }


    // 给日期写个过滤器方法
    template.defaults.imports.dateFormat = function (date) {
        const dt = new Date(date);

        const y = dt.getFullYear();
        const m = dt.getMonth();
        const d = dt.getDate();
        const hh = dt.getHours();
        const mm = dt.getFullYear();
        const ss = dt.getSeconds();

        return y + '-' + addZero(m) + '-' + addZero(d) + ' ' + addZero(hh) + ':' +
            addZero(mm) + ':' + addZero(ss)
    }
    // 补0的函数
    function addZero(n) {
        return n < 10 ? '0' + n : n;
    }

    // 给列表里面的a添加点击事件
    $('body').on('click', 'td a', function () {
        // 获取当前这篇文章的id
        var id = $(this).attr('data-id')

        // 请求ajax
        $.ajax({
            type: 'get',
            url: '/my/article/info',
            data: {
                id: id,
            },
            success: function (res) {
                console.log(res);

                if (res.code != 0) {
                    return layer.msg('获取详情信息成功')
                }
                var strhtml = template('tpl-detail', res);
                // 出详情信息的弹窗
                layer.open({
                    type: 1,
                    area: ['85%', '85%'],
                    title: '预览文章',
                    content: strhtml,
                });
            }
        })
    })





    // 给筛选的form表单注册提交事件
    $('body').on('submit', '#form-search', function (e) {
        e.preventDefault();

        // 我们拿到筛选的数据 请求接口 得到新列表
        params.cate_id = $('#cate-name').val();
        params.state = $('#cate-state').val();
        // 重新渲染列表接口
        initTable()
    })


    // 给删选的form表单注册重置事件
    $('body').on('reset', '#form-search', function (e) {


        // 我们拿到筛选的数据 请求接口 得到新列表
        params.cate_id = '';
        params.state = '';
        // 重新渲染列表接口
        initTable()
    })

    // 请求文章分类数据
    var form = layui.form
    getCateList()
    function getCateList() {
        $.get('/my/cate/list', function (res) {
            if (res.code != 0) {
                return layer.msg('获取分类列表失败');
            }
            var strhtml = template('tpl-case', res);

            $('#cate-name').html(strhtml)
            form.render(); //更新全部
        })
    }

    // 给删除的按钮注册点击事件
    $('tbody').on('click', '.btn-dele', function () {
        // 取到当前的数据  id
        var id = $(this).attr('data-id')

        var len = $('.btn-dele').length


        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index2, layero) {
            //发起ajax请求
            $.ajax({
                type: 'DELETE',
                url: '/my/article/info?id=' + id,
                success: function (res) {
                    if (res.code != 0) {
                        return layer.msg('删除文章失败!')
                    }
                    layer.msg('删除文章成功!')
                    // 判断当前页是否还有数据 (没有数据就将 pagenum - 1)
                    if (len == 1) {
                        params.pagenum = params.pagenum == 1 ? 1 : params.pagenum -1;
                    }
                    // 重新渲染
                    initTable()
                }
            })
            // 关闭弹出询问框
            layer.close(index2);

        })
    })
})