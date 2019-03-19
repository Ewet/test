<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
     <FormItem label='分成日期' prop="dividedDate">
          <DatePicker
          format="yyyy-MM-dd"
          v-model="formValidate.dividedDate"
          type="daterange"
          placeholder="分成日期"
          ></DatePicker>
      </FormItem>
      <FormItem label="分成比例(%)" prop="dividedProportion">
            <InputNumber
            :max="99"
            :min="1"
            :precision="0"
            v-model="formValidate.dividedProportion"
            placeholder="请输入0-100之间的数字"
            @on-blur="proportionCheck()"
            style="width:100%;"
            ></InputNumber>
      </FormItem>
      <FormItem label="保底金额" prop="lowestAmount">
            <InputNumber
            :max="999999.99"
            :min="1"
            v-model="formValidate.lowestAmount"
            placeholder="请输入保底金额"
            @on-blur="lowestAmountCheck()"
            style="width:100%;"
            ></InputNumber>
      </FormItem>
      <FormItem label='备注' prop='remark'>
                <Input v-model="formValidate.remark" :maxlength="100" type="textarea" :autosize="{minRows: 4, maxRows: 6}" placeholder="备注不超过100字"></Input>
      </FormItem>
         <FormItem>
            <Button type="primary" @click="add('formValidate')" v-show="!id">新增</Button>
            <Button type="primary" @click="save('formValidate')" v-show="id">保存</Button>
        </FormItem>
      </Form>
</template>
<script>

import { updateItem, addItem } from './model';
import vuexMixins from 'mixins/module-map';
import { debounce } from 'lodash';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'DividedRuleEdit',
  data () {
    const dividedDatePass = (rule, value, callback) => {
      if (!(value.length && value.every(x => !!x) > 0)) {
        callback(new Error('分成日期不能为空'));
      }
      callback();
    };
    return {
      id: '',
      formValidate: {
        dividedDate: '',
        dividedProportion: null,
        lowestAmount: null,
        remark: ''
      },
      ruleValidate: {
        dividedDate: [
          { required: true, validator: dividedDatePass, trigger: 'change' }
        ],
        dividedProportion: [
          {
            required: true,
            type: 'number',
            message: '分成比例不能为空'
          }
        ],
        lowestAmount: [
          {
            required: true,
            type: 'number',
            message: '保底金额不能为空'
          }
        ]

      }

    };
  },
  computed: {
  //   isdisable () {
  //     return (this.status === 10 && this.id !== '');
  //   }
  },
  mounted () {

  },
  created () {
    this.add = debounce(this.add, 500);
    this.save = debounce(this.save, 500);
  },
  methods: {
    // 去空格
    trim (str) {
      if (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
      }
      return str;
    },
    proportionCheck () {
      this.$refs.formValidate.validateField('dividedProportion');
    },
    lowestAmountCheck () {
      this.$refs.formValidate.validateField('lowestAmount');
    },
    getFormData () {
      const date = this.$formatTime(this.formValidate.dividedDate, 'ymd');
      return {
        merchant_id: this.merchantId,
        plan_start_time: date[0],
        plan_end_time: date[1],
        proportion: this.formValidate.dividedProportion,
        minimum_amount: this.formValidate.lowestAmount,
        remark: this.formValidate.remark
      };
    },
    add (name) {
      this.$refs.formValidate.validate(async (valid) => {
        if (valid) {
          const { success, msg } = await addItem({
            ...this.getFormData()
          });
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
      this.$refs.formValidate.validate(async (valid) => {
        if (valid) {
          const { success, msg } = await updateItem({
            ...this.getFormData(),
            rule_id: this.itemId
          });
          if (success) {
            this.$success('保存成功!');
            this.setModal(false);
            this.setItemId('');
            this.reload();
          } else {
            this.$error(msg);
          }
        }
      });
    },
    handleReset (name) {
      this.$refs.formValidate.resetFields();
    }
  },
  watch: {
    showPrizeEditModal (val) {
      if (val) {
        this.handleReset();
      }
    },
    formData (val) {
      this.$refs.formValidate.resetFields();
      if (Object.keys(val).length > 0) {
        this.formValidate = {
          // deliveryPlanId: val.deliveryPlanId,
          dividedDate: val.dividedDate,
          dividedProportion: val.dividedProportion,
          lowestAmount: val.lowestAmount,
          remark: val.remark
        };
        this.id = this.itemId || '';
      } else {
        this.formValidate = {
          // deliveryPlanId: '',
          dividedDate: '',
          dividedProportion: null,
          lowestAmount: null,
          remark: ''
        };
        this.id = '';
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
