
var table, $,laydate,layer,common,element,rate,form,formSelects;
//var userinfo =JSON.parse(sessionStorage.getItem("userInfo"));

layui.use(['element', 'rate', 'table', 'layer', 'common', 'form', 'laydate', 'formSelects'], function () {
    	table = layui.table
        , $ = layui.jquery
        , laydate = layui.laydate
        , layer = layui.layer
        , common = layui.common
        , element = layui.element
        , rate = layui.rate
        , formSelects = layui.formSelects
        , form = layui.form;
});

var app = new Vue({
    el:'#app',
    data:{
        // menuobj: {
        //     homeurl: "",
        //     menu:[]
        // },
        // layerindex: {
        //     index_1: 1,
        //     index_2: 2,
        //     index_3: 3,
        //     index_4: 4,
        //     index_5: 5
        // },
        // ws: null,
        // wsdata: {
        //     count: 0,
        //     order: []
        // },
        // assigeuser: {
        //     assigeuserlits: "",
        //     order: ""
        // }, orderdetial: {
        //     createBy: "",
        //     orderNo: "",
        //     originName: "",
        //     targetName: "",
        //     taskTpDescr: "",
        //     orderToolList: [],
        //     priority: 10
        // },
        // imgurl:"../../img/admin.png",
        username:"",
    },
        created: function () {
            var that = this;
            setTimeout(function () {
                that. Login();
            }, 1000);
        },
        updated: function(){
            form.render();
            element.init();
        },
        methods:{
            Login: function () {
                var AccountID = $("#AccountID").val();
                var Password = $("#Password").val();
                if (AccountID === "" || Password === "") {
                    layer.msg()
                }
                    
            }
        }
    }
});
                        	
                        	
                        	
                        	
                        	
                        	
                        	
                        	
                        	
                        	
                        	
                        	
