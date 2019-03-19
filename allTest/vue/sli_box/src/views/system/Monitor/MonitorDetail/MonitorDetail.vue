<template>
    <div style="background-color:#f2f2f2;padding:10px;height:100%;box-sizing:border-box;overflow:auto;">
      <div class="left-contnet">
        <div class="placeholder">
          占位
        </div>
        <div class="affix">
          <CaptureInterface/>
        </div>
      </div>
      <div style="padding-left:51%">
          <div class="mb20"><MarkRead/></div>
          <div class="mb20"><InventoryChange/></div>
          <div class="mb20"><AssociatedOrder/></div>
          <div class="mb20"><CustomerServiceNote/></div>
          <ChangeContrast/>
      </div>
    </Row>
    </div>
</template>
<script>
import CaptureInterface from './CaptureInterface';
import ChangeContrast from './ChangeContrast';
import AssociatedOrder from './AssociatedOrder';
import MarkRead from './MarkRead';
import InventoryChange from './InventoryChange';
import CustomerServiceNote from './CustomerServiceNote';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {
    CaptureInterface,
    ChangeContrast,
    AssociatedOrder,
    MarkRead,
    InventoryChange,
    CustomerServiceNote
  },
  watch: {
    formData (val) {
      Object.keys(val).length && this.reload();
    }
  }
};
</script>
<style lang="less" scoped>
.mb20{
  margin-bottom: 20px;
}
.left-contnet{
  .placeholder{
    width:50%;
    visibility: hidden;
  }
  .affix{
    width:45.5%;
    position: fixed;
    left: 50px;
    top: 95px;
  }
}

</style>
