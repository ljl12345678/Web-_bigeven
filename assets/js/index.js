$(function() {
    // 获取用户的基本信息
    getInInfo()
    let layer = layui.layer
    $('#btnLogout').on('click', function() {

        layer.confirm('确定退登录?', { icon: 3, title: '提示' }, function(index) {

            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'


            layer.close(index);
        });

    })

})

function getInInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户消息失败')
            }
            renderAvatar(res.data)
        },

    })
}

function renderAvatar(user) {
    let name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show
    } else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}