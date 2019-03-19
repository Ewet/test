<template>
    <StructPage style="background-color:#fff">
        <!-- <Header
            slot="header"
            title="商品详情"
        /> -->
        <div slot="content" class="goods-detail-content">
          <h2 v-text="name" class="mb30"></h2>
          <div class="wavy-line"></div>
          <iframe v-if="!!video" class="video mb30" :src="videoSrc" frameborder="0"></iframe>
          <Swipe :autoplay="3000" class="mb30" v-if="!video && images.length">
            <SwipeItem v-for="(image, index) in images"
            :key="index">
              <img v-lazy="image" @click="handlePreview(images, image)"/>
            </SwipeItem>
          </Swipe>
          <div class="content" ref="js-content"
          v-html="content"></div>
        </div>
    </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import { NavBar, Toast, Swipe, SwipeItem, ImagePreview } from 'vant';
import { getItem } from 'model/goods';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import 'videojs-contrib-hls';
export default {
  data () {
    return {
      goodsId: this.$route.query.goods_id,
      content: '',
      name: '',
      images: [],
      video: '',
      videoSrc: ''
    };
  },
  mounted () {
    this.loadData();
    this.initContentImage();
  },
  methods: {
    async loadData () {
      let { success, data, msg } = await getItem({
        id: this.goodsId
      });
      if (success) {
        this.name = data.name;
        this.images = data.images;
        this.content = data.content;
        this.video = data.video;
        if (this.video) {
          this.videoSrc = `/mobile/goods-video?goods_id=${this.goodsId}`;
        }
      } else {
        Toast(msg);
      }
    },
    initVideo () {
      let player = videojs(this.$refs['js-goods-detail-video'], {
        bigPlayButton: false,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        controlBar: true,
        responsive: true
      });
      player.src({
        src: this.video,
        type: 'video/mp4'
      });
      player.play().then(x => {
        player.pause();
      });
    },
    handlePreview (images, image) {
      wx.previewImage({
        current: image || '', // 当前显示图片的http链接
        urls: images // 需要预览的图片http链接列表
      });
      // ImagePreview({
      //   images: images,
      //   startPosition: index || 0
      // });
    },
    initContentImage () {
      this.$refs['js-content'].addEventListener('click', (event) => {
        let el = event.target;
        if (el.tagName === 'IMG' && el.src) {
          this.handlePreview([el.src]);
        }
      });
    }
  },
  components: {
    StructPage,
    NavBar,
    Swipe,
    SwipeItem,
    Header,
    ImagePreview
  }
};
</script>
<style lang="less">
@import '~@/assets/color.less';
.goods-detail-content {
    font-size: 14px;
    background-color: #fff;
    padding: 0 0.3rem;
    h2{
      font-size: 0.38rem;
      color: #333;
      text-align: center;
      word-break: break-all;
    }
    .wavy-line {
      background: url('~@/assets/wavy-line.png') 0 0/contain no-repeat;
      height: .24rem;
      width:5.52rem;
      margin: 0 auto .5rem;
    }
    .video {
      width: 100%;
      height: 4.5rem;
      margin: auto;
      margin-bottom: .3rem;
    }
    .van-swipe{
      margin-bottom: .3rem;
      img {
        display:block;
        width: 4.5rem;
        height: 4.5rem;
        margin: auto;
      }
    }
    .content{
      img {
          display: block;
          width: 100%;
      }
    }
    p {
        margin:0;
    }
    .vjs_video_3-dimensions {
      width:100%;
      height:100%;
    }
    .van-swipe__indicator--active {
      background-color:@primaryColor;
    }
}
</style>
