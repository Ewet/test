<template>
  <Modal
        :value="value"
        title="视频预览"
        :footerHide="true"
        @on-cancel="handleCancel">
    <video-player
      class="video-player-box"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
    ></video-player>
  </Modal>
</template>
<script>
import 'video.js/dist/video-js.css';

import { videoPlayer } from 'vue-video-player';

// Similarly, you can also introduce the plugin resource pack you want to use within the component
// import 'some-videojs-plugin'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    // 退货id
    videoSrc: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      playerOptions: {
        // videojs options
        // muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [],
        poster: '/static/images/author.jpg',
        fluid: true
      }
    };
  },
  mounted () {
    console.log('this is current player instance object', this.player);
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    handleCancel () {
      this.$emit('input', false);
      this.player.currentTime(0);
      this.player.pause();
    }
  },
  components: {
    videoPlayer
  },
  watch: {
    value (val) {
      if (val && this.player.paused) {
        this.player.play();
      }
    },
    videoSrc (val) {
      if (val) {
        this.player.src({
          type: 'video/mp4',
          src: val
        });
        this.player.play();
      }
    }
  }
};
</script>
