//一.模块化规范
//服务器端规范主要是CommonJS，node.js用的就是CommonJS规范。
//　　客户端规范主要有：AMD（异步模块定义，推崇依赖前置）、CMD（通用模块定义，推崇依赖就近）。
//AMD规范的实现主要有RequireJS，CMD规范的主要实现有SeaJS。RequireJS在国外用的比较多，SeaJS在国内用的比较多，
//并且SeaJS的创始人为阿里的玉伯，所以SeaJS在阿里系用的非常广泛，包括京东等大厂也在用SeaJS，我们详细介绍的也是SeaJS。
//但是SeaJS已经停止维护了，因为在ES6中已经有了模块化的实现，随着ES6的普及，
//第三方的模块化实现将会慢慢的淘汰（但是这个在国内可能还要很多年）。


//3. 私有公有成员分离
var calculator = (function () {
    // 这里形成一个单独的私有的空间
    // 私有成员的作用：
    //   1、将一个成员私有化
    //   2、抽象公共方法（其他成员中会用到的）
    
    // 私有的转换逻辑
    function convert(input){
        return parseInt(input);
    }

    function add(a, b) {
        return convert(a) + convert(b);
    }
    function subtract(a, b) {}
    function multiply(a, b) {}
    function divide(a, b) {}
    return {
        add : add,
        subtract : subtract,
        multiply : multiply,
        divide : divide
    }
})();
//4. 模块的扩展与维护
// 计算模块
(function (calculator) {
    function convert(input) {
        return parseInt(input);
    }
    calculator.add = function(a, b) {
        return convert(a) + convert(b);
    }
    window.calculator = calculator;
})(window.calculator || {});

// 新增需求
(function (calculator) {
    calculator.remain = function (a , b) {
        return a % b;
    }
    window.calculator = calculator;
})(window.calculator || {});
        
alert(calculator.remain(4,3));

//5. 第三方依赖的管理
(function (calculator , $) {
    // 依赖函数的参数，是属于模块内部
    // console.log($);
    calculator.remain = function (a , b) {
        return a % b;
    }
    window.calculator = calculator;
})(window.calculator || {} , jQuery);
//对于模块的依赖通过自执行函数的参数传入

//作者：iceman_dev
//链接：https://www.jianshu.com/p/3832c00a44a7
//來源：简书
//简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。