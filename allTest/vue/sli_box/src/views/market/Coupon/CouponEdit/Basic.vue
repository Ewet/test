<template>
   <div class="coupon-edit-basic">
    <Form ref="formInline" :model="formItem" :label-width="150" :rules="ruleValidate">
        <Spin size="large" fix v-show="loading"></Spin>
        <FormItem label="排序">
            <InputNumber :max="999999" :min="1" v-model="formItem.sort"></InputNumber>
            <p>数字越大越靠前</p>
        </FormItem>
        <FormItem label="优惠劵名称" prop="couponName">
            <Input v-model="formItem.couponName"></Input>
        </FormItem>
        <FormItem label="使用条件">
            <InputNumber
            :max="999999"
            :min="0"
            v-model="formItem.condition"
            @on-blur="() => formItem.condition = Number(formItem.condition.toFixed(2))"></InputNumber>
            <p>消费满多少可用，0不限制</p>
        </FormItem>
        <RadioGroup v-model="formItem.timeControl">
        <FormItem label="使用时间限制" prop="duration">
            <Radio label="2">获得后</Radio>
            <InputNumber
            :max="999999"
            :min="0"
            v-model="formItem.duration"
            :disabled="formItem.timeControl==='1'"
            ></InputNumber>
            <span class="after-input">天内有效（0为不限时间使用）</span>
        </FormItem>
        <FormItem prop="time">
           <Radio label="1">在日期</Radio>
            <DatePicker
                v-model="formItem.time"
                type="daterange" format="yyyy-MM-dd"
                placeholder="创建时间"
                style="width: 300px"
                :disabled="formItem.timeControl==='2'"
                ></DatePicker>
                <span class="after-input">内有效</span>
        </FormItem>
        </RadioGroup>
        <FormItem label="优惠方式">
            <RadioGroup v-model="formItem.couponType">
                <Radio label="1">立减</Radio>
                <Radio label="2">折扣</Radio>
            </RadioGroup>
            <p v-if="formItem.couponType==='1'">
                立减 <InputNumber
                :max="999999"
                :min="0"
                v-model="formItem.couponValue"
                @on-blur="() => formItem.couponValue = Number(formItem.couponValue.toFixed(2))"></InputNumber>
                <span class="after-input">元</span>
            </p>
            <p v-if="formItem.couponType==='2'">
                折扣 <InputNumber :max="100" :min="0" v-model="formItem.couponValue" :precision="0"></InputNumber>%
            </p>
        </FormItem>
         <!-- <FormItem label="是否可叠加" >
            <RadioGroup v-model="formItem.superposable" >
                <Radio label="1" :disabled="formItem.couponType === '2'">是</Radio>
                <Radio label="0" :disabled="formItem.couponType === '2'">否</Radio>
            </RadioGroup>
        </FormItem> -->
        <FormItem label="每人可领取最大数" >
            <InputNumber :max="999999" :min="1" v-model="formItem.maxCount"></InputNumber>
        </FormItem>
         <FormItem label="发放总数" >
            <InputNumber :max="999999" :min="-1" v-model="formItem.stock"></InputNumber>
            <p>优惠劵总数量，-1为不限制张数</p>
        </FormItem>
    </Form>
    <div class="buttons">
          <Button type="primary" @click="handleSave">保存</Button>
          <Button type="primary" @click="setModal(false)">返回列表</Button>
    </div>
  </div>
</template>
<script>
import { saveBasic, getBasic } from '../model';
import fecha from 'fecha';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  // mixins: [vuexMixins({moduleName: 'coupon'})],
  name: 'CouponEditBasic',
  data () {
    const validateTime = (rule, value, callback) => {
      if (this.formItem.timeControl === '1' && value.every(s => !s)) {
        callback(new Error('请输入开始日期和结束日期'));
      } else {
        callback();
      }
    };
    const validateDuration = (rule, value, callback) => {
      if (this.formItem.timeControl === '2' && value === null) {
        callback(new Error('请输入持续时间'));
      } else {
        callback();
      }
    };
    return {
      formItem: {
        sort: 1,
        couponName: '',
        condition: 0,
        duration: 0,
        time: [],
        couponType: '1',
        couponValue: 0,
        stock: 1,
        timeControl: '2',
        maxCount: 1,
        superposable: '0'
      },
      ruleValidate: {
        couponName: [
          { required: true, message: '优惠劵名称不能为空', trigger: 'blur' }
        ],
        duration: [
          { validator: validateDuration, trigger: 'blur' }
        ],
        time: [
          { validator: validateTime, trigger: 'blur' }
        ]
      },
      loading: false
    };
  },
  methods: {
    handleSave () {
      this.$refs.formInline.validate((valid) => {
        if (valid) {
          this.save();
        } else {
          console.log(this.$refs.formInline);
          // this.$refs['formInline'].scrollTop = 0;
          this.$refs.formInline.$el.scrollTo(0, 0);
        }
      });
    },
    save () {
      const formItem = this.formItem;
      const data = {
        coupon_id: this.itemId,
        sort: formItem.sort,
        name: formItem.couponName,
        using_threshold: formItem.condition,
        time_control: formItem.timeControl,
        duration: formItem.duration,
        coupon_type: formItem.couponType,
        coupon_value: formItem.couponValue,
        stock: formItem.stock,
        max_count: formItem.maxCount,
        superposable: formItem.superposable
      };
      if (formItem.timeControl === '1' && formItem.time.length > 0) {
        data.start_time = fecha.format(formItem.time[0], 'YYYY-MM-DD 00:00:00');
        data.end_time = fecha.format(formItem.time[1], 'YYYY-MM-DD 23:59:59');
      }
      saveBasic(data).then((result) => {
        this.$fetchCB(result, (data) => {
          if (data.couponId) {
            this.setItemId(data.couponId);
          }
          this.reload();
          this.$success('保存成功');
        });
      });
    }
  },
  watch: {
    itemId (val) {
      if (!val) {
        const formItem = {};
        formItem.sort = 1;
        formItem.couponName = '';
        formItem.condition = 0;
        formItem.duration = 0;
        formItem.time = [];
        formItem.couponType = '1';
        formItem.couponValue = 0;
        formItem.stock = 0;
        formItem.timeControl = '2';
        formItem.maxCount = 1;
        formItem.superposable = '0';
        this.formItem = formItem;
      } else {
        this.loading = true;
        getBasic(val).then((result) => {
          this.$fetchCB(result, (data) => {
            const formItem = {};
            formItem.sort = data.sort;
            formItem.couponName = data.couponName;
            formItem.condition = data.condition;
            formItem.duration = data.duration;
            formItem.time = [data.startTime, data.endTime];
            formItem.couponType = data.couponType;
            formItem.couponValue = data.couponValue;
            formItem.stock = data.stock;
            formItem.timeControl = data.timeControl;
            formItem.maxCount = data.maxCount;
            formItem.superposable = data.superposable;
            this.formItem = formItem;
            this.$nextTick(() => {
              this.loading = false;
            });
          });
        });
      }
    },
    showModal (val) {
      this.$refs.formInline.resetFields();
    },
    'formItem.timeControl': function (val) {
      if (val === '2') {
        this.$refs.formInline.validateField('time');
      } else if (val === '1') {
        this.$refs.formInline.validateField('duration');
      }
    },
    'formItem.couponType': function (val) {
      if (!this.loading) {
        this.formItem.couponValue = 0;
        if (val === '2') {
          this.formItem.superposable = '0';
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.coupon-edit-basic {
  padding-bottom:50px;
  .ivu-form {
    max-height: 500px;
    overflow:auto;
  }
  .buttons {
    position: absolute;
    left: 150px;
    margin-top: 10px;
  }
  .after-input {
    margin-left: 5px;
  }
}
</style>
