<template>
    <div class="infoBox">
      <Row style=" border-bottom:1px solid #eee;">
          <Col span="12"><h4>固件名称</h4></Col>
          <Col span="12"><h4>当前版本号</h4></Col>
      </Row>
      <Row  style=" border-bottom:1px solid #eee;">
          <Col span="12"><span>硬件程序</span></Col>
          <Col span="12"><span>{{formValidate.hardware}}</span></Col>
      </Row>
      <Row  style=" border-bottom:1px solid #eee;">
          <Col span="12"><span>客户端主程序</span></Col>
          <Col span="12"><span>{{formValidate.client}}</span></Col>
      </Row>
      <Row  style=" border-bottom:1px solid #eee;">
          <Col span="12"><span>监控助手</span></Col>
          <Col span="12"><span>{{formValidate.assistant}}</span></Col>
      </Row>
      <Row  style=" border-bottom:1px solid #eee;">
          <Col span="12"><span>程序守卫</span></Col>
          <Col span="12"><span>{{formValidate.guard}}</span></Col>
      </Row>
      <Row  style=" border-bottom:1px solid #eee;">
          <Col span="12"><span>广告程序</span></Col>
          <Col span="12"><span>{{formValidate.advertisement}}</span></Col>
      </Row>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      formValidate: {
        hardware: '', // 硬件程序
        client: '', // 客户端主程序
        assistant: '', // 监控助手
        guard: '', // 程序守卫
        advertisement: '', // 广告程序
        id: ''
      }

    };
  },
  mounted () {

  },
  methods: {

  },
  watch: {
    formData (val) {
      if (Object.keys(val).length > 0) {
        this.formValidate.hardware = this.formData.hardware;
        this.formValidate.client = this.formData.client;
        this.formValidate.assistant = this.formData.assistant;
        this.formValidate.guard = this.formData.guard;
        this.formValidate.advertisement = this.formData.advertisement;
        this.formValidate.id = this.formData.id;
      } else {
        this.formValidate = {
          hardware: '', // 硬件程序
          client: '', // 客户端主程序
          assistant: '', // 监控助手
          guard: '', // 程序守卫
          advertisement: '', // 广告程序
          id: ''
        };
      }
    }
  },
  components: {

  },
  computed: {

  }
};
</script>
<style lang="less">
.ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background-color: #fff;
}
</style>
<style lang="less" scoped>
.formBtn{
  text-align:right;
}

.infoBox{
  text-align:center;
  padding-bottom: 20px;
  h4{
    text-align:center;
    font-size:14px;
    font-weight: bold;
  }
  span{
    display: inline-block;
    text-align:center;
    font-size: 14px;
    height: 38px;
    line-height: 38px;
  }
}

</style>
