<template>
    <div class="listitem van-hairline--bottom" >
        <icon  :name="iconname"/>
        <div class="textbox">
                <div class="gb-left">

                    <div class="textbox">
                        <p class="text">{{ltText}}</p>
                        <p>{{lcText}}</p>
                        <span>{{lbText}}</span>
                    </div>
                </div>
                <div class="gb-right">
                  <p>{{rtText}}</p>
                  <p class="status">{{rbText}}</p>
                </div>
        </div>
    </div>
</template>

<script>
import noDataSrc from '@/assets/no-data@2x.png';
import { NavBar, Button, Popup, Tab, Tabs, Icon } from 'vant';
export default {
  props: {
    iconname: {
      type: String,
      default: ''
    },
    ltText: {
      type: String,
      default: ''
    },
    lcText: {
      type: String,
      default: ''
    },
    lbText: {
      type: String,
      default: ''
    },
    rtText: {
      type: Number,
      default: 0
    },
    rbText: {
      type: String,
      default: ''
    }

  },
  data () {
    return {
      imgSrc: noDataSrc
    };
  },
  computed: {

  },
  components: { NavBar, Button, Popup, Tab, Tabs, Icon }
};
</script>
<style lang="less" scoped>
@import '~@/assets/color.less';
 .listitem{
    //  display: flex;
                // justify-content: space-between;
        height: 1.08rem;
        padding: 0.21rem 0.25rem;
        // margin-bottom: 0.02rem;
        background: #fff;
        .van-icon {
            float: left;
            width: 1.25rem;
                // margin-right: 0.25rem;
                color: @primaryColor;
                font-size: 1rem;
                margin-top: -0.05rem;
        }
        .textbox{
            // width: 5.75rem;
            // float: left;
            //  display: flex;
            // justify-content: space-between;
            // flex-direction: column;
            // align-items: center;
            position: relative;
            // width: 80%;
            margin-left: 0.6rem;
            height: 1.08rem;
            .gb-left {
                position: absolute;
                left: 0;
                // height: 1.08rem;
                //   display: flex;
                //   align-items: center;
                //   justify-content: center;
                //   flex-direction: column;

                  .textbox {
                    // flex:1;
                    p {
                        margin:0;
                        font-size: .3rem;
                        // margin-bottom: 0.1rem;
                    }
                    span {
                        margin:0;
                          color:#888888;
                          font-size: 0.24rem;
                          // margin-left: 0.25rem;
                        }

                  }

                }
                .gb-right{
                    position: absolute;
                    right: 0;
                    height: 1.08rem;
                    display: flex;
                    align-items: center;
                    // text-align: center;
                    justify-content: center;
                    flex-direction: column;
                    // line-height: .4rem;

                    font-size: 0.3rem;
                    p{
                        margin:0;
                    }
                    .status{
                      font-size:0.24rem;
                      color:@primaryColor;
                    }

                }
        }

 }
</style>
