<template>
    <StructPage>
        <Header
            slot="header"
            title="发票抬头管理"
        />
        <div slot="content" class="invoice-message">
            <cell-group>
                <field
                    v-model="typeFormat"
                    label="发票类型"
                    readonly
                    required
                    icon="edit"
                    class="invoice-header"
                    @click-icon="showPicker=true"
                    @click="showPicker=true"
                />
                <field
                    label="发票抬头"
                    v-model="titleName"
                    required
                    placeholder="请输入发票抬头"
                    :maxlength="50"
                    :error-message="titleNameErrorMsg"
                    @blur="titleNameCheck(titleName)"
                >
                <!-- <span :class="{red: noTitleName}" slot="label">发票抬头</span> -->
                </field>
            <div v-show="typeFormat==='企业(单位)'">
                <field
                    label="纳税人号"
                    v-model="taxNum"
                    required
                    placeholder="请输入纳税人号"
                    :maxlength="50"
                    :error-message="taxNumErrorMsg"
                    @keyup="taxNum=taxNum.replace(/[^A-Za-z0-9]/g, '')"
                    @blur="taxNumCheck(taxNum)"
                >
                <!-- <span :class="{red: noTaxNum}" slot="label">纳税人号</span> -->
                </field>
                <field
                    label="电话"
                    v-model="phone"
                    required
                    placeholder="请输入电话"
                    :maxlength="11"
                    :error-message="phoneErrorMsg"
                    @blur="phoneCheck(phone)"
                >
                <!-- <span class="word-space" :class="{red: noPhone}" slot="label">电话</span> -->
                </field>
                <!-- <field
                    label="单位地址"
                    v-model="companyAddress"
                    placeholder="请输入单位地址"
                    :maxlength="100"
                    error-message="单位地址错误"
                >
                </field>
                <field
                    v-model="bankName"
                    label="银行名称"
                    placeholder="请输入银行名称"
                    :maxlength="50"
                    error-message="手机号格式错误"
                />
                <field
                    v-model="bankAccount"
                    label="银行账号"
                    placeholder="请输入银行账号"
                    :maxlength="19"
                    error-message="手机号格式错误"
                    @blur="bankAccountCheck(bankAccount)"
                /> -->
            </div>
            </cell-group>

        </div>
        <div slot="footer" class="footer">
          <Button class="btn" square type="default" @click="edit" v-if="titleId">保存</Button>
          <Button class="btn" square type="default" @click="add" v-else>新增</Button>
          <popup
                v-model="showPicker"
                position="bottom"
                :overlay="true"
                :close-on-click-overlay="false">
                <picker
                    show-toolbar
                    :columns="columns"
                    :visible-item-count="3"
                    @confirm="onConfirm"
                    @cancel="onCancel"
                />
            </popup>
        </div>
    </StructPage>
</template>

<script>
import { CellGroup, Field, Popup, Picker, Toast, Button } from 'vant';
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import { addItem, modifyItem, getTitleItem } from '@/model/invoiceModel';
// import { checkPhone } from '@/utils/validate';
export default {
  data () {
    return {
      orderSn: this.$route.query.order_sn,
      titleId: this.$route.query.title_id || '',
      showPicker: false,
      columns: ['个人', '企业(单位)'],
      type: 2,
      typeFormat: '企业(单位)',
      titleName: '',
      taxNum: '',
      phone: '',
      titleNameErrorMsg: '',
      taxNumErrorMsg: '',
      phoneErrorMsg: ''
      // companyAddress: '',
      // bankName: '',
      // bankAccount: ''
    };
  },
  computed: {
    // noTitleName () {
    //   return !this.titleNameErrorMsg && this.isChecked;
    // },
    // noTaxNum () {
    //   return !this.taxNumErrorMsg && this.isChecked;
    // },
    // noPhone () {
    //   return !this.phoneErrorMsg && this.isChecked;
    // }
    // noCompanyAddress () {
    //   return !this.companyAddress && this.isChecked;
    // }
  },
  mounted () {
    this.loadData();
  },
  methods: {
    loadData () {
      if (this.titleId) {
        this.$showSpin();
        getTitleItem(this.titleId).then(result => {
          if (result.success) {
            let data = result.data;
            this.type = data.type;
            this.typeFormat = data.typeFormat;
            this.titleName = data.titleName;
            this.taxNum = data.taxNum;
            this.phone = data.phone;
            // this.companyAddress = data.companyAddress;
            // this.bankName = data.bankName;
            // this.bankAccount = data.bankAccount;
          } else if (result.code !== 401) {
            Toast(result.msg);
          }
          this.$hideSpin();
        });
      }
    },
    onConfirm (value, index) {
      this.typeFormat = value;
      this.type = index + 1;
      this.showPicker = false;
    },
    onCancel () {
      this.showPicker = false;
    },
    // 表单验证start
    titleNameCheck (val) {
      if (val) {
        this.titleNameErrorMsg = '';
      } else {
        this.titleNameErrorMsg = '发票抬头不能为空';
      }
    },
    taxNumCheck (val) {
      if (val) {
        this.taxNumErrorMsg = '';
      } else {
        this.taxNumErrorMsg = '纳税人号不能为空';
      }
    },
    phoneCheck (val) {
      if (val) {
        let myreg = /^(([1][3,4,5,6,7,8,9][0-9]{9})|([9][2,8][0-9]{9}))$/;
        if (!myreg.test(val)) {
          this.phoneErrorMsg = '电话号码格式不正确';
        } else {
          this.phoneErrorMsg = '';
        }
      } else {
        this.phoneErrorMsg = '电话号码不能为空';
      }
    },
    // bankAccountCheck (val) {
    //   let checkResult = checkBankNo(val);
    //   if (!checkResult.status) {
    //     Toast(checkResult.msg);
    //   }
    // },
    // 表单验证end
    edit () {
      this.titleNameCheck(this.titleName);
      if (this.type === 2) {
        this.taxNumCheck(this.taxNum);
        this.phoneCheck(this.phone);
      }
      let personal = this.titleNameErrorMsg;
      let company = this.titleNameErrorMsg || this.taxNumErrorMsg || this.phoneErrorMsg;

      if (this.type === 1 ? personal : company) {
        return false;
      } else {
        let formData = {
          title_id: this.titleId,
          type: this.type,
          name: this.titleName
        };
        if (this.type === 2) {
          formData.tax_number = this.taxNum;
          formData.phone = this.phone;
        }
        modifyItem(formData).then(({success, msg}) => {
          if (success) {
            // Toast('保存成功！');
            this.$go({
              name: 'InvoiceHeaderList',
              query: {
                order_sn: this.orderSn
              }
            });
          } else {
            Toast(msg);
          }
        });
      }
    },
    add () {
      this.titleNameCheck(this.titleName);
      if (this.type === 2) {
        this.taxNumCheck(this.taxNum);
        this.phoneCheck(this.phone);
      }
      let personal = this.titleNameErrorMsg;
      let company = this.titleNameErrorMsg || this.taxNumErrorMsg || this.phoneErrorMsg;
      if (this.type === 1 ? personal : company) {
        return false;
      } else {
        let formData = {
          type: this.type,
          name: this.titleName
        };
        if (this.type === 2) {
          formData.tax_number = this.taxNum;
          formData.phone = this.phone;
        }
        addItem(formData
        ).then(({success, msg}) => {
          if (success) {
            this.$go({
              name: 'InvoiceHeaderList',
              query: {
                order_sn: this.orderSn
              }
            });
          } else {
            Toast(msg);
          }
        });
      }
    }
  },
  components: {
    StructPage,
    Header,
    Field,
    CellGroup,
    Popup,
    Picker,
    Toast,
    Button
  }
};
</script>
<style lang="less">
@import "~@/assets/color.less";
.invoice-message {
  // .invoice-header {
  //   .van-field__control {
      // width: 3rem;
      // padding: 0 0.2rem;
      // border: 1px solid #d3d3d9;
      // border-radius: 0.1rem;
    // }
  // }

  .van-cell--required::before {
    color: @primaryColor;
  }
}
.footer{
  .van-picker__toolbar {
    background: #fff;
  }
  .van-picker__cancel,
  .van-picker__confirm {
    color: @primaryColor;
    font-size: 0.3rem;
  }
  .van-picker-column__item {
    color: @primaryColor;
    font-size: 0.38rem;
    opacity: 0.5;
  }
  .van-picker-column__item--selected {
    opacity: 1;
  }
}
</style>
<style lang="less" scoped>
@import "~@/assets/color.less";
.van-picker {
  height: 3.5rem;
  background: #d3d3d9;
}
.red {
  color: red;
}
.word-space{
    letter-spacing:0.56rem;
}
.btn {
  width: 100%;
  height: 0.98rem;
  font-size: 0.32rem;
  line-height: 0.98rem;
  background: @primaryColor;
  color: #ffffff;
}
</style>
