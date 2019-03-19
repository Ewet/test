<template>
    <div class='weChatDrawEdit clearfix'>
        <Form ref="formValidate" :model="formValidate" :rules='ruleValidate' :label-width="96" style="height: 550px;overflow: auto;">
            <div class="itemBox">
                <h4>活动信息</h4>
                <FormItem label="活动对象" prop="activeObject" >
                    <RadioGroup v-model="formValidate.activeObject">
                        <Radio label="1" :disabled='isInHand'>普通用户</Radio>
                        <Radio label="2" :disabled='isInHand'>代购员</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label='活动循环周期' prop='activeCycle'>
                    <InputNumber :disabled='isInHand' :max="999999" :min="0" v-model="formValidate.activeCycle" clearable placeholder="请输入抽奖周期" @on-blur="validActiveCycle"></InputNumber >
                </FormItem>
                <FormItem label="活动名称" prop="activityName" >
                    <Input v-model="formValidate.activityName" :maxlength='50' clearable placeholder="请输入活动名称"></Input>
                </FormItem>
                <FormItem label="活动时间" prop="activityTime" >
                    <DatePicker @on-clear="validActivityTime" @on-ok='validActivityTime' v-model="formValidate.activityTime" clearable type="datetimerange" placeholder="日期范围" style="width: 100%"></DatePicker>
                </FormItem>
                <FormItem label="活动规则" prop="activityRules" >
                    <Input v-model="formValidate.activityRules" :maxlength='1500' clearable type="textarea" :rows="4" placeholder="请输入活动规则" />
                </FormItem>
            </div>
            <div class="itemBox">
                <h4>活动范围</h4>
                <div class='box'>
                    <FormItem label="盒子范围" prop="boxList" >
                        <Input style="width: 65%;" clearable v-model="formValidate.boxList" placeholder="请输入盒子编号"></Input>
                        <span>多个盒子编号请用英文“,”号隔开</span>
                    </FormItem>
                </div>
                <div class='merchant'>
                    <FormItem label="商品范围" prop="commodityList" >
                        <Input style="width: 65%;" clearable v-model="formValidate.commodityList" placeholder="请输入商品BOM码"></Input>
                        <span>多个商品BOM码请用英文“,”号隔开</span>
                    </FormItem>
                </div>
            </div>
        </Form>
        <!-- <Button class='CommonModalCancel' @click="cancel" type="primary">取消</Button> -->
        <!-- <Button :disabled='isDisable' class='CommonModalOk' @click="addOk('formValidate')" type="primary">保存</Button> -->
        <CancelBtn @click="handleCancel"/>
        <SaveBtn @click="addOk('formValidate')"></SaveBtn>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { addItem, modifyItem } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'WeChatDrawEdit',
  data () {
    return {
      isDisable: false,
      isInHand: false,
      formValidate: {
        activeObject: '1',
        activeCycle: null,
        activityName: '',
        activityTime: [],
        activityRules: '',
        boxList: '',
        commodityList: ''
      },
      ruleValidate: {
        activeObject: [
          { required: true }
        ],
        activeCycle: [
          {
            required: true, trigger: 'blur', message: '活动循环周期不能为空', type: 'number'
          }
        ],
        activityName: [
          {
            required: true, trigger: 'blur', message: '活动名称不能为空', transform (value) { return value.toString().trim(); }
          }
        ],
        activityTime: [
          { required: true, trigger: 'blur', validator: this.validateActivityTime }
        ],
        activityRules: [
          {
            required: true, trigger: 'blur', message: '活动规则不能为空', transform (value) { return value.toString().trim(); }
          }
        ],
        boxList: [
          {
            required: true, trigger: 'blur', message: '盒子范围不能为空', transform (value) { return value.toString().trim(); }
          }
        ],
        commodityList: [
          {
            required: true, trigger: 'blur', message: '商品范围不能为空', transform (value) { return value.toString().trim(); }
          }
        ]
      }
    };
  },
  watch: {
    showModal (val) {
      if (val === true) {
        if (this.isEdit === '1') {
          const x = this.formData;
          const data = this.formValidate;
          data.activeObject = x.activeObject.toString();
          data.activeCycle = x.activeCycle;
          data.activityName = x.activityName;
          data.activityTime = [x.activityTimeStart, x.activityTimeEnd];
          data.activityRules = x.activityRules;
          const boxNo = x.boxList.map(x => x.boxNo);
          const commodity = x.commodityList.map(x => x.goodsBom);
          data.boxList = boxNo.join(',');
          data.commodityList = commodity.join(',');
          if (this.inHand === '10') {
            this.isInHand = true;
          } else {
            this.isInHand = false;
          }
        } else {
          this.isInHand = false;
          const date = this.$formatTime(new Date(), 'ymd-hms');
          const end = `${this.$formatTime(new Date(), 'ymd')} 23:59:59`;
          this.formValidate.activityTime = [date, end];
        }
      }
    }
  },
  created () {
    this.$g_on('clearEditModal', this.clearEditModal);
    this.addOk = this.$debounce(this.addOk, 500);
  },
  beforeDestroy () {
    this.$g_off('clearEditModal', this.clearEditModal);
  },
  methods: {
    validActiveCycle () {
      this.$refs.formValidate.validateField('activeCycle');
    },
    validActivityTime () {
      this.$nextTick(() => {
        this.$refs.formValidate.validateField('activityTime');
      });
    },
    clearEditModal () {
      this.handleCancel();
    },
    validateActivityTime (rule, value, callback) {
      if (value[0] === '' || value[1] === '') {
        callback(new Error('活动时间不能为空'));
      } else {
        callback();
      }
    },
    handleCancel () {
      this.$refs.formValidate.resetFields();
      this.setModal(false);
      this.setIsEdit('0');
      this.setInHand('');
    },
    addOk (name) {
      // 阻止重复点击
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          // true
          // 请求接口
          this.isDisable = true;
          const data = this.formValidate;
          const apiData = {
            activity_target: Number(data.activeObject),
            cycle: data.activeCycle,
            activity_name: data.activityName,
            start_time: this.$formatTime(new Date(data.activityTime[0]), 'ymd-hms'),
            end_time: this.$formatTime(new Date(data.activityTime[1]), 'ymd-hms'),
            description: data.activityRules,
            box_list: data.boxList,
            bom_list: data.commodityList
          };
          if (this.isEdit === '0') {
            // 增加
            const { success, msg } = await addItem(apiData);
            if (success) {
              this.$success('新建活动成功！');
              this.handleCancel();
              this.reload();
            } else {
              this.$error(`新建活动失败！${msg}`);
            }
            this.isDisable = false;
          } else {
            // 编辑
            apiData.activity_id = this.itemId;
            const { success, msg } = await modifyItem(apiData);
            if (success) {
              this.$success('编辑活动成功！');
              this.handleCancel();
              this.reload();
            } else {
              this.$error(`编辑活动失败！${msg}`);
            }
            this.isDisable = false;
          }
        }
      });
    }
  }
};
</script>
<style lang="less">
.weChatDrawEdit{
    @import '~@/assets/common.less';
    .ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
        background-color: #fff;
    }
    .formBtn{
        text-align:right;
    }
    .itemBox>h4{
        font-size: 14px;
        font-weight: bold;
        border-bottom: 1px solid #dcdee2;
        height: 30px;
        line-height: 30px;
        margin-bottom: 14px;
    }
    .cover{
        width: 100px;
        height: 100px;
        border: 1px solid #dcdee2;
        border-radius: 4px;

    }
    .cover img{
        display: block;
        height: 100%;
        overflow: hidden;
        cursor: pointer;
    }
    .ivu-select,.ivu-input-wrapper,.ivu-input-number{
        width: 98%;
    }
    .ivu-select{
        margin-right: 10px;
    }
    textarea.ivu-input{
        resize: none;
    }
    .boxTag{
        width: 98%;
        padding: 2%;
        border-radius: 4px;
        border: 1px solid #dddee1;
    }
}
</style>
