<template>
    <Form ref="formCustomer" :model="formValidate" :rules="ruleValidate" :label-width="120">
      <Divider orientation="left">商品视频放置目录</Divider>
      <Row>
        <FormItem label="目录路径" prop="menuUrl" >
            <Input v-model="formValidate.menuUrl" placeholder=""></Input>
        </FormItem>
      </Row>
      <Divider orientation="left">媒体音量设置</Divider>
      <Row>
        <Col span="8">
          <FormItem label="商品视频" prop="productVideo" >
            <InputNumber style="width:100%;" :max="100" :min="1" :precision="0" v-model="formValidate.productVideo" clearable></InputNumber>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="广告视频" prop="advertisingVideo" >
            <InputNumber style="width:100%;" :max="100" :min="1" :precision="0" v-model="formValidate.advertisingVideo" clearable></InputNumber>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="盒子背景" prop="boxBg" >
            <InputNumber style="width:100%;" :max="100" :min="1" :precision="0" v-model="formValidate.boxBg" clearable></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="盒内语音" prop="inBoxVoice" >
            <InputNumber style="width:100%;" :max="100" :min="1" :precision="0" v-model="formValidate.inBoxVoice" clearable></InputNumber>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="盒外语音" prop="outBoxVoice" >
            <InputNumber style="width:100%;" :max="100" :min="1" :precision="0" v-model="formValidate.outBoxVoice" clearable></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <FormItem>
            <ZBtn @click="save('formValidate')">提交</ZBtn>
        </FormItem>
      </Form>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { getMediasettingsInfo, reportMediasettings } from './model';//

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'Mediasettings',
  data () {
    return {
      formValidate: {
        menuUrl: '',
        productVideo: null,
        advertisingVideo: null,
        boxBg: null,
        inBoxVoice: null,
        outBoxVoice: null
      },
      ruleValidate: {}
    };
  },
  mounted () {
    // this.loadData();
  },
  methods: {
    async loadData () {
      this.spinShow = true;
      const { success, data, msg } = await getMediasettingsInfo(this.boxId);
      if (success) {
        this.formValidate.menuUrl = data.menuUrl;
        this.formValidate.productVideo = data.productVideo;
        this.formValidate.advertisingVideo = data.advertisingVideo;
        this.formValidate.boxBg = data.boxBg;
        this.formValidate.inBoxVoice = data.inBoxVoice;
        this.formValidate.outBoxVoice = data.outBoxVoice;
      } else if (msg) {
        this.$error(msg);
      }
      this.spinShow = false;
    },
    clearData () { // 此方法用于清空页面数据
      this.formValidate.menuUrl = '';
      this.formValidate.productVideo = null;
      this.formValidate.advertisingVideo = null;
      this.formValidate.boxBg = null;
      this.formValidate.inBoxVoice = null;
      this.formValidate.outBoxVoice = null;
    },
    async save () {
      const { success, msg } = await reportMediasettings({
        media_path: this.formValidate.menuUrl,
        intro_volume: this.formValidate.productVideo,
        advertising_volume: this.formValidate.advertisingVideo,
        bgm_volume: this.formValidate.boxBg,
        inner_voice_volume: this.formValidate.inBoxVoice,
        outer_voice_volume: this.formValidate.outBoxVoice,
        box_id: this.boxId
      });
      if (success) {
        this.$success('保存成功!');
        this.setTerminalModal(false);
        this.setBoxNo('');
        this.setBoxId('');
      } else {
        this.$error(msg);
      }
    }
  },
  watch: {
    showTerminalModal (val) {
      if (val) {
        this.loadData();
      }
    }
  },
  components: {
  }
};
</script>
<style lang="less">
.ivu-input-number-handler-wrap{
      display: none;
    }
</style>
