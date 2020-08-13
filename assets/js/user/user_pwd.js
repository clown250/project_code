$(function(){
    var form=layui.form
    // var layer=layui.layer

    // 一. 为密码框定义校验规则
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ], 
        samePwd:function(value){
            if(value===$('[name=oldPwd]').val()){
                return '新旧密码不能相同'
            }
        },
        rePwd:function(value){
            if(value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })


    // 二. 发起请求实现重置密码的功能
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layui.layer.msg('更新密码失败')
                }
                layui.layer.msg('更新密码成功')

                // 2.1 重置表单
                // form有reset()方法  但是是dom对象  所以需要将jquery对象转换为dom对象
                $('.layui-form')[0].reset()
            }
        })
    })
})