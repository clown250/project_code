// 实现裁剪区域图片的替换

$(function () {

    var layer = layui.layer

    // 一.cropper 图片裁剪
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    // 简写:
    // $('#image').cropper({
    //      // 纵横比
    //      aspectRatio: 1,
    //      // 指定预览区域
    //      preview: '.img-preview'
    // })


    // 二.点击弹出文件选择框
    // 为上传按钮 绑定点击事件
    // 在页面中设置一个file的input框 但是隐藏起来 
    // 通过程序模拟点击这个file的input框  将文件选择框打开
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })


    // 三.更换裁剪区域的图片
    // 3.1 给文件选择框绑定 change 事件
    $('#file').on('change', function (e) {
        // console.log(e);
        // 3.2 获取用户选择的文件
        // 用户选择了文件就会触发这个事件，通过 e.target.files 获取用户选择文件列表
        var filelist = e.target.files // e.target.files 是个伪数组
        // console.log(filelist)
        if (filelist.length === 0) {   // 用户未选择图片
            return layer.msg('请选择照片')
        }

        // 3.3.1.  拿到用户选择的文件
        var file = e.target.files[0]
        // 3.3.2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file)
        // 3.3.3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })


    // 四. 将裁剪后的头像上传到服务器
    // 4.1  为确定按钮，绑定点击事件
    $('#btnUpload').on('click',function() {
        // 4.2 要拿到用户裁剪后的头像
            // 创建一个 Canvas 画布
            var dataURL = $image
            .cropper('getCroppedCanvas', {
              // 创建一个 Canvas 画布
              width: 100,
              height: 100
            })
            .toDataURL('image/png')  // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 4.3 调用接口 把头像上传到服务器
        $.ajax({
            method:'POST',
            url:'/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('更换头像失败')
                }
                return layer.msg('更换头像成功')
                // 接着渲染 更新首页相关的用户信息和用户头像
                window.parent.getUserInfo()
            }

        })
    })

})