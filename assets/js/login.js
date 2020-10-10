$(function() {
    $("#link_reg").on("click", function() {
        $(".regBox").show();
        $(".loginBox").hide();
    })
    $("#link_login").on("click", function() {
        $(".regBox").hide();
        $(".loginBox").show();
    })
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $(".regBox [name=password]").val()
            if (value !== pwd) {
                return '两次密码输入不一致'
            }
        }
    })
    $("#form_reg").on("submit", function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $(".regBox [name=username]").val(),
                password: $(".regBox [name=password]").val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    //请求失败
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                $("#link_login").click();
                $("#form_reg")[0].reset();
            }
        })
    })
    $("#form_login").submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                localStorage.setItem("token", res.token)
                location.href = '/index.html';
            }
        })
    })
})