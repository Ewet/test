<template>
    <Form ref="formCustomer" :model="formCustomer" :rules="ruleValidate" :label-width="120">
        <FormItem label="投放计划名称" prop="deliveryPlanName">
            <Input :maxlength="50" v-model="formCustomer.deliveryPlanName" placeholder="请输入投放计划名"></Input>
        </FormItem>
        <FormItem label='盒子选择' prop="checkedBoxList">
             <Button @click="boxNoClick($event)" type="primary">选择盒子</Button>
             <BoxList
                :boxList="formCustomer.checkedBoxList"
                style="margin-top:10px;"
                v-if="formCustomer.checkedBoxList.length"
                @remove="removeBoxItem"
                />
        </FormItem>
        <FormItem label='投放日期' prop="deliveryDate">
          <DatePicker
          format="yyyy-MM-dd"
          v-model="formCustomer.deliveryDate"
          type="daterange"
          placeholder="投放日期"
          @on-clear="getFormData"></DatePicker>
        </FormItem>
        <FormItem label='投放时段' prop="deliveryTime">
          <TimePicker
          v-model="formCustomer.deliveryTime"
          type="timerange"
          :steps="[1, 1, 60]"
          placeholder="投放时段"
          @on-clear="getFormData"></TimePicker>
        </FormItem>
        <!-- <FormItem label="播放次数" prop="playTimes" >
          <InputNumber :max="999999999" :min="1" :precision="0" v-model="formCustomer.playTimes" clearable ></InputNumber>
        </FormItem> -->
      <FormItem label='备注' prop='remark'>
                <Input v-model="formCustomer.remark" :maxlength="100" type="textarea" :autosize="{minRows: 4, maxRows: 6}" placeholder="备注不超过100字"></Input>
      </FormItem>
        <FormItem>
            <AddBtn @click="add('formCustomer')" v-show="!id"/>
            <SaveBtn @click="save('formCustomer')" v-show="id"/>
        </FormItem>
      </Form>
</template>
<script>
import { updateItem, addItem } from './model';
import vuexMixins from 'mixins/module-map';
import BoxList from './BoxList';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'DeliverySettingsEdit',
  props: {
    isShowEdit: {
      type: [Boolean],
      default: false
    }
  },
  data () {
    // 自定义表单验证
    const deliveryTimePass = (rule, value, callback) => {
      if (!(value.length && value.every(x => !!x) > 0)) {
        callback(new Error('投放时间不能为空'));
      }
      callback();
    };
    const deliveryDatePass = (rule, value, callback) => {
      if (!(value.length && value.every(x => !!x) > 0)) {
        callback(new Error('投放日期不能为空'));
      }
      callback();
    };
    const boxListPass = (rule, value, callback) => {
      const val = this.formCustomer.checkedBoxList;
      if (!(val.length && val.every(x => !!x) > 0)) {
        callback(new Error('请选择要投放的盒子'));
      }
      callback();
    };
    return {
      formCustomer: {
        deliveryPlanId: '',
        deliveryPlanName: '',
        checkedBoxList: [],
        boxNo: '',
        deliveryDate: '',
        deliveryTime: '',
        // playTimes: null,
        remark: ''
      },
      ruleValidate: {
        deliveryPlanName: [
          {
            required: true, message: '投放计划名称不能为空', trigger: 'blur', transform: value => value.toString().trim()
          }
        ],
        checkedBoxList: [
          { required: true, validator: boxListPass }
        ],
        deliveryDate: [
          { required: true, validator: deliveryDatePass, trigger: 'change' }
        ],
        deliveryTime: [
          { required: true, validator: deliveryTimePass, trigger: 'change' }
        ]
      },
      id: ''
    };
  },
  mounted () {
  },
  methods: {
    // 点击选择盒子
    boxNoClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      // 通信首页弹出盒子选择并把已选中盒子列表传过去
      this.$emit('emitShowBox', {
        isShow: true,
        checkedList1: this.formCustomer.checkedBoxList
      });
    },
    // 接收盒子选择页面（BoxSelect.vue）传回来的以选中盒子列表、赋值展示
    boxNoSelect (list) {
      this.formCustomer.checkedBoxList = list;
    },
    // 删除已选盒子中的某一项
    removeBoxItem (index) {
      this.formCustomer.checkedBoxList.splice(index, 1);
    },

    getFormData () {
      const date = this.$formatTime(this.formCustomer.deliveryDate, 'ymd');
      const boxIds = this.formCustomer.checkedBoxList.map(x => x.boxId).join();
      return {
        advert_id: this.advertisingId,
        advert_plan_name: this.formCustomer.deliveryPlanName,
        box_ids: boxIds,
        start_day: date[0],
        end_day: date[1],
        start_time: this.formCustomer.deliveryTime[0],
        end_time: this.formCustomer.deliveryTime[1],
        // 'advert_plan_count': this.formCustomer.playTimes,
        notes: this.formCustomer.remark
      };
    },
    add (name) {
      this.$refs.formCustomer.validate(async (valid) => {
        if (valid) {
          // this.handleReset();
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
          // this.handleReset();
          const { success, msg } = await updateItem({
            ...this.getFormData(),
            advert_plan_id: this.id
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
    }
  },
  watch: {
    // 触发盒子编号验证
    'formCustomer.checkedBoxList.length': function (val) {
      this.$refs.formCustomer.validateField('checkedBoxList');
    },
    // 通过监听showModal来控制首页弹出、关闭此页面
    showModal (val) {
      if (val) {
        if (this.itemId) {
          this.$emit('emitShow', { isShow: true, isEdit: true });
        } else {
          this.$emit('emitShow', { isShow: true, isEdit: false });
        }
      } else {
        this.$emit('emitShow', { isShow: false });
      }
    },
    isShowEdit (val) {
      if (!val) {
        this.setModal(false);
        this.setItemId('');
        this.formCustomer.checkedBoxList = [];
        // 关闭此页面时清空，防止新增打开时触发盒子选择表单验证
      }
    },
    formData (val) {
      this.$refs.formCustomer.resetFields();
      if (Object.keys(val).length > 0) {
        this.formCustomer = {
          deliveryPlanId: val.deliveryPlanId,
          deliveryPlanName: val.deliveryPlanName,
          checkedBoxList: [...val.checkedBoxList],
          deliveryDate: val.deliveryDate,
          deliveryTime: val.deliveryTime,
          // playTimes: val.playTimes,
          remark: val.remark
        };
        this.id = val.deliveryPlanId || '';
      } else {
        this.formCustomer = {
          deliveryPlanId: '',
          deliveryPlanName: '',
          checkedBoxList: [],
          deliveryDate: '',
          deliveryTime: '',
          // playTimes: null,
          remark: ''
        };
        this.id = '';
      }
    }
  },
  components: {
    BoxList
  }
};
</script>
<style lang="less">
.ivu-input-number-handler-wrap{
      display: none;
    }
</style>
