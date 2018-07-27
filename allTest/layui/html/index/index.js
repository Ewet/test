var common,layer;
layui.use(['common'], function () {
    common = layui.common,
    layer = layui.layer,
    console.log(456)
});


var app = new Vue({
	el:".web",
	data(){
		return{
			name:"chen",
			layerindex: {
	            index_1: 1,
	            index_2: 2,
	            index_3: 3
	        },
		}
	},
//created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
//mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
	created: function () {
        var that = this;
        setTimeout(function () {
            that.initpage();
        }, 1000);
    },
	methods:{
		initpage:function(){	
			var that = this;
			var data={
				code:"kdjskdfjskjsd",
			}
	        common.ajax_post("/beautician/php/controller/login.php",JSON.stringify(data),true,function(res){
				console.log(123)
			})
//			common.ajax_post('/HRSSPortal/taskType/delete', { "taskTpId": "45" }, true,
//              function (data) {
//                  console.log(data);
//                  
//          });
		}
		
	}
})