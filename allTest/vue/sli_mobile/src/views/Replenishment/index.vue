<template>
    <StructPage>
        <Header
            title="我要补货"
            slot="header"
        ></Header>
        <div slot="content" class="mainBox">
            <CargoAreaItem
                v-for="(item,index) in dataList"
                :key="index"
                :url="item.imageUrl"
                :position="item.position"
                :name="item.name?item.name:'暂无在售商品'"
                :price="item.price?item.price:null"
                :cloud="item.cloud"
                :canPut="item.canPut"
                :current="item.current"
                :state="turningState(item.planType)"
            >
             <h3 slot="position">货区:{{item.position}}</h3>
             <p v-show="item.planType===1||item.planType===2||item.planType===3" slot="operation" @click="showModel(item.id)">
               <span v-show="!item.operation" style="color:#969799;">请选择</span>
               <span v-show="item.operation">{{item.operation}}</span>
               <i style="font-size: 0.32rem;" class="van-icon van-icon-arrow van-cell__right-icon"></i>
              </p>
            </CargoAreaItem>
            <button class="completeBtn" @click="submit">补货完毕</button>
            <popup  v-model="show" position="bottom" :overlay="true">
               <picker :columns="columns" @confirm="confirm" @cancel="cancel" :show-toolbar="true"/>
            </popup >
        </div>
    </StructPage>
</template>

<script>

import StructPage from 'components/StructPage';
import Header from 'components/Header';
import CargoAreaItem from 'components/CargoAreaItem';
import { NavBar, Popup, Picker, Toast } from 'vant';
// import {getCart} from 'model/webSocketServer';
import adminrealtimedataCart from '../../websocket/adminrealtimedataCart';
import {getList, replenishmentSubmit} from 'model/replenishment';
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
  data () {
    return {
      websocket: null,
      layerId: '', // 货区ID
      operationArr: [],
      dataList: [
      ],
      show: false,
      columns: ['操作成功', '未到计划时间']
    };
  },
  mounted () {
    this.getListData(() => {
      this.getCartData();
    });
  },
  methods: {

    // 转状态  item.planType===1?'上新':item.planType===2?'调价':item.planType===3?'下架':item.planType===0?'补货':''
    turningState (num) {
      if (num === 1) {
        return '上新';
      } else if (num === 2) {
        return '调价';
      } else if (num === 3) {
        return '下架';
      } else if (num === 0) {
        return '补货';
      } else {
        return '';
      }
    },
    destroyed () {
      this.websocket.close();
    },
    // 获取购物车数据
    async getCartData () {
      let boxId = this.$route.query.boxId;
      this.websocket = adminrealtimedataCart({
        'box_id': boxId
      }, {
        onMessage: (result) => {
          this.setCartData(result);
        }
      });
    },
    setCartData ({success, data, message}) {
      if (success) {
        let dataList = this.dataList;
        dataList.forEach(item => {
          let layerNo = item.position;
          if (data[layerNo]) {
            item.current = item.cloud - data[layerNo];
          } else {
            item.current = item.cloud;
          }
        });
        this.dataList = dataList;
      }
    },
    // 补货列表
    async getListData (cb) {
      let boxId = this.$route.query.boxId;
      if (boxId) {
        let {success, data, msg} = await getList({
          'box_id': boxId
        });
        if (success) {
          this.dataList = data;
          if (cb) {
            cb();
          }
        } else {
          return msg;
        }
      }
    },
    async submit () {
      let len = this.calculationOperationLen();
      if (this.operationArr.length !== len) {
        Toast('有货区补货计划未完成');
      } else {
        let res = await replenishmentSubmit(this.operationArr);
        if (res.success) {
          // this.$go({name: 'MenuPage'});
          this.$router.replace({
            name: 'MenuPage'
          });
        } else {
          Toast(res.msg);
        }
      }
    },
    // 计算（上新/调价/下架）个数
    calculationOperationLen (id) {
      let len = 0;
      this.dataList.forEach(item => {
        if (item['planType'] === 1 || item['planType'] === 2 || item['planType'] === 3) {
          len += 1;
        }
      });
      return len;
    },
    // 确定
    confirm (value, index) {
      let arr = this.operationArr.filter(item => {
        if (item['layer_id'] === this.layerId) {
          item['operation'] = index;
          this.setOperation(this.layerId, value);
          return item;
        }
      });
      if (arr.length === 0) {
        let json = {
          'layer_id': this.layerId, // 货区ID
          'operation': index // 0操作成功,1未到计划时间
        };
        this.operationArr.push(json);
        this.setOperation(this.layerId, value);
      }
      this.layerId = '';
      this.show = false;
    },
    // 取消
    cancel () {
      this.show = false;
    },
    setOperation (id, operation) {
      this.dataList.forEach(item => {
        if (item.id === id) {
          item.operation = operation;
        }
      });
    },
    showModel (id) {
      this.layerId = id;
      this.show = true;
    }
  },
  components: {
    StructPage,
    NavBar,
    Header,
    CargoAreaItem,
    Popup,
    Picker,
    Toast
  }
};
</script>
<style lang="less" scoped>
@import '~@/assets/color.less';

.mainBox{
  padding-bottom: 1rem;
}
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
