<template>
    <StructPage>
        <Header
            slot="header"
            title="盒子详情"
        />
        <div slot="content">
            <PullRefresh
            v-model="refreshing"
            @refresh="onRefresh">
                <List
                     v-model="loading"
                    :finished="finished"
                    @load="onLoad"
                >
                    <ul class="goods-list">
                        <li class="list-item mt20"
                        v-for="(item) in items"
                        :key="item.id"
                        @click="handleGoodsClick(item.goodsId)">
                            <img v-if="item.img" :src="item.img" alt="">
                            <img v-else :src="img" alt="">
                            <p>{{item.goodsName}}</p>
                            <div>
                                <span>￥{{item.price}}</span>
                                <i>数量：{{item.quantity}}支</i>
                            </div>
                        </li>
                    </ul>
                    <BottomNoData
                        v-show="finished && items.length"
                    ></BottomNoData>
                </List>
            </PullRefresh>
        </div>
    </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import BottomNoData from 'components/BottomNoData';
import { PullRefresh, List, Toast } from 'vant';
import { getItem } from 'model/myBox';

export default {
  data () {
    return {
      items: [],
      refreshing: false,
      finished: false,
      loading: false,
      img: require('assets/motao.png'),
      boxId: this.$route.query.box_id || ''
    };
  },
  mounted () {
    this.onRefresh();
  },
  methods: {
    async onLoad () {
      if (this.boxId) {
        let { success, data, msg } = await getItem({
          box_id: this.boxId
        });
        if (success) {
          this.items = this.items.concat(data.goods);
          this.$nextTick(() => {
            setTimeout(() => {
              this.loading = false;
              if (!data.hasMore) {
                this.finished = true;
              }
            }, 500);
          });
        } else {
          Toast(msg);
          this.loading = false;
          this.finished = true;
        }
      }
    },
    async onRefresh () {
      this.items = [];
      setTimeout(() => {
        this.finished = false;
        this.refreshing = false;
        window.scrollTo(0, 10);
      }, 500);
    },
    handleGoodsClick (goodsId) {
      this.$go({
        name: 'GoodsDetail',
        query: {
          goods_id: goodsId
        }
      });
    }
  },
  components: {
    StructPage,
    Header,
    PullRefresh,
    List,
    BottomNoData
  }
};
</script>
<style lang="less" scoped>
.goods-list {
    height: 100%;
    box-sizing: border-box;
    padding: 0 .3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .list-item{
        width:3.35rem;
        padding: 0.18rem 0.23rem;
        box-sizing: border-box;
        background-color: #fff;
     img{
         width: 100%;
         height:3.36rem;
     }
     p{
         font-size: .24rem;
         color: #000;
     }
     div{
         display: flex;
         justify-content: space-between;
         align-items: center;
         span{
             font-size: 0.26rem;
             color:#2A2A2A;
         }
         i{
             font-size: 0.18rem;
             color: #B5B5B5;
             font-style: normal;
         }
     }
    }
}
</style>
