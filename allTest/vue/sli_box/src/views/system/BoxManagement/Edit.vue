<template>
    <Form ref="formCustomer" :model="formCustomer" :rules="ruleValidate" :label-width="120">
       <Row>
        <Col span="12">
          <FormItem label="所属商户" prop="merchantName">
            <span @click="merchantNameClick($event)">
              <Input :maxlength="50" type="text" v-model="formCustomer.merchantName" clearable readonly placeholder="请选择商户"></Input>
            </span>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="盒子编号" prop="boxNo">
            <Input :maxlength="50" v-model="formCustomer.boxNo" placeholder="请输入盒子编号"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="所在地区" prop="areaName">
            <span @click="areaNameClick($event)">
              <Input :maxlength="50" type="text" v-model="formCustomer.areaName" clearable readonly placeholder="请选择地区"></Input>
            </span></FormItem>
        </Col>
        <Col span="12">
        <!-- <FormItem label="盒子型号" prop="boxType">
            <span @click="boxTypeClick($event)">
              <Input :maxlength="50" type="text" v-model="formCustomer.boxType" clearable readonly placeholder="请选择盒子型号"></Input>
            </span>
        </FormItem> -->
        <FormItem label="盒子型号" prop="boxType">
            <Select v-model="formCustomer.boxType" placeholder="盒子型号">
                <Option
                v-for="item in boxTypeOptions"
                :key="item.value"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="经度" prop="lng">
            <Input
            :maxlength="50"
            v-model="formCustomer.lng"
            placeholder="请输入经度"
            clearable
            ></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="纬度" prop="lat">
            <Input
            :maxlength="50"
            v-model="formCustomer.lat"
            placeholder="请输入纬度"
            clearable></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="盒子地址" prop="address">
            <Input :maxlength="50" v-model="formCustomer.address" placeholder="请输入盒子地址"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="验收日期" prop="acceptanceDate">
            <DatePicker type="datetime" placeholder="请选择时间" style="width: 100%" v-model="formCustomer.acceptanceDate"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <FormItem>
        <div id="container" class="qq-map">
        </div>
      </FormItem>
        <FormItem>
            <AddBtn @click="add('formCustomer')" v-show="!id"/>
            <SaveBtn @click="save('formCustomer')" v-show="id"/>
        </FormItem>
         <Modal
          title="选择商户"
          v-model="showMerchantModal"
          :footer-hide = "true"
          style="z-index:1001;"
          >
          <MerchantSelect @itemSelect="merchantNameSelect"/>
        </Modal>
         <!-- <Modal
          title="选择盒子型号"
          v-model="showBoxTypeModal"
          :footer-hide = "true"
          style="z-index:1001;"
          >
          <BoxType @itemSelect="boxTypeSelect"/>
        </Modal> -->
        <Modal
          v-model="showAreaModal"
          width="62.5%"
          :footerHide="true">
          <AreaSelect @itemSelect="areaSelect"/>
        </Modal>
      </Form>
</template>
<script>
import { updateItem, addItem } from './model';
import vuexMixins from 'mixins/module-map';
// import BoxType from 'views/system/BoxType/List';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'BoxManagementEdit',
  data () {
    return {
      formCustomer: {
        merchantName: '',
        merchantId: '',
        boxNo: '',
        address: '',
        lat: '',
        lng: '',
        acceptanceDate: null,
        areaId: '',
        areaName: '',
        boxType: ''
      },
      ruleValidate: {
        merchantName: [
          { required: true, message: '所属商户不能为空', trigger: 'change' }
        ],
        boxNo: [
          {
            required: true, message: '盒子编号不能为空', trigger: 'blur', transform: value => value.toString().trim()
          }
        ],
        areaName: [
          { required: true, message: '所在地区不能为空', trigger: 'change' }
        ],
        boxType: [
          { required: true, message: '盒子类型不能为空', trigger: 'change' }
        ]
      },
      boxTypeOptions: [
        {
          value: '1',
          name: '摩萄盒子'
        },
        {
          value: '2',
          name: '摩萄酒柜'
        }
      ],
      id: '',
      showMerchantModal: false,
      showAreaModal: false,
      showBoxTypeModal: false
    };
  },
  mounted () {
    this.loadMap();
  },
  methods: {
    validateBoxType (rule, value, callback) {
      if (!value) {
        callback(new Error('盒子类型不能为空'));
      } else {
        callback();
      }
    },
    merchantNameClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.showMerchantModal = true;
    },
    merchantNameSelect (row) {
      this.formCustomer.merchantName = row.merchantName;
      this.formCustomer.merchantId = row.id;
      this.showMerchantModal = false;
      // this.$refs['formCustomer'].validateField('merchantName');
    },
    // boxTypeClick (event) {
    //   if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
    //     return false;
    //   } else {
    //     this.showBoxTypeModal = true;
    //   }
    // },
    // boxTypeSelect (row) {
    //   this.formCustomer.boxType = row.boxType; // gai
    //   this.formCustomer.boxType = row.boxType;//
    //   this.showBoxTypeModal = false;
    //   // this.$refs['formCustomer'].validateField('areaName');
    // },
    areaNameClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.showAreaModal = true;
    },
    areaSelect (row) {
      this.formCustomer.areaName = row.districtName;
      this.formCustomer.areaId = row.districtId;
      this.showAreaModal = false;
      // this.$refs['formCustomer'].validateField('areaName');
    },
    getFormData () {
      return {
        box_no: this.formCustomer.boxNo,
        merchant_id: this.formCustomer.merchantId,
        district_id: this.formCustomer.areaId,
        type: this.formCustomer.boxType,
        address: this.formCustomer.address,
        lng: this.formCustomer.lng,
        lat: this.formCustomer.lat,
        installed_time: this.formCustomer.acceptanceDate ? this.$formatTime(this.formCustomer.acceptanceDate, 'ymd-hms') : ''
      };
    },
    add (name) {
      this.$refs.formCustomer.validate(async (valid) => {
        if (valid) {
          const { success, msg } = await addItem(this.getFormData());
          if (success) {
            this.$success('新增成功！');
            this.setModal(false);
            this.reload();
          } else {
            this.$error(msg);
          }
        }
      });
    },
    save (name) {
      this.$refs.formCustomer.validate(async (valid) => {
        if (valid) {
          const { success, msg } = await updateItem({
            ...this.getFormData(),
            box_id: this.id
          });
          if (success) {
            this.$success('保存成功!');
            this.setModal(false);
            this.reload();
          } else {
            this.$error(msg);
          }
        }
      });
    },
    handleReset (name) {
      this.$refs.formCustomer.resetFields();
    },
    loadMap () {
      const center = new qq.maps.LatLng(22.36626897495023, 113.45139026641846);
      const map = new qq.maps.Map(document.getElementById('container'), {
        center,
        zoom: 13
      });
      const marker = new qq.maps.Marker({
        position: center,
        map
      });
      console.log(marker);
      qq.maps.event.addListener(
        map,
        'click',
        (event) => {
          const lat = event.latLng.getLat();
          const lng = event.latLng.getLng();
          this.formCustomer.lat = lat;
          this.formCustomer.lng = lng;
          const latlng = new qq.maps.LatLng(lat, lng);
          marker.setPosition(latlng);
          map.setCenter(latlng);
        }
      );
    }
  },
  watch: {
    formData (val) {
      this.$refs.formCustomer.resetFields();
      if (Object.keys(val).length > 0) {
        this.formCustomer = {
          merchantName: val.merchantName,
          merchantId: val.merchantId,
          boxNo: val.boxNo,
          address: val.address,
          boxType: val.boxType,
          lat: val.lat,
          lng: val.lng,
          acceptanceDate: val.acceptanceDate !== null ? new Date(val.acceptanceDate * 1000) : null,
          areaId: val.areaId,
          areaName: val.areaName
        };
        console.log(this.formCustomer);
        this.id = val.id || '';
      } else {
        this.formCustomer = {
          merchantName: '',
          merchantId: '',
          boxNo: '',
          address: '',
          boxType: '',
          lat: '',
          lng: '',
          acceptanceDate: null,
          areaId: '',
          areaName: ''
        };
        this.id = '';
      }
    },
    showMerchantModal (val) {
      if (!val) {
        this.$Bus.$emit('refreshMerchantList');
      }
    }
  },
  components: {
  }
};
</script>
<style lang="less" scoped>
.qq-map{
  height:400px;
}
</style>
