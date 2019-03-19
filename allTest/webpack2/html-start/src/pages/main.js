import Vue from './vue.js';

import './index.css';
import './index.less';

import App from './App.js';
new Vue({
	el:'#app',
	components:{
		App
	},
	template: '<App/>'
})