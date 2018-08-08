//全局监听发起ajax
var userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
if (userinfo !== null) {
    $.ajaxSetup({
        headers: { // 默认添加请求头
            'token': userinfo.token
        }
    });
}else {
	alert("亲，请登录！")
}
//使请求带上token
var beforeSendfun = function (request) {
    var userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (userinfo !== null) {
        request.setRequestHeader("token", userinfo.token);
    }
}
//ajax  post方式
function ajax_post(url,async,data,callback){
	var a = typeof data
	$.ajax({
		url:url,
		type:"post",
		async:async,
		dataType: "json",
		beforeSend: beforeSendfun,
		contentType: typeof data == "string" ? 'application/json' : "application/x-www-form-urlencoded;charset=utf-8",
		data:data,
		success:callback,
	});
}
//ajax  get方式
function ajax_get(url, data, callback) {
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




























