// 先写一个入口函数
$(function(){
    // 切换去注册页面
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 切换去登录页面
    $('#link_login').on('click',function(){
        
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 制定规则，先定义一个form
    let form = layui.form
    // 声明一个 layer 是layUI中的 layer
    let layer = layui.layer

    // 使用 form.verify函数
    form.verify({
        psd: [
            /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'
          ],
        // 进行两次密码是否一致的校验
        // 首先要拿到再次确认密码的值，再和确认密码的值相比对，如果不相同就返回一个字符串
        repsd : function (value){
            // 先拿到输入密码的值
            let pwd = $('.reg-box [name=password]').val()
            if(pwd !== value){
                return '两次密码输入不一致'
            }
        }
    })

    // 监听表单的 submit 事件 先给表单一个id
    // 发起post请求，来注册账号
    $('#form_reg').submit(function(e){
        // 阻止默认事件
        e.preventDefault()
        // 调用post
        $.post('/api/reguser',
        {username: $('#form_reg [name=username]').val() , password:$('#form_reg [name=password]').val() } , function(res){
            if(res.status !== 0){
                // 调用layer的msg方法，做弹出层
                return layer.msg(res.message)
            }
            layer.msg('注册成功请登录！')
            // 注册成功后  模拟人工点击跳转到登录页面
            $('#link_login').click()
        })
    })

    // 监听表单的submit事件，发起post请求 来登录账号
    $('#form_login').submit(function(e){
        // 阻止默认事件
        e.preventDefault()
        // 发起post请求
        $.ajax({
            url:'/api/login',
            method:'post',
            data: $(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('登陆成功')
                // 把登陆成功之后的身份认证的token保存到本地
                let token = res.token
                localStorage.setItem('token', token)
                // 登录成功后跳转到后台页面
                location.href = '/index.html'
            }
        })
    })
})