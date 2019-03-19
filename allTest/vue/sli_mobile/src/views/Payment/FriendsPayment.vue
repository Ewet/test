<template>
  <div class="friendspay">
    <TopNav
    title="求付款"
    />
    <div class="toptext">
        <p class="prl topinfo">我在摩萄盒子上挑好了商品，是时候该你仗义疏财啦，快帮我付个款吧~</p>
        <div class="dfamount">
            <span class="text1">代付金额</span>
            <span class="text2">￥254.50</span>
            <span class="text3">收货人：**娟</span>
        </div>
        <Button>豪爽支付</Button>
        <div class="directions prl">
            <p>说明:</p>
            <p>1.付款前务必和好友再次确认，避免是诈骗行为；<br/>
               2.如果发生退款，钱将退还到你的微信账户里。
            </p>
        </div>
    </div>
    <div class="dfmessage prl">
      <div class="van-hairline--bottom mtitle">代付订单信息</div>
      <div class="goodsmessage">
        <div class="desc mb20" v-for="(item, Index) in goods" :key="Index">
            <img :src="item.img"  alt="">
            <div>
                <p class="goodsname">{{item.goodsname}}</p>
            </div>
            <p class="price">
                <span class="bold">￥{{item.goodsprice}}</span><br/><span>x{{item.goodsaccount}}</span>
            </p>
        </div>
      </div>
    </div>
    <!-- <div class="dfmessage prl">

    </div> -->
</div>
</template>
<script>
import { NavBar, Button } from 'vant';
import TopNav from 'components/TopNav';
export default {
  data () {
    return {
      showCard: false,
      goods: [
        {
          img: 'http://img3.imgtn.bdimg.com/it/u=3099828798,2721366667&fm=27&gp=0.jpg',
          goodsname: '富隆酒业 智利进口红酒 富隆胜卡罗窖选嘉本纳沙威农红葡萄酒750ml*2......',
          goodsprice: '1314.25',
          goodsaccount: '1'
        },
        {
          img: 'http://img3.imgtn.bdimg.com/it/u=3099828798,2721366667&fm=27&gp=0.jpg',
          goodsname: '富隆酒业 智利进口红酒 富隆胜卡罗窖选嘉本纳沙威农红葡萄酒750ml',
          goodsprice: '1314.25',
          goodsaccount: '1'
        },
        {
          img: 'http://img3.imgtn.bdimg.com/it/u=3099828798,2721366667&fm=27&gp=0.jpg',
          goodsname: '富隆酒业富隆酒业富隆酒业 智利进口红酒 富隆胜卡罗窖选嘉本纳沙威农红葡萄酒750ml',
          goodsprice: '1314.25',
          goodsaccount: '1'
        }
      ],
      formData: {
        threshold: '满100元可用',
        couponType: '满减券',
        range: '仅限三乡店',
        discount: 10,
        directions: '无门槛满则减10元',
        validityPeriod: '永久有效',
        cardType: 2
      }
    };
  },
  mounted () {
  },
  methods: {
  },
  components: { NavBar, Button, TopNav }
};
</script>
<style  lang="less" scoped>
@import '~@/assets/color.less';
.friendspay {
    p{
        margin:0;
    }
    .prl{
        padding:0 0.3rem;
    }
    .toptext{
        font-size: 0.26rem;
        background: #ffffff;
        // padding-bottom:.2rem ;
        padding:.24rem 0 0.4rem;
        margin-bottom: 0.2rem;
        height:6.36rem;
        .topinfo{
            margin-bottom: 0.4rem;
        }
        .dfamount{
            position: relative;
            height:2.24rem;
            background:url(./images/daifu@2x.png);
            background-size: 7.5rem 2.24rem;
            text-align: center;
            color:#666666;
            .text1{
                position: absolute;
                font-size: 0.26rem;
                left: 1.1rem;
                top:0.32rem;
            }
            .text2{
                color:#C80047;
                position: absolute;
                font-size: 0.6rem;
                left: 0;
                right: 0;
                top:0.8rem;
            }
            .text3{
                position: absolute;
                font-size: 0.24rem;
                right: 0.3rem;
                bottom:0.32rem;
            }
        }
        .van-button{
            margin:0.7rem 1.85rem 0.45rem;
            width: 3.3rem;
            height:0.7rem;
            line-height:0.7rem;
            // border-radius: 0.16rem;
            background:@primaryColor;
            color:#ffffff;
        }
        .directions{
            p:nth-child(1){
                font-size: 0.28rem;
                margin-bottom: 0.26rem;
            }
            p:nth-child(2){
                color:#666666;
            }

        }
    }
    .dfmessage {
        background: #ffffff;
        // margin-bottom: .2rem;
        // padding-bottom: .2rem;
        height:3.2rem;
        .mtitle{
            font-size: 0.28rem;
            line-height: 0.9rem;
            color:#666666;
        }
        .goodsmessage{
             max-height: 2.3rem;
             overflow: auto;
             -webkit-overflow-scrolling: touch;
            .desc {

                position: relative;
                box-sizing: border-box;
                height: 0.9rem;
                font-size: 0.24rem;
                padding-top: 0.2rem;
                // background-color: #f8f8fa;
                .goodsname{
                    font-size: 0.24rem;
                    margin: 0.1rem;
                    // width:4rem;
                    padding-right:1.81rem;
                    // width:220px;
                    //  word-break:break-all;
                    display:-webkit-box;
                    -webkit-line-clamp:2;
                    -webkit-box-orient:vertical;
                    overflow:hidden;
                }

            // .desc + .desc {
            //     border-top: 0.1rem solid #ffffff;
            // }
                img {
                    width: 0.9rem;
                    height: 0.9rem;
                    float: left;
                    margin-right: .3rem;
                }
                .price {
                    position: absolute;
                    right: 0;
                    top: 0.3rem;
                    // margin-top: 0;
                    text-align: right;
                    // font-size: 0.26rem;
                    span:nth-of-type(2) {
                        color: #999999;
                        // font-size: 0.24rem;

                    }
                }

            }
        }
    }

}

</style>
