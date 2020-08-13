$(function () {
    // 调用getUserInfo 获取用户基本信息
    getUserInfo()



    // 四. 点击退出按钮  实现退出功能
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        // console.log('ok');
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            // console.log('ok');
            // 点击确认退出后跳转到登录页面
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href='/login.html'

            // 关闭confirm询问框
            layer.close(index);
        });
    })
})




// 一. 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers 就是请求头配置对象
        // 为什么要加请求头: 在接口文档中说明了以/my开头的请求路径 需要请求头
        // 已经封装了一个 headers请求头
        // headers: {
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        }


        // 五. 控制用户的访问权限
        
        // 不论成功还是失败 最终都会调用complete回调函数
        complete: function(res) {
            // console.log('执行了complete回调');
            // console.log(res);
            // 在complete回调函数中  可以使用res.responseJSON拿到服务器响应回来的 数据
            if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败') {
                // 1. 强制清空token
                localStorage.removeItem('token')
                // 2.强制跳转到登录页面
                location.href='/login.html'
            }
        }
    })
}




// 二. 渲染用户的头像
function renderAvatar(user) {
    // 1.获取用户的名称
    // 优先级 nickname > username
    var name = user.nickname || user.username
    // 2.设置欢迎的名字
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染用户的头像
    // 如果有头像图片 就先渲染图片头像  否则渲染文本头像
    if (user.user_pic !== null) {
        //3.1 有头像 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //3.2 无图片头像 渲染文本头像
        $('.layui-nav-img').hide()
        var firstletter = name[0].toUpperCase()
        $('.text-avatar').html(firstletter).show()
    }
}



// 七.将本地代码同步到云端