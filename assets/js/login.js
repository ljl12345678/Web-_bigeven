$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
            $('.reg-box').hide()
            $('.login-box').show()
        })
        // 验证
    let form = layui.form
    let layer = layui.layer
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
            repwd: function(value) {
                let pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一样'
                }
            }

        })
        // 监听表单提交事件
    $('#form-reg').on('submit', function(e) {
            e.preventDefault()
            let data = {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val(),
            }
            $.post('/api/reguser', data,
                function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('注册成功请登录')
                    $('#link_login').click()
                })
        })
        // 监听登录表单提交事件
    $('#form-login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                    // 将本地的token字符串保存到localstorage
                localStorage.setItem('token', res.token)
                location.href = '../index.html'
            }
        })
    })
})