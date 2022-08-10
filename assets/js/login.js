$(function() {
    // 点击“去注册”链接
    $('#link-reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击“去登录”链接
    $('#link-login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 设置密码的正则
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        repwd: function(value) {
            let pwd = $('.reg-box [name=password]').val()
            if (value !==pwd) {
                return '两次密码不一致'
            }
        }
    })
    // 监听注册表单的提交事件
    
    $("#form_reg").on('submit', function(e) {
        e.preventDefault()
        let data = {username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()}
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            $('#link-login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功！')
                // 将登陆成功后的token字符串保存到localStorage中
                localStorage.setItem('token', res.token)
                // 登录成功跳转页面
                location.href = '/index.html'
            }
        })
    })

})