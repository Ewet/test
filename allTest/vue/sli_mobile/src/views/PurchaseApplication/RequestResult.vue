<template>
    <StructPage :bgImg="bgImg">
        <Header
            slot="header"
            title="代购申请"
            :transparentBar="true"
        />
        <div slot="content" class="application-result">
          <div class="top-icon">
            <icon name="checked" v-if="status==='603'"/>
            <icon name="clear" v-if="status==='604'"/>
          </div>
          <div class="center-msg" :class="{'center-msg1': status==='601'}">
            <div v-if="status==='601'">尊敬的客户：<p>您好，如需申请成为代购员，请先注册摩萄盒子系统账号，谢谢！</p>
            </div>
            <div v-if="status==='604'">尊敬的客户：<p>
              您好，很遗憾您的申请未获通过，您可以重新申请！</p>
            </div>
            <div v-if="status==='603'">尊敬的客户：<p>您好，感谢您的等待，您的申请已经审核通过！</p>
            </div>
            <div v-if="status==='602'">尊敬的客户：<p>您好，您的申请已经提交，请耐心等待审核！</p>
            </div>
          </div>
          <div class="bottom-img" v-if="status==='604'">
            <div class="fault-message" >
              <p>失败原因</p>
              <div class="fault-reason">{{reason}}</div>
            </div>
          </div>
          </div>
        </div>
        <Button slot="footer" class="btn" square type="default" v-if="status==='601'" @click="go('UserLogin')">立即注册</Button>
        <Button slot="footer" class="btn" square type="default" v-if="status==='604'" @click="go('Request')">重新申请</Button>
    </StructPage>
</template>

<script>
import { Button, Icon, Toast } from 'vant';
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import { purchasingCheck } from '@/model/purchaseApplication';
export default {
  data () {
    return {
      bgImg: 'purchase-application',
      status: this.$route.query.status,
      reason: ''
    };
  },
  computed: {},
  mounted () {
    if (this.status === '604') {
      this.bgImg = 'purchase-application-no';
      this.getStatus();
    }
  },
  methods: {
    go (name) {
      this.$go({
        name: name
      });
    },
    getStatus () {
      purchasingCheck().then(result => {
        if (result.success) {
          this.reason = result.data.reason;
        } else if (result.code !== 401) {
          Toast(result.msg);
        }
      });
    }
  },
  components: {
    StructPage,
    Header,
    Button,
    Icon
  }
};
</script>
<style lang="less">
@import "~@/assets/color.less";
.application-result {
  .van-cell--required::before {
    color: @primaryColor;
  }
}
</style>
<style lang="less" scoped>
@import "~@/assets/color.less";
.application-result{
  color:#ffffff;
  p{
    margin:0;
  }
  .top-icon{
    position: relative;
    height: 2rem;
    .van-icon{
      position:absolute;
      top:0;
      bottom:0;
      left:0;
      right:0;
      margin:auto;
      width: 1.05rem;
      height: 1.05rem;
    }
  }
  .center-msg{
    height: 1.58rem;
    font-size:0.38rem;
    padding:0 1.2rem;
    p{
      text-indent: 0.7rem;
    }
  }
  .center-msg1{
    padding:0 0.7rem;
  }
  .bottom-img{
    height: 3.9rem;
    margin-top:1.05rem;
    .fault-message{
      width:6.19rem;
      font-size:0.24rem;
      margin: 0 auto;
      .fault-reason{
        margin-top:0.1rem;
        padding:0.15rem;
        color:#3D3D3D;
        height: 3.19rem;
        background: #ffffff;
      }
    }
  }
}
  .btn {
    width: 100%;
    height: 0.98rem;
    font-size: 0.32rem;
    line-height: 0.98rem;
    background: @primaryColor;
    color: #ffffff;
    border:none;
  }

</style>
