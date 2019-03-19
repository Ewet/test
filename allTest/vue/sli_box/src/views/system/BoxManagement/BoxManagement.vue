<template>
 <div class="coupon-list">
   <ModuleHeader title="盒子管理">
       <ZBtn slot="right" @click="addItem">添加盒子</ZBtn>
    </ModuleHeader>
   <Toolbar></Toolbar>
    <List slot="content" style="height:100%;overflow:auto"/>
    <!-- <div style="float: right;margin-top:10px">
          <Page :current="page" :total="total" :show-total="true" @on-change="num => pageChange(num)" ></Page>
    </div> -->
    <Modal
        :value="showModal"
        :title="itemId? '盒子编辑' : '盒子新增'"
        :footerHide= "true"
        @on-cancel="setModal(false)"
        :width="800"
        >
        <BoxEdit/>
      </Modal>
      <!-- 结构管理 -->
       <Modal
        :value="showModalStructureManagement"
        :title="`盒子货架列表(盒子编号：${boxNub})`"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setModalStructureManagement(false)"
        width="50%"
        >
        <Tabs value="name1" >
            <TabPane label="硬件设置" name="name1"><MasterControl/></TabPane>
            <TabPane label="货区列表" name="name3"><CargoAreaSetting/></TabPane>
        </Tabs>
    </Modal>
    <!-- 采集板 -->
    <Modal
    :value="showModalCollectionEditionList"
        :title="'采集板列表'"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setModalCollectionEditionList(false)"
        width="70%"
        >
        <ListCollectionEdition/>
    </Modal>
    <!-- 货区货位编辑 -->
    <Modal
        :value="showCargoAreaEditModal"
        title="货区编辑"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="offCargoAreaEditModal()"
        width=70%
        >
        <CargoAreaEdit/>
      </Modal>
    <!-- 扩展板 -->
    <Modal
      :value="showExpansionBoardModal"
      title="扩展板列表"
      :footerHide= "true"
      @on-cancel="setExpansionBoardModal(false)"
      :width="800"
      >
      <ExpansionBoard/>
    </Modal>
    <Modal
      :value="showAddExpansionBoardModal"
      title="添加扩展板"
      :footerHide= "true"
      @on-cancel="offAddExpansionBoardModal"
      :width="500"
      >
      <AddexpansionBoard/>
    </Modal>
    <Modal
      :value="showViewChannelModal"
      title="通道详情"
      :footerHide= "true"
      @on-cancel="setViewChannelModal(false)"
      :width="700"
      >
      <ViewChannel/>
    </Modal>
 </div>
</template>
<script>
import List from './List';
import vuexMixins from 'mixins/module-map';
import BoxEdit from './Edit';
import Toolbar from './Toolbar';
import ListCollectionEdition from '../CollectionEdition/List';
import MasterControl from '../MasterControl/List';
import CargoAreaEdit from './CargoArea/CargoAreaEdit';
import CargoAreaSetting from './CargoArea/CargoAreaSetting';
import ExpansionBoard from './ExpansionBoard';
import AddexpansionBoard from './AddexpansionBoard';
import ViewChannel from './ViewChannel';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'BoxManagementIndex',
  data () {
    return {
    };
  },
  methods: {
    offAddExpansionBoardModal () {
      this.$g_emit('cancelExpansionBoardForm');
      this.setAddExpansionBoardModal(false);
    },
    offCargoAreaEditModal () { // 关闭货区编辑
      this.setCargoAreaEditModal(false);
      this.setLayerId('');
    }
  },
  components: {
    ListCollectionEdition,
    MasterControl,
    List,
    BoxEdit,
    Toolbar,
    CargoAreaEdit,
    CargoAreaSetting,
    ExpansionBoard,
    AddexpansionBoard,
    ViewChannel
  },
  watch: {
  }
};
</script>
