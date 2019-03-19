<template>
    <StructPage bgImg="lottery-bg2">
        <Header
            slot="header"
            title="奖品列表"
            :transparentBar="true"
        />
        <div slot="content">
            <ul class="prize-list">
                <li v-for="(item, key) in items" :key="key">
                    <a href="#" @click.prevent>
                        <!-- <img :src="item.img" alt=""> -->
                        <span
                           class="img-wrap">
                            <img
                            :src="item.img"
                            :class="[item.type === 2 ? 'coupon-img': '']"
                            alt=""/>
                            <p v-if="item.type === 2" class="coupon-text">
                                <span style="font-size:0.5rem">
                                    {{item.couponType === 1 ? `${item.couponValue}元` : `${item.couponValue * 10}折`}}
                                </span>
                                <br>
                                <span style="font-size:0.47rem">{{item.couponTypeText}}劵</span>
                            </p>
                        </span>
                        <p class="van-ellipsis">{{item.desc}}</p>
                    </a>
                </li>
            </ul>
        </div>
    </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import { getCurrentActivityPrize } from 'model/lotteryActivity';
import { Toast } from 'vant';
export default {
  name: 'PrizeList',
  data () {
    return {
      items: [
      ]
    };
  },
  mounted () {
    this.loadData();
  },
  methods: {
    async loadData  () {
      let { success, data, msg } = await getCurrentActivityPrize({
        activity_id: this.$route.query.activity_id,
        'pagination[page_size]': 10000
      });
      if (success) {
        let { items } = data;
        this.items = items.map(x => {
          let desc = '';
          // 奖金
          if (x.type === 1) {
            desc = `${x.value}元奖励金`;
          }
          //   优惠劵
          if (x.type === 2) {
            x.img = require('./images/lottery-tag.png');
            if (x.couponType === 1) {
              desc = `${x.couponValue}元${x.couponTypeText}劵`;
            } else if (x.couponType === 2) {
              desc = `${x.couponValue * 10}折${x.couponTypeText}劵`;
            }
          }
          //   实物
          if (x.type === 3) {
            desc = x.name;
          }
          x.desc = desc;
          return x;
        });
      } else {
        Toast(msg);
      }
    }
  },
  components: {
    StructPage,
    Header
  }
};
</script>
<style lang="less" scoped>
.prize-list{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0.37rem;
  a {
    background:rgba(255,255,255,1);
    border-radius: 0.1rem;
    display: block;
    width: 3.3rem;
    text-align: center;
    margin-bottom: 0.2rem;
    padding: 0.3rem;
    box-sizing: border-box;
    margin-bottom: .2rem;
    position: relative;
    img {
      height:100%;
    }
    p {
        font-size: .3rem;
        color: #323232;
        margin: 0;
        margin-top:.2rem;
    }
    .img-wrap{
        display: flex;
        width:2.8rem;
        height:2.12rem;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    .coupon-img {
        height:1.3rem;
    }
    .coupon-text{
        position: absolute;
        color: #fff;
        line-height: 1.2;
        margin: 0;
    }
  }
}
</style>
