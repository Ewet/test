<template>
  <div class="wrap" >
    <div class="logo">
      <img src="./images/logo.png">
    </div>
    <div class="date" >
      <div class="dateTop">
        <div class="day"  v-for="(item,index)  in day" :key="index">
           <img :src="item">
        </div>
      </div>
      <div class="dateBottom">
        <div class="month"><img :src="month"></div>
        <div class="year" v-for="(item,index)  in year" :key="index">
          <img :src="item">
        </div>
      </div>
    </div>
    <div class="texBox">
      <p v-html="text"></p>
    </div>
    <div class="qrBox">
      <div class="qrImg">
        <img :src="qrUrl">
        <img v-show="avatar" class="avatar" :src="avatar">
      </div>
      <p>您身边的红酒专员</p>
    </div>
  </div>
</template>
<script>
import { getQrCode } from '@/model/memberModel';

export default {
  data () {
    return {
      day: [],
      month: '',
      year: [],
      qrUrl: '',
      avatar: '',
      text: ''
    };
  },
  mounted () {
    this.initDate();
    getQrCode().then((res) => {
      this.qrUrl = res[0];
      this.avatar = res[1];
    });

    this.randomText();
  },

  methods: {
    // 获取本地日期
    initDate (d) {
      this.$nextTick(() => {
        this.day = [];
        this.month = '';
        this.year = [];
        let date = new Date();
        let Y = date.getFullYear() + '';
        let M = date.getMonth() + 1;
        let D = date.getDate() + '';
        this.month = require('./images/e' + M + '.png');
        let dayArr = D.split('');
        let yearArr = Y.split('');
        dayArr.forEach((item, index) => {
          let url = require('./images/' + item + '.png');
          this.day.push(url);
        });
        yearArr.forEach((item, index) => {
          let url = require('./images/' + item + '.png');
          this.year.push(url);
        });
      });
    },

    // 随机数
    randomNumBoth (Min, Max) {
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range); // 四舍五入
      return num;
    },

    // 随机文字
    randomText () {
      let arr = this.getTextArr();
      let len = arr.length - 1;
      this.text = arr[this.randomNumBoth(0, len)];
      // let n=0;
      // setInterval(()=>{
      //   if(n<=len){
      //     this.text = arr[n];
      //     n++;
      //   }else{
      //     n=0;
      //   }

      // }, 2000);
    },

    // 文字数组
    getTextArr () {
      return [
        '女人可以学会喝酒，但是不管在任何场合都不能让自己喝醉。',
        '晚来天欲雪，能饮一杯无？',
        '相逢是首歌，歌手是你和我。分别是杯酒，不醉不罢休。',
        '让外表简单一点，内涵就会更丰富一点。让需求简单一点，心灵就会更丰富一点。',
        '做人就要像花一样，不管有没有人欣赏，但是你一定要绽放，你不是为别人，而是为自己。',
        '生活虽然一地鸡毛，但是依然要欢歌高进，成长之路虽然有玫瑰有荆棘，但什么都不能阻挡坚强的心。',
        '一个人的知识，通过学习可以得到；一个人的成长，必须通过磨练。',
        '人生中最艰难的两场考验：等待时机到来的耐心，和面对一切际遇的勇气。',
        '决不能习惯失败，因为你要知道，身体的疲惫，不是真正的疲惫；精神上的疲惫，才是真的劳累。',
        '要记住每一个对你好的人，因为他们本可以不这么做的。'
      ];
    }

  }

};

</script>
<style lang="less">
img{
  display: block;
  height: 100%;
}
.logo{
  width: 1.08rem;
  height: 0.81rem;
  position: absolute;
  right: 0.48rem;
  top: 0.6rem;
}
.wrap{
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #000;
  background:url('./images/bg01.png');
  background-size: 100%;
}
.date{
  display: inline-block;
  position: absolute;
  right: 0.48rem;
  top: 2.44rem;
}
.day{
  width: 0.44rem;
  height: 0.81rem;
  margin: 0 auto;
}
.dateTop{
  display: flex;
}
.dateBottom{
  display: flex;
  margin: 0.2rem auto 0 auto;
}
.month,.year{
  height: 0.25rem;
  display: flex;
}
.year img{
  margin-left: 0.04rem;
}
.texBox{
  max-width: 6.48rem;
  position: absolute;
  bottom: 2.7rem;
  left: 0.52rem;
}
.texBox p{
  color: #fff;
  line-height: 0.6rem;
  font-size: 0.36rem;
  font-family: 'MicrosoftYaHei';
}
.qrBox{
  display: inline-block;
  position: absolute;
  height: 1.13rem;
  bottom: 1.2rem;
  right: 0.42rem;
}
.qrBox>p{
  font-size: 0.21rem;
  color: #fff;
  margin-top: 0.2rem
}
.qrImg{
  width: 1.4rem;
  height: 1.4rem;
  margin: 0 auto;
  position: relative;
  background-color:#fff;

}
.qrImg img.avatar{
  width: 24%;
  height: 24%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  border: 0.06rem solid #fff;
}
</style>
