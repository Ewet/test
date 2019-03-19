<!--盒子升级-盒子列表-->
<template>
 <div class="coupon-list">
   <ModuleHeader title="盒子升级">
     <ZBtn slot="right" @click="batchUpgrade()">批量升级</ZBtn>
    </ModuleHeader>
    <Toolbar />
    <List slot="content" style="height:100%;overflow:auto"/>
    <!-- <div style="float: right;margin-top:10px">
          <Page :current="page" :total="total" :show-total="true" @on-change="num => paging(num)" ></Page>
    </div> -->

    <Modal
        :value="showModal"
        :title="`固件信息 ( 盒子编号: ${boxNo} )`"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setModal(false)"
        width="400"
        >
        <Edit/>
    </Modal>

    <Modal
        :value="showModalUpgrade"
        :title="upgrade==='search'? '搜索结果升级' : '批量升级'"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setModalUpgrade(false)"
        width="500"
        >
        <Upgrade/>
    </Modal>

 </div>
</template>
<script>
import List from './List';
import vuexMixins from 'mixins/module-map';
import Toolbar from './Toolbar';
import Edit from './Edit';
import Upgrade from './Upgrade';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      show2: true
    };
  },
  methods: {
    paging (num) {
      this.pageChange(num);
      this.setBoxIdArr([]);
    },
    // 批量升级
    batchUpgrade () {
      const len = this.boxIdArr.length;
      if (len > 0) {
        this.viewUpgrade('batch');
      } else {
        this.$error('请选择盒子！');
      }
    }
  },
  components: {
    List,
    Toolbar,
    Edit,
    Upgrade
  }

};
</script>
<style scoped lang="less">
.coupon-list {
  header {
    position: relative;
    padding-bottom:10px;
    border-bottom: 1px solid #dddee1;
    margin-bottom: 20px;
    h2 {
      line-height: 32px;
    }
    button {
      position: absolute;
      right: 0;
      top:0;
    }
  }
}
.remark {
    padding: 5px 10px;
    background: skyblue;
    color: #fff;
    margin: 10px auto;
}
</style>
