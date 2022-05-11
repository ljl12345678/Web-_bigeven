$(function() {
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
    $('#btnChooseImage').on('click', function() {
        $('#file').click()
    })
    $('#file').on('change', function(e) {

        let filelist = e.target.files
        if (filelist.length === 0) {
            return layui.layer.msg('请选择照片')
        }
        // 拿到用户选择的文件
        let file = e.target.files[0]
            // 将文件转换为路径
        let imgurl = URL.createObjectURL(file)
            // 重新初始化裁剪区
        $image.cropper('destroy').attr('src', imgurl).cropper(options)
    })
    $('#btnUpload').on('click', function() {
        // 拿到用户裁剪后的头像
        let dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            // 调用接口，把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            data: {
                avatar: dataURL
            },

            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新头像失败')
                }
                // layui.layer.msg('更新头像成功')
                window.parent.getInInfo()
            }
        })
    })
})