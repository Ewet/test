// 当$data（v-model）中的数据改变的时候把vNOde中的对应数据进行改变
class Watcher {
  constructor(expr, vm, cb) {
    this.expr = expr;
    this.vm = vm;
    this.cb = cb;
    // 通过 getter 对数据进行数据绑定， 标记当前的watcher
    this.oldValue = this.getOldValue();
  }
  getOldValue() {
    // Dep.target随便用的一个全局变量；
    Dep.target = this;
    const oldValue = utils.getValue(this.expr, this.vm)
    Dep.target = null;
    return oldValue;
  }
  updata () {
    const newValue = utils.getValue(this.expr, this.vm)
    if(newValue !== this.oldValue) {
      this.cb(newValue)
    }
  }
}
// 一个数据的多个watcher 依赖
class Dep {
  constructor() {
    this.collect = [];
  }
  addWatcher(watcher) {
    this.collect.push(watcher)
  }
  notify () {
    this.collect.forEach(w => w.updata())
  }
}


// 创建观察者，处理data中数据的get和set；数据监听
// 扁平化$data中的数据
class Observe{
  constructor(data){
    this.observe(data)
  }
  // 定义一个函数，递归处理data中的引用类型的数据，统一处理成基本类型；
  observe(data) {
    if(data && typeof data === 'object'){
      Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key]);
      })
    }
  }
  // 把扁平化数据做一个监听，通过get和set进行处理；
  defineReactive(obj, key, value) {
    // 递归处理
    this.observe(value);
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      get(){
        const target = Dep.target;
        target && dep.addWatcher(target)
        return value;
      },
      set: (newVal) => {
        if(value ===  newVal) return;
        this.observe(newVal);
        value = newVal
        dep.notify(newVal)
      }
    })
  }
}

const utils = {
  getValue(expr, vm) {
    return vm.$data[expr.trim()]
  },
  setValue(value, vm, newValue) {
    vm.$data[value] = newValue
  },
  model (node, value, vm){
    const initValue = this.getValue(value, vm);
    new Watcher(value, vm, (newValue) => {
      this.modelUpdater(node, newValue);
    })
    node.addEventListener('input', e => {
      const newValue = e.target.value;
      this.setValue(value, vm, newValue)
    })
    this.modelUpdater(node, initValue);
  },
  text(node, value, vm) {
    console.log(vm)
    let result;
    if(value.includes('{{')){
      // {{xxx}}
      result = value.replace(/\{\{(.+?)\}\}/g, (...args) => {
        const expr = args[1]
        new Watcher(expr, vm, (newVal) => {
          this.textUpdater(node, newVal)
        })
        return this.getValue(args[1], vm)
      })
    } else {
      // v-text
      result = this.getValue(value, vm)
    }
    this.textUpdater(node, result);
  },
  on(node, value, vm, eventName) {
    const fn = vm.$options.methods[value]
    node.addEventListener(eventName, fn.bind(vm), false)

  },
  textUpdater(node, value) {
    node.textContent = value;
  },
  modelUpdater(node, value) {
    node.value = value
  }
}

class Compiler{
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    const fragment = this.compileFragment(this.el)
    this.compile(fragment)
    
    // 重新创建节点到el中
    this.el.appendChild(fragment)
  }

  compile(fragment) {
    //Array.from转化类数组对象为数组对象
    const childNodes = Array.from(fragment.childNodes)
    // console.log(childNodes)
    childNodes.forEach(childNode => {
      // console.log(childNode.nodeType)
      // 判断节点类型
      if(this.isElementNode(childNode)) {
        // 标签节点h1，读取属性，查看是否有v-开头的内容；
        // console.log('node节点' , childNode)
        this.compileElement(childNode)
      } else if (this.isTextNode(childNode)){
        // 内容文本节点{{msg}}是否有双括号语法
        // console.log('文本节点' , childNode)
        this.compileText(childNode)
      }
      // 递归处理diff算法 
      if(childNode.childNodes && childNode.childNodes.length){
        this.compile(childNode)
      } 
    }) 
  }
  compileElement(node){
    const attributes = Array.from(node.attributes);
    attributes.forEach(attr => {
      const {name, value} = attr;
      // console.log('attr', name, value)
      if(this.isDirector(name)){
        // 判断指令的类型
        // v-model,v-text,v-on:click
        const [, directive] = name.split('-');
        const [compileKey, eventName] = directive.split(':')
        utils[compileKey](node, value, this.vm, eventName);
      } else if (this.isElementName(name)) {
        const [, eventName] = name.split('@')
        utils['on'](node, value, this.vm, eventName);
      }
    })
  }
  
  isElementName(name) {
    return name.startsWith('@');
  }

  isDirector(name) {
    return name.startsWith('v-');
  }

  compileText(node){
    const content = node.textContent;
    if(/\{\{(.+)\}\}/.test(content)) {
      // console.log('content', content)
      utils['text'](node, content, this.vm);
    }
  }

  compileFragment(el) {
    const f = document.createDocumentFragment();
    let firstChild;
    while(firstChild = el.firstChild){
      f.appendChild(firstChild) // 会删除原来的node节点
    }
    // console.dir(f)
    return f;
  }

  // 判断是否为node节点；
  isElementNode(el) {
    return el.nodeType === 1;
  }
  // 判断是否为文本节点；
  isTextNode(el) {
    return el.nodeType === 3;
  }
}

class Vue{
  constructor(options){
    this.$el = options.el;
    this.$data = options.data;
    this.$options = options;
    // 触发this.$data.xx和模板的绑定
    new Observe(this.$data);
    // 处理模板部分，将模板中使用的data部分的变量和模板绑定起来；
    new Compiler(this.$el, this)
    this.proxyData(this.$data)
  }
  // 把data中的属性值绑定到vue实例中；
  // 可以通过this.xx更改this.$data.xx的结果
  proxyData(data) {
    Object.keys(data).forEach(key => {
      //Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
      Object.defineProperty(this, key, {
        get(){
          return data[key];
        },
        set(newValue) {
          data[key] = newValue
        }
      })
    })
  }
}


/**
 * 学习总结：
 * 1.Array.from(node.attributes);把类数组转化为数组；
 * 2.str.startsWith("Hello");检测字符串是否以指定的子字符串开始。
 * 3. 数据扁平化成为对象；
  if(data && typeof data === 'object') {
    Object.key(data).forEach(key => {
      Object.defineProperty(data, key, {
        get() {
          return data[key]
        },
        set(newValue) {
          if(value === newValue) return;
          value = newVal
        }
      })
    })
  }
 */