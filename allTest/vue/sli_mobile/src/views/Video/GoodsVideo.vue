<template>
    <video
        ref="js-goods-detail-video"
        class="video-js vjs-default-skin"
        controls
        preload="auto"
        playsinline=""
        webkit-playsinline=""
        x5-video-player-fullscreen="true"
        style="width:100%;height:100%"
        :src="videoSrc"
        >
    </video>
</template>

<script>
import { getItem } from 'model/goods';
import { Toast } from 'vant';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import 'videojs-contrib-hls';
import { autoPlay } from 'utils/media';
export default {
  data () {
    return {
      goodsId: this.$route.query.goods_id,
      player: null,
      videoSrc: ''
    };
  },
  mounted () {
    // this.initVideo();
    this.setVideo();
  },
  methods: {
    async setVideo () {
      let { success, data, msg } = await getItem({
        id: this.goodsId
      });
      let player = this.$refs['js-goods-detail-video'];
      if (success) {
        this.videoSrc = data.video;
        autoPlay(() => {
          player.play().then(x => {
            player.pause();
          }).catch(error => {
            Toast(error);
          });
        });
      } else {
        Toast(msg);
        console.log(msg);
      }
    },
    initVideo (videoSrc) {
      this.player = videojs(this.$refs['js-goods-detail-video'], {
        bigPlayButton: false,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        controlBar: true,
        responsive: true
      });
    }
  }
};
</script>
<style lang="less">
video{
    max-height: 100%;
    max-width: 100%;
}
</style>
