<template>
    <StructPage>
        <Header
            slot="header"
            title="商品列表"
            :showBack="false"
        />
        <div slot="content">
            <!-- <PullRefresh
            v-model="topLoading"
            @refresh="onRefresh"> -->
                <ul class="goods-list">
                    <li class="list-item" v-for="item in items" :key="item.id">
                        <div class="left-part">
                            <h3>{{item.name}}</h3>
                            <div class="van-hairline--surround" style="background-color:#B3B3B3;height:1px"></div>
                            <span class="price">￥{{item.price}}</span>
                            <span class="quantity">×{{item.quantity}}</span>
                            <Button
                              size="mini"
                              @click.stop.prevent="viewGoodsDetail(item.id)"
                            >查看详情</Button>
                            <!-- <button @click.stop.prevent="viewGoodsDetail(item.id)">查看详情</button> -->
                        </div>
                        <div class="right-part" @click="play(item.video)">
                            <img :src="item.img" alt="" v-if="item.img">
                            <img v-else :src="defaultGoods" alt="">
                            <button v-if="item.video"></button>
                        </div>
                    </li>
                </ul>
            <!-- </PullRefresh> -->
            <Popup v-model="videoShow" :lazy-render="false">
                <div class="video-wrap">
                <video
                    ref="js-goods-list-video"
                    class="video-js vjs-default-skin vjs-fluid"
                    controls
                    preload="auto"
                    playsinline=""
                    webkit-playsinline=""
                    x5-video-player-fullscreen="true"
                >
                </video>
                </div>
            </Popup>
        </div>
    </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import BottomNoData from 'components/BottomNoData';
import { PullRefresh, List, Toast, Popup, Button } from 'vant';
import { getList } from 'model/goods';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import 'videojs-contrib-hls';
import { autoPlay } from 'utils/media';

export default {
  data () {
    return {
      items: [],
      topLoading: false,
      finished: false,
      orderSn: this.$route.query.order_sn,
      video: null,
      videoShow: false,
      player: null,
      defaultGoods: require('./images/deault-goods.png')
    };
  },
  mounted () {
    this.onRefresh();
    this.player = videojs(this.$refs['js-goods-list-video'], {
      bigPlayButton: false,
      textTrackDisplay: false,
      posterImage: true,
      errorDisplay: false,
      controlBar: true,
      responsive: true
    });
  },
  methods: {
    async onRefresh () {
      let { success, data, msg } = await getList({
        sn: this.orderSn
      });
      if (success) {
        this.items = data;
        this.$nextTick(() => {
          setTimeout(() => {
            this.topLoading = false;
          }, 500);
        });
      } else {
        Toast(msg);
      }
    },
    async viewGoodsDetail (id) {
      this.$go({
        name: 'GoodsDetail',
        query: {
          goods_id: id
        }
      });
    },
    play (videoSrc) {
      if (!videoSrc) {
        return false;
      }
      //   this.player.src(videoSrc);
      this.player.src({
        src: videoSrc,
        type: 'video/mp4'
      });
      this.videoShow = true;
      this.$nextTick(() => {
        autoPlay(() => this.player.play());
      });
    }
  },
  components: {
    StructPage,
    Header,
    PullRefresh,
    List,
    BottomNoData,
    Popup,
    Button
  },
  watch: {
    videoShow (val) {
      if (!val) {
        this.player.pause();
        this.player.reset();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.goods-list {
    padding: 0.2rem 0.28rem;
    background-color: #fff;
    height: 100%;
    box-sizing: border-box;
    .list-item{
        display: flex;
        border-radius: .1rem;
        background-color: #EFEFF4;
        margin-bottom: .2rem;
        .left-part {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: space-between;
            padding: 0.35rem 0.52rem .3rem .26rem;
            position: relative;
            h3{
                font-size: .3rem;
                word-break: break-all;
                width:3rem;
                margin:0;
            }
            .price{
              font-size: .3rem;
              color:#535050;
              line-height: 1.8;
            }
            .quantity{
              font-size: .57rem;
              position: absolute;
              bottom: .3rem;
              right: 0.52rem;
            }
            button{
                width:1.5rem;
                height:.56rem;
                line-height: .56rem;
                border:none;
                outline:none;
                background:rgba(165,105,193,1);
                border-radius:.1rem;
                color: #FAF4FD;
                font-size: .26rem;
                box-sizing: border-box;
                text-align: center;
                padding:0;
            }
        }
        .right-part{
            width: 2.7rem;
            height: 2.7rem;
            // margin-left: 0.2rem;
            position: relative;
            border-radius: 0.09rem;
            overflow: hidden;
            img{
                max-height: 100%;
                max-width: 100%;
                width: 100%;
                height:100%;
            }
            button {
                position: absolute;
                left: 50%;
                top:50%;
                transform: translate3d(-50%,-50%,0);
                width: .72rem;
                height: .72rem;
                border:none;
                outline: none;
                background:url('./images/icon-play@2x.png') 50%/contain no-repeat;            }
        }
    }
}
.video-wrap{
    width: 6.24rem;
    // height:4.5rem;
    background:rgba(255,255,255,1);
    border-radius: 0.18rem;
}
</style>
