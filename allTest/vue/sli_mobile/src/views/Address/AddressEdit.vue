<template>
<div class="addressedit">
<nav-bar
  :title="title"
  left-arrow
  @click-left="back"
/>
<cell-group>
 <field
    type="text"
    v-model="consignee"
    label="收货人"
  />
    </cell-group>
<cell-group>
 <field
    type="number"
    v-model="phone"
    label="联系电话"
  />
  </cell-group>
<cell-group>
  <cell class="area" is-link :value="areaText" @click="areaClick">
    <icon slot="title" >所在区域</icon>
  </cell>
</cell-group>
  <cell-group>
   <field
    type="textarea"
    v-model="detailedAddress"
    placeholder="请输入详细地址......"
    />
  </cell-group>
  <cell-group>
   <cell>
    <template slot="title">
      <checkbox v-model="checked">设为默认</checkbox>
    </template>
  </cell>
  </cell-group>
  <Button bottom-action @click="save">保存</Button>
  <popup v-model="show" position="bottom">
      <area :area-list="areaList"
      @confirm="selectArea"
      @cancel="show=!show"/>
      </popup>
</div>
</template>
<script>
import { NavBar, Cell, CellGroup, Area, Button } from 'vant';
export default {
  data () {
    return {
      show: false,
      checked: false,
      consignee: '占士邦',
      area: '',
      phone: '',
      detailedAddress: '市医保局越秀分局 越秀区梅东路 28 号 4-5 楼 87690837 市医保局海珠分局 海珠区昌岗中路 74',
      areaList: {
        province_list: {
          110000: '北京市',
          120000: '天津市'
        },
        city_list: {
          110100: '北京市',
          110200: '县',
          120100: '天津市',
          120200: '县'
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          110105: '朝阳区',
          110106: '丰台区',
          120101: '和平区',
          120102: '河东区',
          120103: '河西区',
          120104: '南开区',
          120105: '河北区'
        }
      },
      areaText: '请选择',
      title: '',
      id: this.$route.query.id || ''
    };
  },
  mounted () {
    if (this.id) {
      this.title = '修改地址';
    } else {
      this.title = '新增地址';
    }
  },
  methods: {
    areaClick () {
      this.show = true;
    },
    back () {
      this.$router.go(-1);
    },
    selectArea (arry) {
      console.log(arry);
      this.show = !this.show;
      let p = arry[0].name;
      let c = arry[1].name;
      let t = arry[2].name;
      this.areaText = `${p} ${c} ${t}`;
    },
    save () {
      if (this.id) {
        this.$vlf.setItem('ADDRESS_EDIT_SUCCESS', true).then(result => {
          this.$replace({
            name: 'AddressList'
          });
        });
      } else {
        this.$vlf.setItem('ADDRESS_ADD_SUCCESS', true).then(result => {
          this.$replace({
            name: 'AddressList'
          });
        });
      }
    //   this.$vlf.getItem('username').then(result => {
    //     console.log(result);
    //   });
    //   this.$vlf.createInstance({
    //     storeName: 'user'
    //   }).then((store) => {
    //     store.setItem('key', [1, 2, 3]);
    //     store.getItem('key').then((keys) => {
    //       console.log(keys);
    //     });
    //     store.iterate((value, key, num) => {
    //       return [key, value];
    //     }).then((result) => {
    //       console.log(result);
    //     });
    //   });
    //   this.$go({
    //     name: 'AddressList'
    //   });
    }
  },
  components: { NavBar, Cell, CellGroup, Area, Button }
};
</script>
<style  lang="less" scoped>
@import '~@/assets/color.less';
.addressedit {
  .van-nav-bar {
    color: #ffffff;
    background-color: @primaryColor;
    .van-icon {
      color: #ffffff !important;
    }
  }
  .area{
    font-size:0.26rem;
    color:#999999;
    .van-icon{
      color:#000000;
      font-size: 0.28rem;
    }

  }
  .van-button--bottom-action {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: @primaryColor;
  }
  .van-button--default {
    background-color: @primaryColor;
    border: none;
    // color:#fff;
  }
   .van-checkbox--checked {
        border-color: @primaryColor;
        background-color: @primaryColor;
    }
    .van-area {
        font-size: 0.16rem;
    }
}
</style>
