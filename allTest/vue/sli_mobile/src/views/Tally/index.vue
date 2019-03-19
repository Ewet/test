<template>
    <StructPage>
        <Header
            title="我要理货"
            slot="header"
        ></Header>
        <div slot="content" class="mainBox">
          <checkbox-group v-model="result">
              <div
                  v-for="(item,index) in dataList"
                  :key="index"
                  @click="toggle(index)"
                >
                <CargoAreaItem
                    :url="item.imageUrl"
                    :name="item.name"
                    :price="item.price"
                    :cloud="item.cloud"
                    :canPut="item.canPut"
                    :current="item.current"
                >
                  <checkbox slot="position" :name="item.id" ref="checkboxes">货区：{{item.position}}</checkbox>
                </CargoAreaItem>
              </div>
          </checkbox-group>
            <button class="completeBtn" @click="completeBtn">理货完毕</button>
        </div>
    </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import {getList, arrangeSubmit} from 'model/tally';
import CargoAreaItem from 'components/CargoAreaItem';
import adminrealtimedataCart from '../../websocket/adminrealtimedataCart';
import { NavBar, Popup, Picker, Checkbox, CheckboxGroup, Toast } from 'vant';
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
      dataList: [],
      show: false,
      columns: ['操作成功', '未到计划时间'],
      result: []
    };
  },
  mounted () {
    this.getListData(() => {
      this.getCartData();
    });
  },
  destroyed () {
    this.websocket.close();
  },
  methods: {
    toggle (index) {
      this.$refs.checkboxes[index].toggle();
    },
    // 获取购物车数据
    getCartData () {
      let boxId = this.$route.query.boxId;
      this.websocket = adminrealtimedataCart({
        'box_id': boxId
      }, {
        onMessage: (result) => {
          console.log('货区数据', this.dataList);
          console.log('购物车数据', result);
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
    // 理货完毕
    async completeBtn () {
      let len = this.dataList.length;
      let resulttLen = this.result.length;
      if (len !== resulttLen) {
        Toast('有货区未完成理货');
      } else {
        let res = await arrangeSubmit();
        console.log('理货完毕', res);
        if (res.success) {
          this.$router.replace({
            name: 'MenuPage'
          });
        } else {
          if (res.code === 307) {
            let replenishmentId = res.errorObj.replenishment_id;
            this.$go({name: 'ExceptionHandling', query: {replenishmentId: replenishmentId}});
          } else {
            Toast(res.msg);
          }
        }
      }
    },
    // 理货列表
    async getListData (cb) {
      let boxId = this.$route.query.boxId;
      let {success, data, msg} = await getList({
        'box_id': boxId
      });
      console.log('理货列表', data);
      if (success) {
        this.dataList = data;
        if (cb) {
          cb();
        }
      } else {
        Toast(msg);
        return msg;
      }
    }
  },
  components: {
    StructPage,
    NavBar,
    Header,
    CargoAreaItem,
    Popup,
    Picker,
    CheckboxGroup,
    Checkbox,
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
