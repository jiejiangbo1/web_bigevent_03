$.ajaxPrefilter(function(pramas) {
    pramas.url = 'http://ajax.frontend.itheima.net' + pramas.url
    if (pramas.url.indexOf("/my/") !== -1) {
        pramas.headers = {
            Authorization: localStorage.getItem("token") || ''
        }
    }
    pramas.complete = function(res) {
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            localStorage.removeItem("token")
            location.href = '/login.html'
        }
    }
})