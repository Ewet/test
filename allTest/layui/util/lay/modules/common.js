layui.define(['jquery'], function(exports){ 
    var $ = layui.jquery;
    //使请求带上token
    var beforeSendfun = function (request) {
        var userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if (userinfo !== null) {
            request.setRequestHeader("token", userinfo.token);
        }
    }
    //全局监听发起ajax
    var userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (userinfo !== null) {
        $.ajaxSetup({
            headers: { // 默认添加请求头
                'token': userinfo.token
            }
        });
    }
    var obj = {
//      ajax: function (url, type, dataType, data, callback) {
//          $.ajax({
//              url: url,
//              type: type,
//              dataType: dataType,
//              data: data,
//              success: callback
//          });
//      }
		ajax_post: function (url, data, async, callback) {
            var a = typeof data
            $.ajax({
                url: "http://193.112.196.232" + url,
                async: async,
                type: "post",
                dataType: "json",
                contentType: typeof data == "string" ? 'application/json' : "application/x-www-form-urlencoded;charset=utf-8",
                data: data,
                success: callback,
                beforeSend: beforeSendfun,
            });
        },
        //ajax  get方式
        ajax_get: function (url, data, callback) {
            $.ajax({
                url: g_url + url,
                type: "get",
                dataType: "json",
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: data,
                beforeSend: beforeSendfun,//在请求之前判断是否有token；
                success: callback,
            });
        },
    };
    //输出接口
    exports('common', obj);
});