<template>
   <Form ref="formInline" :label-width="120" :model="formItem" :rules="formRules">
        <FormItem label="选择优惠劵" prop="selectCoupon">
              <Select v-model="formItem.selectCoupon" placeholder="选择优惠劵">
                <Option
                v-for="(item,index) in couponOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
        </FormItem>
        <FormItem label="每人发送张数">
             <InputNumber
              v-model="formItem.sendCount"
              :min="1"
              :max="999999"
              :precision="0"
             >
            </InputNumber>
            <p>此处受总数限制，如果剩余张数不足以发放给选定会员数量，则无法发放</p>
        </FormItem>
        <h3>发送对象</h3>
        <FormItem label="发送类型">
            <RadioGroup v-model="formItem.sendType">
               <Radio :key="item.value" :label="item.value" v-for="item in sendTypeOptions">{{item.name}}</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="选择会员" v-show="formItem.sendType === 'open_id'" prop="openIdStr">
            <p>按用户发送</p>
            <Input
            v-model="formItem.openIdStr"
            type="textarea"
            placeholder="请用半角逗号分隔开OPENID，如aaa,bbb,ccc"
            :rows="10"
            ></Input>
        </FormItem>
        <FormItem label="选择手机" v-show="formItem.sendType === 'mobile'" prop="mobileStr">
            <p>按手机号码发送</p>
            <Input v-model="formItem.mobileStr"
            type="textarea"
            placeholder="请用半角逗号分隔开手机号码，如13800138000,1008611,15913388585"
            :rows="10"></Input>
        </FormItem>
        <h3>推送设置</h3>
        <FormItem label="推送模式" >
            <RadioGroup v-model="formItem.pushMode">
                <Radio :key="item.value" :label="item.value" v-for="item in pushModeOptions">{{item.name}}</Radio>
            </RadioGroup>
        </FormItem>
    <FormItem>
        <Button type="primary" @click="handleSave">确认发放</Button>
    </FormItem>
    <Spin fix v-show="loading">
        <Icon type="load-c" size=18 class="send-spin-icon-load "></Icon>
        <div>发放中...</div>
    </Spin>
   </Form>
</template>
<script>
import { getList } from 'views/market/Coupon/model';
import { sendMsg } from './model';
import { download } from 'model/file';

export default {
  name: 'SendMessageSetting',
  data () {
    const validateOpenIdStr = (rule, value, callback) => {
      if (this.formItem.sendType === 'open_id' && value.trim() === '') {
        callback(new Error('请输入OPENID'));
      } else {
        callback();
      }
    };
    const validateMobileStr = (rule, value, callback) => {
      if (this.formItem.sendType === 'mobile' && value.trim() === '') {
        callback(new Error('请输入手机号码'));
      } else {
        callback();
      }
    };
    return {
      formItem: {
        selectCoupon: '',
        sendCount: 1,
        sendType: 'open_id',
        pushMode: 'wxtm',
        sendStr: '',
        openIdStr: '',
        mobileStr: ''
      },
      formRules: {
        selectCoupon: [
          { required: true, message: '优惠劵不能为空', trigger: 'change' }
        ],
        openIdStr: [
          { validator: validateOpenIdStr, trigger: 'blur' }
        ],
        mobileStr: [
          { validator: validateMobileStr, trigger: 'blur' }
        ]
      },
      couponOptions: [],
      pushModeOptions: [
        {
          name: '发送模版消息',
          value: 'wxtm'
        },
        {
          name: '发送客服消息',
          value: 'csm'
        }, {
          name: '不发送推送消息',
          value: 'none'
        }
      ],
      sendTypeOptions: [
        {
          name: '指定用户发送',
          value: 'open_id'
        },
        {
          name: '按指定号码发送',
          value: 'mobile'
        }
        // {
        //   name: '全部发送',
        //   value: 'all'
        // }
      ],
      loading: false
    };
  },
  mounted () {
    this.loadCoupon();
  },
  methods: {
    handleSave () {
      this.$refs.formInline.validate((valid) => {
        if (valid) {
          this.save();
        }
      });
    },
    save () {
      let targetStr = 'all';
      switch (this.formItem.sendType) {
        case 'open_id': targetStr = this.formItem.openIdStr; break;
        case 'mobile': targetStr = this.formItem.mobileStr; break;
      }
      this.loading = true;
      sendMsg({
        coupon_id: this.formItem.selectCoupon,
        per_count: this.formItem.sendCount,
        target_type: this.formItem.sendType,
        target_id_str: targetStr,
        msg_type: this.formItem.pushMode
      }).then((result) => {
        this.$fetchCB(result, (data) => {
          this.$success('发放消息成功');
          if (data) {
            // location.href = data;
            download(data);
          }
        });
        this.loading = false;
      });
    },
    loadCoupon () {
      getList({
        'pagination[page_size]': 1000,
        publish_status: 1
      }).then(({ success, data, msg }) => {
        if (success) {
          this.couponOptions = data.items.map(x => ({
            name: x.couponName,
            value: x.id
          }));
        }
      });
    },
    loadData () {

    }
  },
  watch: {
    'formItem.sendType': function (val) {
      this.formItem.openIdStr = '';
      this.formItem.mobileStr = '';
      if (val === 'open_id') {
        this.$refs.formInline.validateField('mobileStr');
      } else if (val === 'mobile') {
        this.$refs.formInline.validateField('openIdStr');
      }
    }
  }
};
</script>
<style lang="less" scoped>
h3 {
    border-bottom: 1px solid #dddee1;
    padding-bottom: 10px;
    margin-bottom: 10px;
}
.send-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
</style>
