import imgSrc from '../../assets/01.jpg'
var app = {
	data () {
		return {
			imgSrc:imgSrc
		}
	},
	template: `
		<div>
			我是一个入口组件
			<img :src='imgSrc'>
		</div>
	`
	
}

export default app;