<template>
   <Form ref="formInline" :label-width="150">
        <FormItem label="提现方式">
            <CheckboxGroup v-model="withdrawMethod">
                <Checkbox  :key="item.value" :label="item.value" v-for="item in withdrawOptions">{{item.name}}</Checkbox>
            </CheckboxGroup>
            <p>提示：提现方式支持多选</p>
        </FormItem>
        <FormItem label="提现门槛">
            <InputNumber :max="999999" :min="1" v-model="withdrawLimit"></InputNumber>
        </FormItem>
         <FormItem label="佣金计算方式" >
            <RadioGroup v-model="calculationMethod">
               <Radio :key="item.value" :label="item.value" v-for="item in commissionOptions">{{item.name}}</Radio>
            </RadioGroup>
            <p>默认方式：除运费险和会员折扣(或促销折扣)外其他所有费用全部计算佣金<br/>实际支付方式：只计算实际支付和余额抵扣部分的佣金(包余额支付)</p>
        </FormItem>
         <FormItem label="佣金提现手续费">
             <InputNumber
             :max="100"
             :min="0"
             v-model="withdrawFee"
             @on-blur="() => withdrawFee = Number(withdrawFee.toFixed(2))"
             ></InputNumber><span style="margin-left:1em">%</span>
        </FormItem>
        <FormItem label="免提现手续费金额区间">
            <label for="" style="margin-right:10px;">开始金额</label>
            <InputNumber :max="999999" :min="0" v-model="withdrawFeeStart"></InputNumber>
            <label for="" style="margin-right:10px;">结束金额</label>
            <InputNumber :max="999999" :min="0" v-model="withdrawFeeEnd"></InputNumber>
            <p>当提现手续费金额在此区间内时，不扣除提现手续费。结束金额必须大于开始金额才能生效<br/>
            例如设置开始金额0元，结束金额5元，只有提现手续费金额高于5元才扣除</p>
        </FormItem>
         <FormItem label="结算天数">
            <InputNumber :max="365" :min="0" :precision="0" v-model="settlementDays"></InputNumber>
            <p>当订单完成后的n天后，佣金才能申请提现，设置0，订单完成就可以结算</p>
        </FormItem>
        <FormItem label="是否允许结算" >
            <RadioGroup v-model="canSettle">
               <Radio :key="item.value" :label="item.value" v-for="item in canSettleOptions">{{item.name}}</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="单下线贡献额度  " >
            <InputNumber
            :max="9999"
            :min="0"
            :precision="0"
            v-model="contributionlimit">
            </InputNumber>
            <p>下线最多可返给上线的总额度，单位为元</p>
        </FormItem>
        <FormItem label="股东平台默认佣金比例">
             <InputNumber
              :max="100"
              :min="0"
              v-model="commonproportion"
              @on-blur="() => commonproportion = Number(commonproportion.toFixed(2))"
             ></InputNumber><span style="margin-left:1em">%</span>
             <p>股东下线订单的提成比例，单位为%</p>
        </FormItem>
        <FormItem label="股东盒子订单佣金比例">
             <InputNumber
              :max="100"
              :min="0"
              v-model="motaoproportion"
              @on-blur="() => motaoproportion = Number(motaoproportion.toFixed(2))"
             ></InputNumber><span style="margin-left:1em">%</span>
             <p>下线盒子端消费订单返给上线的佣金比例，单位为%</p>
        </FormItem>

    <FormItem>
        <Button type="primary" @click="save">确定</Button>
    </FormItem>
   </Form>
  </div>
</template>
<script>
import { getSettle, updateSettle } from './model';
import {
  getWithdrawMode,
  getCommissionMode,
  getCanSettle
} from 'model/enum';

export default {
  name: 'BaseSettingSettlement',
  data () {
    return {
      withdrawMethod: [],
      withdrawLimit: 0,
      calculationMethod: -1,
      withdrawFee: 0,
      withdrawFeeStart: 0,
      withdrawFeeEnd: 0,
      settlementDays: 0,
      withdrawOptions: [],
      commissionOptions: [],
      canSettle: -1,
      canSettleOptions: [],
      contributionlimit: 0,
      commonproportion: 0,
      motaoproportion: 0

    };
  },
  mounted () {
    getWithdrawMode().then(({ success, msg, data }) => {
      if (success) {
        this.withdrawOptions = data;
      } else {
        this.$error(msg);
      }
    });
    getCommissionMode().then(({ success, msg, data }) => {
      if (success) {
        this.commissionOptions = data;
      } else {
        this.$error(msg);
      }
    });
    getSettle().then(({ success, msg, data }) => {
      if (success) {
        this.withdrawMethod = data.withdrawMethod;
        this.withdrawLimit = data.withdrawLimit;
        this.calculationMethod = data.calculationMethod;
        this.withdrawFee = data.withdrawFee;
        this.withdrawFeeStart = data.withdrawFeeStart;
        this.withdrawFeeEnd = data.withdrawFeeEnd;
        this.settlementDays = data.settlementDays;
        this.canSettle = data.canSettle;
        this.contributionlimit = data.contributionlimit;
        this.commonproportion = data.commonproportion;
        this.motaoproportion = data.motaoproportion;
      } else {
        this.$error(msg);
      }
    });
    getCanSettle().then(({ success, msg, data }) => {
      if (success) {
        this.canSettleOptions = data;
      } else {
        this.$error(msg);
      }
    });
  },
  methods: {
    save () {
      if (this.withdrawFeeStart >= this.withdrawFeeEnd) {
        this.$error('开始金额不能大于结束金额！');
        return false;
      }
      updateSettle({
        withdraw_mode: this.withdrawMethod.join(','),
        withdraw_sill: this.withdrawLimit,
        withdraw_commission_mode: this.calculationMethod,
        withdraw_brokerage: this.withdrawFee,
        withdraw_brokerage_free_start: this.withdrawFeeStart,
        withdraw_brokerage_free_end: this.withdrawFeeEnd,
        withdraw_settlement_cycle: this.settlementDays,
        can_settle: this.canSettle,
        contribution_limit: this.contributionlimit,
        shareholder_common_proportion: this.commonproportion,
        shareholder_motao_proportion: this.motaoproportion
      }).then(({ success, msg }) => {
        if (success) {
          this.$success('保存成功!');
        } else {
          this.$error(msg);
        }
      });
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
</style>

</style>
