// 每次在调用$.get $.post.$.ajax时，会先调用ajaxprefilter这个函数，在这个函数中可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(option) {
    option.url = 'http://www.liulongbin.top:3007' + option.url
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // option.complete = function(res) {
    //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //         // console.log(res);
    //         localStorage.removeItem('token')
    //         location.href = '/login.html'
    //     }
    // }
})