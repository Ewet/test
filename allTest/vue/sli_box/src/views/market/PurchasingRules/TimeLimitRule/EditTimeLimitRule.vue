<template>
   <div class="editTimeLimitRule">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
            <FormItem label="规则名称" prop="ruleName">
                <Input :maxlength="50" v-model="formValidate.ruleName" clearable placeholder="请输入规则名称"></Input>
            </FormItem>
            <FormItem label="提成比例" prop="commissionRatio">
                <Input
                    :maxlength="6"
                    v-model="formValidate.commissionRatio"
                    placeholder="请输入提成比例"
                    clearable
                    @on-blur='handleCommission'
                ></Input>
            </FormItem>
            <FormItem label="封顶金额" prop="cappedAmount">
                <Input
                    :maxlength="10"
                    v-model="formValidate.cappedAmount"
                    @on-blur='handleCappedAmount'
                    clearable
                    placeholder="请输入封顶金额">
                </Input>
            </FormItem>
            <FormItem label='开始时间' prop="startTime">
                <DatePicker
                v-model="formValidate.startTime"
                type="datetime"
                placeholder="开始时间"
                clearable
                :options="startTimeOptions"
                ></DatePicker>
            </FormItem>
            <FormItem label='结束时间' prop="endTime">
                <DatePicker
                v-model="formValidate.endTime"
                type="datetime"
                placeholder="结束时间"
                clearable
                :options="endTimeOptions"
                ></DatePicker>
            </FormItem>
            <FormItem label='盒子选择'>
              <Button @click="boxNoClick($event)" type="primary">选择盒子</Button>
              <BoxList
                  :boxList="formValidate.boxRanges"
                  style="margin-top:10px;"
                  v-if="formValidate.boxRanges"
                  @remove="removeBoxItem"
              />
            </FormItem>
            <FormItem>
                <ZBtn @click="handleCommitLimitRule">提交</ZBtn>
            </FormItem>
        </Form>
        <Modal
          title="选择盒子"
          :value="showSelectBoxModal"
          style="z-index:1001;"
          fullscreen
          :footer-hide="true"
          @on-cancel="setSelectBoxModal(false);"
          >
          <BoxSelect
            :checkedBoxList1="formValidate.boxRanges"
            :show="showSelectBoxModal"
            @itemSelect="sendBoxNo"
            />
        </Modal>
   </div>
</template>

<script>
import { getTimeLimitRuleItem, createTimeLimitRule, editTimeLimitRule } from '../model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from '../store';
import BoxList from './BoxList';
import BoxSelect from './BoxSelect';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'EditTimeLimitRule',
  components: {
    BoxList,
    BoxSelect
  },
  data () {
    return {
      formValidate: {
        ruleName: '',
        commissionRatio: '0',
        cappedAmount: '0',
        startTime: '',
        endTime: '',
        boxRanges: []
      },
      ruleValidate: {
        ruleName: this.$rulesChange('规则名称不能为空!'),
        commissionRatio: this.$rulesChange('提成比例不能为空!'),
        cappedAmount: this.$rulesChange('封顶金额不能为空!'),
        startTime: this.$rulesChange('开始时间不能为空!', 'date'),
        endTime: this.$rulesChange('结束时间不能为空!', 'date')
      },
      startTimeOptions: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now();
        }
      },
      endTimeOptions: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now();
        }
      }
    };
  },
  created () {
    this.handleCommitLimitRule = this.$debounce(this.handleCommitLimitRule);
  },
  methods: {
    async loadEditData () {
      let { success, data, msg } = await getTimeLimitRuleItem(this.limitRuleId);
      if (success) {
        let formValidate = this.formValidate;
        formValidate.ruleName = data.name;
        formValidate.commissionRatio = data.commissionRate.toString();
        formValidate.cappedAmount = data.commissionLimit.toString();
        formValidate.startTime = data.startTime;
        formValidate.endTime = data.endTime;
        formValidate.boxRanges = data.boxRanges;
      } else {
        this.$error(msg);
      }
    },
    handleCommission (e) {
      const val = e.target.value;
      const tempVal = parseFloat(val);
      this.formValidate.commissionRatio = this.$limitInputNumber(val);
      if (tempVal >= 100) {
        this.formValidate.commissionRatio = '100';
      }
      if (tempVal < 0) {
        this.formValidate.commissionRatio = '0';
      }
    },
    handleCappedAmount (e) {
      const val = e.target.value;
      const tempVal = parseFloat(val);
      this.formValidate.cappedAmount = this.$limitInputNumber(val);
      if (tempVal >= 0 && tempVal < 1) {
        this.formValidate.cappedAmount = '0';
      }
    },
    // 删除已选盒子中的某一项
    removeBoxItem (index) {
      this.formValidate.boxRanges.splice(index, 1);
    },
    // 点击选择盒子
    boxNoClick (event) {
      // 通信首页弹出盒子选择并把已选中盒子列表传过去
      this.setSelectBoxModal(true);
    },
    // 获取到选择到的盒子数据
    sendBoxNo (list) {
      this.formValidate.boxRanges = list;
    },
    // 返回提交的数据
    returnConfimData () {
      let thatData = this.formValidate;
      let boxNoes = [];
      for (const item of thatData.boxRanges) {
        boxNoes.push(item.boxNo);
      }
      let boxData = boxNoes.toString();
      if (thatData.startTime.getTime() >= thatData.endTime.getTime()) {
        this.$error('开始时间不能大于和等于结束时间');
        return false;
      }
      let datas = {
        name: thatData.ruleName,
        commission_rate: thatData.commissionRatio,
        commission_limit: thatData.cappedAmount,
        start_time: this.$formatTime(thatData.startTime),
        end_time: this.$formatTime(thatData.endTime),
        box_noes: boxData
      };
      return datas;
    },
    handleCommitLimitRule () {
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          let data = this.returnConfimData();
          if (data) {
            if (this.isEdit) {
              data.time_limit_rule_id = this.limitRuleId;
              editTimeLimitRule(data)
                .then(res => {
                  if (res.success) {
                    this.setEditTimeLimitRuleModal(false);
                    this.$success('限时规则编辑成功！');
                    this.$emit('reloadLimitRuleData');
                  } else {
                    this.$error(res.msg);
                  }
                });
            } else {
            // create
              data.bom_code = this.bomCode;
              createTimeLimitRule(data)
                .then(res => {
                  if (res.success) {
                    this.setEditTimeLimitRuleModal(false);
                    this.$success('限时规则添加成功！');
                    this.$emit('reloadLimitRuleData');
                  } else {
                    this.$error(res.msg);
                  }
                });
            }
          }
        }
      });
    }
  },
  watch: {
    showEditTimeLimitRuleModal (val) {
      if (val) {
        if (this.isEdit) {
          // edit
          this.loadEditData();
        } else {
          // add
        }
      } else {
        this.formValidate = {
          ruleName: '',
          commissionRatio: '0',
          cappedAmount: '0',
          startTime: '',
          endTime: '',
          boxRanges: []
        };
        this.$refs['formValidate'].resetFields();
      }
    }
  }
};
</script>

<style scoped lang='less'>
</style>
