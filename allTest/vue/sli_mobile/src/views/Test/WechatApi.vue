<template>
    <StructPage>
        <Header
            title="微信API测试"
            slot="header"
        ></Header>
        <div slot="content">
            <van-button type="default" @click="handleOpenCamera">打开摄像头</van-button>
            <van-button type="default" @click="handleGetLocation">获取位置</van-button>
        </div>
    </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import { Button, Toast } from 'vant';
import wechat from 'utils/wechat';
export default {
  data () {
    return {
    };
  },
  methods: {
    handleGetLocation () {
      wechat.getLocation(res => {
        console.log(res);
      });
    },
    handleOpenCamera () {
      wechat.uploadImage(res => {
        console.log(res);
      });
    }
  },
  components: {
    StructPage,
    Header,
    Toast,
    [Button.name]: Button
  }
};
</script>
<style lang="less" scoped>
@import '~@/assets/color.less';

.completeBtn{
  width: 60%;
  height: 0.9rem;
  border: none;
  font-size: 0.32rem;
  color: #fff;
  display: block;
  border-radius: 4px;
  margin: 0.3rem auto 0 auto;
  background-color: #a669c2;
}

</style>
