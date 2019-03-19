<template>
    <StructPage class="realStatusTime">
        <Header
          slot="header"
          title="盒子实时状态"
        />
       <div slot="content">
           <ul class="nineBox" v-if="isBox">
             <li :class="tableData[index].intro" v-for="(items,index) in tableData" :key="index">
                <List :datas="items"></List>
             </li>
           </ul>
           <p v-if="isBox">注：货区边框为紫色虚线框时，表示该货区被斜端遮挡了。</p>
           <WineCupboard :res='tableData' v-if="!isBox"/>
           <Footer/>
       </div>
    </StructPage>
</template>
<script>
import { Toast } from 'vant';
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import List from './List';
import Footer from './Footer';
import WineCupboard from './WineCupboard';
import realTimeStatusSocket from 'websocket/realTimeStatus';
import {getBoxId} from 'model/realTimeStatus';
import { isLogined } from 'model/memberModel';

export default {
  created () {
    isLogined().then(result => {
      let { code } = result;
      if (code === 401) {
        this.$error('当前用户未登录!');
      }
    });
  },
  name: 'RealStatusTime',
  components: {
    StructPage,
    Header,
    List,
    Toast,
    Footer,
    WineCupboard
  },
  data () {
    return {
      isBox: false,
      tableData: []
    };
  },
  mounted () {
    // 获取盒子id的接口
    getBoxId().then(x => {
      if (x.success) {
        let boxId = x.data.box_id;
        let type = x.data.type || 1;
        if (type === 1) {
          this.isBox = true;
        } else {
          this.isBox = false;
        }
        this.loadData(boxId);
      } else {
        Toast(x.msg);
      }
    });
  },
  methods: {
    loadData (boxId) {
      realTimeStatusSocket({
        box_id: boxId
      }, {
        onMessage: ({success, data, message}) => {
          if (success) {
            let result = data;
            // 接口返回九宫格数据为null时显示加载中
            if (result.cells === null) {
              Toast.loading({
                mask: false,
                message: '加载中...',
                duration: 0
              });
            } else {
              Toast.clear();
              this.tableData = result.cells;
            }
          } else {
            Toast(message);
          }
        },
        onClose (data) {
          console.log('关闭');
        }
      });
    }
  },
  destroyed () {
    Toast.clear();
  }
};
</script>
<style lang="less" scoped>
@import '~@/assets/color.less';
.commonFlexs{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.realStatusTime{
  font-size: .24rem;
  color: #333;
  .nineBox{
    width: 92%;
    padding: 0 4%;
    margin: .4rem auto 0.3rem;
    &:extend(.commonFlexs);
    align-items: flex-end;
    height: 100%;
    li{
      background: #fff;
      box-sizing: border-box;
      width: 32%;
      padding: .09rem .12rem;
      border: 1px solid transparent;
      margin-bottom: .1rem;
      border-radius: .08rem;
    }
    li.active{
      border: 1px dotted @primaryColor;
    }
    img{
      width: .28rem;
      height: .28rem;
      vertical-align: top;
    }
  }
  p{
    color: #666;
    margin-left: .3rem;
  }
}
</style>
