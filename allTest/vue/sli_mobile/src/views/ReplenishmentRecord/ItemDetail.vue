<template>
  <div class="detail-item">
    <div class="detail-top">
      <span>{{position}}</span>
      <span  v-show="state">状态：已{{state}}</span>
    </div>
    <div class="detail-contain">
      <div class="detail-img">
        <img v-show="imgUrl" :src="imgUrl">
      </div>
      <div class="detail-main">
        <h3>{{name}}</h3>
        <p>
          <span  v-show="before!==null"><b>理货前:</b><i>{{before}}支</i></span>
          <span v-show="after!==null"><b>理货后:</b><i>{{after}}支</i></span>
        </p>
      </div>
      <div class="detail-right">
        <b>￥{{price}}</b>
      </div>
    </div>
  </div>
</template>
<script>
import { List } from 'vant';
export default {
  name: 'RecordItem',
  props: {
    imgUrl: {
      type: String,
      default: 'tally'
    },
    position: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    before: {
      type: Number,
      default: null
    },
    after: {
      type: Number,
      default: null
    },
    price: {
      type: Number,
      default: null
    }
  },
  components: {
    List
  },
  methods: {

  }
};

</script>
<style lang="less" scoped>
.detail-item {
  background-color:#fff;
  padding:0.3rem;
  margin-bottom: 0.2rem;
}

.detail-top {
  display: flex;
  justify-content: flex-start;
  padding-bottom:0.2rem;
  border-bottom:1px solid #eee;
}

.detail-top span {
  display: block;
  font-size:0.24rem;
  width: 50%;
  color:#7C7B7B;
}
.detail-top span:nth-of-type(1){
  text-align:left;
}
.detail-top span:nth-of-type(2){
  text-align:right;
}
.detail-contain{
  display: flex;
  justify-content: flex-start;
  margin:0.2rem 0 0 0;
}
.detail-img{
  width:1.2rem;
  height:1.2rem;
  overflow:hidden;
}
.detail-img img{
  display: block;
  width: 100%;
  height: 100%;
  object-fit:cover;
}
.detail-main{
  display: flex;
  justify-content: flex-start;
  align-content:space-between;
  flex-wrap: wrap;
  width:3.7rem;
  min-height:1.2rem;
  margin:0 0 0 0.2rem;
}
.detail-main>h3{
  width:100%;
  margin:0;
  color:#000;
  word-wrap:break-word;
  font-size:0.28rem;
}
.detail-main>p{
  display: flex;
  width:100%;
  justify-content: space-between;
  font-size:0.24rem;
  color:#7B7B7B;
  margin:0;
}
.detail-main>p span{
  display:flex;
  justify-content: flex-start;
  width:50%;
}
.detail-main>p span:nth-of-type(1){
  margin:0 0.2rem 0 0;
}
.detail-main>p i{
  display:block;
  font-style: normal;
  width:51%;
  word-wrap:break-word;
}
.detail-main>p b{
  display:block;
  width:49%;
  font-style: normal;
}
.detail-right{
  width:2rem;
  display: flex;
  justify-content: flex-end;
  align-content:space-between;
  flex-wrap: wrap;
  text-align:right;
  color:#000;
}
.detail-right>b{
  display:block;
  width:100%;
  word-wrap:break-word;
  text-align:right;
  font-size:0.26rem;
}
.detail-right>span{
  display:block;
  width:100%;
  text-align:right;
  font-size:0.24rem;
  color:#A669C2;
}

</style>
