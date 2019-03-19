<template>
  <div class="purchasingRulessEdit">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
      <FormItem label='商品' prop='goodsName'>
        <span @click="goodsNameClick($event)">
          <Input @on-click.stop  placeholder="请选择商品名称" readonly clearable v-model="formValidate.goodsName"></Input>
        </span>
      </FormItem>
      <FormItem label="商品BOM码" prop="goodsBOMCode" v-show="formValidate.goodsName">
          <Input :maxlength="50" v-model="formValidate.goodsBOMCode" readonly placeholder="商品BOM码"></Input>
      </FormItem>
      <FormItem label="提成比例" prop="commissionRatio">
          <Input
          :maxlength="6"
          v-model="formValidate.commissionRatio"
          placeholder="请输入提成比例"
          @on-blur='handleCommission'
          style="width: 40%;"
          ></Input><span style="margin-left:1em">%</span>
      </FormItem>
      <FormItem label="封顶金额" prop="cappedAmount">
        <Input
          :maxlength="10"
          style="width: 40%;"
          v-model="formValidate.cappedAmount"
          @on-blur='handleCappedAmount'
          placeholder="请输入封顶金额">
        </Input>
      </FormItem>
      <FormItem label="商户分成比例" prop="proportion">
          <Input
          :maxlength="6"
          v-model="formValidate.proportion"
          placeholder="请输入商户分成比例"
          @on-blur='handleProportion'
          style="width: 40%;"
          ></Input><span style="margin-left:1em">%</span>
      </FormItem>
      <FormItem>
          <Button type="primary" @click="add('formValidate')" v-show="!id">新增</Button>
          <Button type="primary" @click="save('formValidate')" v-show="id">保存</Button>
      </FormItem>
    </Form>
    <Modal
      minWidth='500'
      title="选择商品"
      :value="showGoodsModal"
      :footer-hide = "true"
      style="z-index:1001;"
      @on-cancel="offGoodsModal">
      <GoodsSelect @itemSelect="goodsNameSelect"/>
    </Modal>
  </div>
</template>
<script>
import { updateItem, addItem } from './model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'PurchasingRulesEdit',
  data () {
    return {
      formValidate: {
        goodsName: '',
        goodsBOMCode: '',
        commissionRatio: 0,
        cappedAmount: 0,
        proportion: 0
      },
      ruleValidate: {
        goodsName: [
          { required: true, message: '商品名称不能为空', trigger: 'change' }
        ]
      },
      id: '',
      showGoodsModal: false
    };
  },
  methods: {
    handleCommission (e) {
      const val = e.target.value;
      const tempVal = parseFloat(val);
      this.formValidate.commissionRatio = this.$limitInputNumber(val);
      if (tempVal >= 100) {
        this.formValidate.commissionRatio = 100;
      }
      if (tempVal < 0) {
        this.formValidate.commissionRatio = 0;
      }
    },
    handleCappedAmount (e) {
      const val = e.target.value;
      const tempVal = parseFloat(val);
      this.formValidate.cappedAmount = this.$limitInputNumber(val);
      if (tempVal >= 0 && tempVal < 1) {
        this.formValidate.cappedAmount = 0;
      }
    },
    handleProportion (e) {
      const val = e.target.value;
      const tempVal = parseFloat(val);
      this.formValidate.proportion = this.$limitInputNumber(val);
      if (tempVal >= 100) {
        this.formValidate.proportion = 100;
      }
      if (tempVal < 0) {
        this.formValidate.proportion = 0;
      }
    },
    add (name) {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          addItem({
            bom_code: this.formValidate.goodsBOMCode,
            commission_rate: this.formValidate.commissionRatio,
            commission_limit: this.formValidate.cappedAmount,
            proportion: this.formValidate.proportion
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('新增成功！');
              this.setModal(false);
              this.reload();
            } else {
              this.$error(msg);
            }
          });
        } else {
          // this.$error('表单验证不正确');
        }
      });
    },
    save (name) {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          updateItem({
            id: this.id,
            bom_code: this.formValidate.goodsBOMCode,
            commission_rate: this.formValidate.commissionRatio,
            commission_limit: this.formValidate.cappedAmount,
            proportion: this.formValidate.proportion
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('保存成功!');
              this.setModal(false);
              this.reload();
            } else {
              this.$error(msg);
            }
          });
        } else {
          this.$error('表单验证不正确');
        }
      });
    },
    handleReset (name) {
      this.$refs.formValidate.resetFields();
    },
    goodsNameClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.showGoodsModal = true;
    },
    goodsNameSelect (row) {
      this.$emit('refreshGoodsList');
      this.showGoodsModal = false;
      this.formValidate.goodsName = row.goodsName;
      this.formValidate.goodsBOMCode = row.barcode;
    },
    offGoodsModal () {
      this.showGoodsModal = false;
    }
  },
  watch: {
    formData (val) {
      this.$refs.formValidate.resetFields();
      if (Object.keys(val).length > 0) {
        this.formValidate.goodsName = val.goodsName;
        this.formValidate.goodsBOMCode = val.goodsBOMCode;
        this.formValidate.commissionRatio = val.commissionRatio;
        this.formValidate.cappedAmount = val.cappedAmount;
        this.formValidate.proportion = val.proportion;
        this.id = val.id || '';
        this.activeTimeText = val.activeTime;
      } else {
        this.formValidate = {
          goodsName: '',
          goodsBOMCode: '',
          commissionRatio: 0,
          cappedAmount: 0,
          proportion: ''
        };
        this.id = '';
      }
    }
  }
};
</script>
