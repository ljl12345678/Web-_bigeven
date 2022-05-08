// 每次在调用$.get $.post.$.ajax时，会先调用ajaxprefilter这个函数，在这个函数中可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(option) {
    option.url = 'http://www.liulongbin.top:3007' + option.url
})