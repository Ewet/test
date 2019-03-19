<template>
    <div class="exceptionBox">
      <ul>
        <li>
          <span>货区{{layerNo}}</span>
        </li>
        <li>
          <p>异常选择</p>
          <slot name="exceptionSelect"></slot>
        </li>
        <li style="align-items: flex-start;border-bottom:none;">
          <div class="remarks">
            <p style="width:50px;">备注：</p>
            <slot name="textarea"></slot>
          </div>
          <div v-show="!isShow" class="addImg" @click="addImg">
            <icon class="icon" name="add-o" />
          </div>
          <div v-show="isShow" class="imgBox">
            <img :src="url" alt="">
            <icon class="icon" name="clear" @click="delImg" />
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
import { Icon } from 'vant';
import wechat from 'utils/wechat';
export default {
  props: {
    layerNo: {
      type: String,
      default: ''
    },
    itemId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      url: '',
      isShow: false
    };
  },
  mounted () {
    Array.from(document.getElementsByClassName('remark')).forEach(x => {
      this.autoheight(x);
    });
  },
  methods: {
    delImg () {
      this.url = '';
      this.isShow = false;
      this.$emit('setMediaId', {
        itemId: this.itemId,
        mediaId: ''
      });
    },
    addImg () {
      wechat.uploadImage((res) => {
        let url = res.url;
        let serverId = res.serverId;
        console.log('添加图片返回数据：', res);
        if (url) {
          this.url = url;
          this.isShow = true;
          this.$emit('setMediaId', {
            itemId: this.itemId,
            mediaId: serverId
          });
        }
      });
    },
    autoheight (node) {
      var msie = +((/msie (\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
      if (isNaN(msie)) {
        msie = +((/trident\/.*; rv:(\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
      }
      // listeners not attached yet
      if (node.getAttribute('autoheight') == null) {
        node.setAttribute('autoheight', '');
        // user input, copy, paste, cut occurrences
        node.addEventListener('input', adjust, false);
        node.addEventListener('change', adjust, false);
      }

      // initial adjust
      adjust();

      function adjust () {
        var lineHeight = getLineHeight(node);
        if (!(node.offsetHeight || node.offsetWidth)) return;
        if (node.scrollHeight <= node.clientHeight) node.style.height = '0px';
        var h =
          node.scrollHeight + // actual height defined by content
          node.offsetHeight - // border size compensation
          node.clientHeight; //       -- || --
        node.style.height =
          Math.max(h, lineHeight) +
          (msie && lineHeight ? lineHeight : 0) + // ie extra row
          'px';
      }
      function getLineHeight (node) {
        var computedStyle = window.getComputedStyle(node);
        var lineHeightStyle = computedStyle.lineHeight;
        if (lineHeightStyle === 'normal') {
          return +computedStyle.fontSize.slice(0, -2);
        } else return +lineHeightStyle.slice(0, -2);
      }
    }
  },
  components: {
    Icon
  }
};
</script>
<style lang="less">
@import '~@/assets/color.less';

.exceptionBox{
  margin-top: 0.2rem;
  background-color: #fff;
  padding:0.2rem 0.3rem;
  ul{
    width: 100%;
    min-height: 4.62rem;
    li{
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 0.9rem;
      box-sizing: border-box;
      padding: 0.2rem 0;
      border-bottom: 1px solid #eee;
      span{
        font-size: 0.24rem;
        color: #BEBEBE;
      }
      input{
        display: block;
        height: 100%;
        background: none;
        border: none;
        font-size: 0.24rem;
      }
      p{
        display: flex;
        align-items: center;
        font-size: 0.28rem;
        margin: 0;
        span{
          color: #7C7B7B;
        }
        i{
          font-size: 0.32rem;
          color: #7C7B7B;
        }
      }
      .remarks{
        display: flex;
        align-items: flex-start;
        width: 4.3rem;
        min-height: 2.6rem;
        p{
          font-size: 0.28rem;
          margin: 0;
        }
        textarea{
            font-size: 0.28rem;
            min-height: 2.6rem;
            resize:none;
            overflow: hidden;
            resize: none;
            box-sizing: border-box;
            border: none;
        }
        .test_box{
          font-size: 0.28rem;
          width: 80%;
          min-height: 1.5rem;
          border: none;
          outline: 0;
          p{
            margin: 0;
          }
        }
      }
      .addImg{
        width: 1.5rem;
        height: 1.5rem;
        background-color: #EFEFF4;
        position: relative;
        .icon{
          font-size: 0.5rem;
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -0.25rem 0 0 -0.25rem;
          color: #6E6E6E;
        }
      }
      .imgBox{
        width: 2.6rem;
        height: 2.6rem;
        position: relative;
        .icon{
          font-size: 0.5rem;
          position: absolute;
          top: -0.08rem;
          right: -0.08rem;
          color: #EFEFF4;
        }
        img{
          display: block;
          width: 100%;
          height: 100%;
          object-fit:cover;
        }
      }
    }
  }
}
</style>
