$(function() {
    getUserInfo()
    var layer = layui.layer;
    $("#btnLogout").on("click", function() {
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function(index) {
            //do something

            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $(".welcome").html('欢迎&nbsp;&nbsp;' + name)
        //按需所需的头像
    if (user.user_pic !== null) {
        //有头像
        $(".layui-nav-img").show().attr('src', user.user_pic)
        $('.user-avatar').hide()
    } else {
        $(".layui-nav-img").hide()
        $('.user-avatar').show().html(name[0].toUpperCase)
    }
}