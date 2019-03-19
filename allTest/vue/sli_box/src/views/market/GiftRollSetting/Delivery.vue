<template>
    <div>
        <p class="desc">说明：<br>
        领取条件：无消费记录的用户即可领取。 <br>
        优惠劵设置：最多可选择三张优惠劵且优惠劵须是在有效期内，此处发放的优惠劵数量不影响库存！<br>
        活动期限：若不设置活动期限，则默认为活动长期有效。若设置活动期限，则优惠劵在活动期限内有效。
        </p>
         <Form ref="formInline" :label-width="150" :model="formItem" :rules="formRules">
            <FormItem label="开启活动" >
                    <RadioGroup v-model="formItem.openEvent">
                        <Radio label="1">是</Radio>
                        <Radio label="0">否</Radio>
                    </RadioGroup></FormItem>
            <FormItem label="选择优惠劵" prop="coupon">
                <!-- <label for="">618同庆劵;618同庆劵;618同庆劵;618同庆劵618同庆劵;618同庆劵</label> -->
                <Button  icon="ios-cloud-upload-outline" size="small" @click="couponClick">选择优惠劵</Button>
            </FormItem>
            <FormItem label="" >
              <Table :disabled-hover="true" :columns="columns" :data="formItem.coupon"></Table>
            </FormItem>
            <FormItem label="设置活动期限" >
                    <RadioGroup v-model="formItem.hasDeadline">
                        <Radio label="1">是</Radio>
                        <Radio label="0">否</Radio>
                    </RadioGroup>
            </FormItem>
            <FormItem label="活动有效期" v-show="formItem.hasDeadline==='1'" prop="activeTime">
                <DatePicker
                    placement="top"
                    v-model="formItem.activeTime"
                    type="datetimerange" format="yyyy-MM-dd HH:mm:ss"
                    placeholder="活动时间"
                    style="width: 300px"></DatePicker>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSave">保存</Button>
            </FormItem>
        </Form>
      <Modal
        v-model="showModal"
        width="62.5%"
       :footerHide="true"
        >
        <CouponSelect @itemSelect="itemSelect"/>
      </Modal>
    </div>
</template>
<script>
import { saveItem } from './model';
import fecha from 'fecha';

export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  name: 'Delivery',
  data () {
    const validateTime = (rule, value, callback) => {
      if (this.formItem.hasDeadline === '1' && value.every(s => !s)) {
        callback(new Error('请输入活动时间'));
      } else {
        callback();
      }
    };
    const validateCoupon = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('至少选择一个优惠劵'));
      } else {
        callback();
      }
    };
    return {
      columns: [
        {
          title: '优惠劵名称',
          key: 'name'
        },
        {
          title: '数量',
          key: 'count',
          render: (h, params) => {
            const self = this;
            return h('div', [
              h('InputNumber', {
                props: {
                  max: 10000,
                  min: 1,
                  value: params.row.count,
                  precision: 0
                },
                on: {
                  input (value) {
                    self.formItem.coupon[params.index].newCount = value;
                    // params.row.count = value;
                  }
                }
              }, '')
            ]);
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => h('div', [
            h('Button', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.formItem.coupon.splice(params.index, 1);
                }
              }
            }, 'x')
          ])
        }
      ],
      showModal: false,
      formItem: {
        openEvent: '1',
        hasDeadline: '1',
        activeTime: [],
        coupon: []
      },
      formRules: {
        activeTime: [
          { validator: validateTime, trigger: 'blur' }
        ],
        coupon: [
          { validator: validateCoupon, trigger: 'blur' }
        ]
      }
    };
  },
  mounted () {
    const data = this.data;
    if (Object.keys(data).length) {
      this.formItem.openEvent = data.openEvent;
      this.formItem.hasDeadline = data.hasDeadline;
      this.formItem.activeTime = data.activeTime;
      this.formItem.coupon = data.coupon.map((x) => {
        x.newCount = x.count;
        return x;
      });
    }
  },
  methods: {
    couponClick () {
      this.showModal = true;
    },
    handleSave () {
      this.$refs.formInline.validate((valid) => {
        if (valid) {
          this.save();
        }
      });
    },
    save () {
      const params = {
        scheme_id: this.data.id,
        scheme_switch: this.formItem.openEvent,
        time_switch: this.formItem.hasDeadline,

        scheme_setting_str: this.formItem.coupon.map((x) => {
          const count = x.newCount || x.count;
          return `${x.id}/${count}`;
        }).join(',')
      };
      if (this.formItem.hasDeadline === '1') {
        params.start_time = fecha.format(this.formItem.activeTime[0], 'YYYY-MM-DD HH:mm:ss');
        params.end_time = fecha.format(this.formItem.activeTime[1], 'YYYY-MM-DD HH:mm:ss');
      }
      saveItem(params).then((result) => {
        this.$fetchCB(result, (data) => {
          this.$success('保存成功');
        });
      });
    },
    itemSelect (row) {
      const temp = {
        id: row.id,
        name: row.couponName,
        count: 1
      };
      if (!this.formItem.coupon.some(x => x.id === temp.id)) {
        this.formItem.coupon.push(temp);
        this.$success('添加成功');
      } else {
        this.$error('重复添加');
      }
      this.$refs.formInline.validateField('coupon');
    }
  },
  watch: {
    data (val) {
      if (Object.keys(val).length) {
        this.formItem.openEvent = val.openEvent;
        this.formItem.hasDeadline = val.hasDeadline;
        this.formItem.activeTime = val.activeTime;
        this.formItem.coupon = val.coupon;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.desc {
    padding: 15px 10px;
    background: #d9edf6;
    color: #397d95;
    border-radius: 2px;
    margin-bottom: 20px;
}
</style>
