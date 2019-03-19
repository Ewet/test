<template>
    <StructPage>
        <Header
            slot="header"
            title="我的盒子"
        />
        <div slot="content" style="padding-top:0.2rem;">
            <PullRefresh
            v-model="refreshing"
            @refresh="onRefresh">
                <List
                     v-model="loading"
                    :finished="finished"
                    @load="onLoad"
                >
                    <ul class="goods-list">
                        <li class="list-item van-hairline--surround"
                        v-for="item in items"
                        :key="item.id"
                        @click="handleItemClick(item.boxId)">
                            <div>
                                <img :src="img" alt="">
                                <div class="txt">
                                    <h3>盒子编号 : {{item.boxNo}}</h3>
                                    <p>{{item.address}}</p>
                                </div>
                            </div>
                            <span>距离：{{item.distance >= 1 ? `${item.distance}千米` : `${item.distance * 1000}米`}}</span>
                        </li>
                        <li v-show="finished && items.length">
                              <BottomNoData></BottomNoData>
                        </li>
                    </ul>
                    <ListNoData
                      desc="附近没有盒子"
                      v-show="noData">
                    </ListNoData>
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
import { getList } from 'model/myBox';
import ListNoData from 'components/ListNoData';

import wechat from 'utils/wechat';
export default {
  data () {
    return {
      items: [],
      refreshing: false,
      finished: false,
      loading: false,
      img: require('assets/motao.png'),
      lng: '',
      lat: '',
      loaded: false,
      noData: false
    };
  },
  mounted () {
    wechat.getLocation(({
      latitude,
      longitude
    }) => {
      this.lng = longitude;
      this.lat = latitude;
      this.onRefresh();
    });
  },
  methods: {
    async onLoad () {
      let { success, data, msg } = await getList({
        lng: this.lng,
        lat: this.lat
      });
      if (success) {
        this.items = this.items.concat(data.items);
        this.loading = false;
        if (!data.hasMore) {
          this.finished = true;
        }
      } else {
        Toast(msg);
        this.loading = false;
        this.finished = true;
      }
      this.loaded = true;
      if (this.items.length === 0) {
        this.$nextTick(() => {
          this.noData = true;
        });
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
    handleItemClick (boxId) {
      this.$go({
        name: 'BoxDetail',
        query: {
          box_id: boxId
        }
      });
    }
  },
  components: {
    StructPage,
    Header,
    PullRefresh,
    List,
    BottomNoData,
    ListNoData
  }
};
</script>
<style lang="less" scoped>
.goods-list {
    height: 100%;
    box-sizing: border-box;
    .list-item{
        display: flex;
        padding: 0.36rem;
        justify-content: space-between;
        background: #fff;
        > div {
            display: flex;
            img{
                width: 1.1rem;
                height: 0.84rem;
            }
            .txt {
                margin-left:.3rem;
                h3 {
                    font-size:0.3rem;
                    color:#000;
                    line-height:0.4rem;
                    margin:0;
                }
                p{
                    color: #B5B5B5;
                    font-size: .24rem;
                    margin:0;
                    line-height: 1.8;
                }
            }
        }
        span {
            position: absolute;
            right: 0.18rem;
            font-size: 0.18rem;
            color: #A669C2;
        }
    }
}
</style>
