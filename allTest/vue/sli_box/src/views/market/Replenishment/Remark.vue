<template>
   <div class="remark">
     <ul>
       <li v-for="(item,index) in remarkData" :key="index">
         <p>异常：{{item.exception}}</p>
         <p>备注：{{item.remark}}</p>
         <p>附图：<br>
          <img @click="showBigImg(index)" :src="item.fileUrl" alt="">
         </p>
       </li>
     </ul>
   </div>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'Remark',
  methods: {
    showBigImg (dex) {
      this.setBigImg(this.remarkData[dex].fileUrl);
      this.setBigImgModal(true);
    }
  }
};
</script>

<style scoped lang='less'>
.remark{
    clear: both;
    overflow: hidden;
  li{
    list-style: none;
    float: left;
    color: #333;
    border: 1px solid #eee;
    margin: 3px;
    padding: 10px;
  }
  li img{
    width: 100px;
    height: 60px;
  }
}
</style>
