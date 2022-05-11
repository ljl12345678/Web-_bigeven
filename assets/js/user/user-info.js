$(function() {
    let form = layui.form
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称在1-6个字符之间'
            }
        }
    })


    initUserInfo()
        // 初始化用户的基本信息
    let layer = layui.layer

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取信息失败')
                }
                // 快速给表单复制
                form.val('formuserinfo', res.data)
            }
        })
    }
    // 重置表单数据
    $('#btnReset').on('click', function(e) {
            // 阻止表单默认重置行为
            e.preventDefault()
            initUserInfo()
        })
        // 提交修改
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                // layer.msg('成功')
                // 调用父页面的方法重新获取头像和名字
                window.parent.getInInfo()
            }
        })
    })





})