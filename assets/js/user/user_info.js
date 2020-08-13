$(function () {

    var form = layui.form
    var layer = layui.layer


    // 一. 校验表单数据
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间'
            }
        }
    })

    // 调用
    initUserInfo()

    // 二.获取用户的基本信息 (初始化用户的基本信息)
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                // 为表单快速赋值
                // 调用form.val() 快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }


    //三. 重置表单的数据 (实现表单的重置效果)
    $('#btnReset').on('click',function(e){
        //阻止表单的默认重置行为
        e.preventDefault()
        initUserInfo()
    })


    // 四. 发起请求更新用户的信息
    // 4.1 监听表单的提交事件
    $('.layui-form').on('submit',function(e){
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 4.2 发起 ajax 数据请求
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),   // this==layui-form这个表单
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                // 4.3 调用父页面中的方法 重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()   // 在index.js里找到页面的获取用户信息  重新渲染用户的信息 和 渲染用户的头像
            }
        })
    })
})