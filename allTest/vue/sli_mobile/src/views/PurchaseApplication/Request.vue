<template>
    <StructPage>
        <Header
            slot="header"
            title="代购申请"
        />
        <div slot="content" class="purchase-application">
            <cell-group>
                <field
                    label="姓名"
                    v-model="name"
                    required
                    placeholder="请输入您的姓名"
                    :maxlength="50"
                    :error-message="nameErrorMsg"
                    @blur="nameCheck(name)"
                >
                </field>
                <!-- <field
                    label="所属商户"
                    v-model="merchantName"
                    required
                    placeholder="请输入所属商户"
                    :maxlength="50"
                    :error-message="merchantNameErrorMsg"
                    @blur="merchantNameCheck(merchantName)"
                >
                </field> -->
                 <field
                    v-model="merchantName"
                    label="所属商户"
                    placeholder="请选择所属商户"
                    readonly
                    required
                    icon="arrow"
                    class="merchant-get"
                    :class="{'has-merchant':merchantName}"
                    @click="selectTitle"
                    @click-icon="selectTitle"
                    :error-message="merchantNameErrorMsg"
                />
                <field
                    label="手机号码"
                    v-model="phone"
                    required
                    placeholder="请输入您的手机号码"
                    :maxlength="11"
                    :error-message="phoneErrorMsg"
                    @blur="phoneCheck(phone)"
                >
                </field>
                <field
                  v-model="remark"
                  label="留言"
                  type="textarea"
                  placeholder="请输入您想留下的信息"
                  rows="1"
                  :maxlength= "20"
                  :autosize="{ maxHeigth:50 }"
                />
            </cell-group>
            <popup v-model="showResult" get-container="body">
              <div class="result">
                <icon name="iclose" @click="handleClose"/>
                <div class="result-content">
                  <icon :name="resultIcon"></icon>
                  <div>
                    <p class="result-title">{{resultTitle}}</p>
                    <p>{{resultTips}}</p>
                  </div>
                </div>
                <div class="result-date">申请日期：{{requestDate}}</div>

              </div>
            </popup>
        </div>
            <Button slot="footer" class="btn" square type="default" @click="submit">提交</Button>
    </StructPage>
</template>

<script>
import { CellGroup, Field, Popup, Picker, Toast, Button, Icon } from 'vant';
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import { apply } from '@/model/purchaseApplication';
import fecha from 'fecha';
import { setItem, getItem } from 'utils/cache';
export default {
  data () {
    return {
      showResult: false,
      merchantId: this.$route.query.merchant_id || '',
      name: '',
      merchantName: this.$route.query.merchant_name || '',
      phone: '',
      remark: '',
      nameErrorMsg: '',
      merchantNameErrorMsg: '',
      phoneErrorMsg: '',
      // remarkErrorMsg: '',
      resultIcon: 'checked',
      resultTitle: '申请提交成功',
      resultTips: '我们将尽快审核您的申请'
    };
  },
  computed: {
    requestDate () {
      return fecha.format(new Date(), 'YYYY-MM-DD');
    }
  },
  mounted () {
    this.loadData();
  },
  methods: {
    handleClose () {
      this.showResult = false;
    },
    loadData () {
      let item = getItem('requestData');
      console.log(item);
      if (item) {
        this.name = item.name;
        this.phone = item.phone;
        this.remark = item.remark;
      }
      setItem('requestData', null);
      // getMerchantList({
      //   // id: this.merchantId
      //   name: 'zwz'
      // }).then(({
      //   success,
      //   data,
      //   msg
      // }) => {
      //   if (success) {
      //     this.merchantName = data.items[0].merchantName;
      //   }
      // });
    },
    // 表单验证start
    nameCheck (val) {
      if (val) {
        this.nameErrorMsg = '';
      } else {
        this.nameErrorMsg = '姓名不能为空';
      }
    },
    merchantNameCheck (val) {
      if (val) {
        this.merchantNameErrorMsg = '';
      } else {
        this.merchantNameErrorMsg = '商户名称不能为空';
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
    // remarkCheck (val) {
    //   if (val) {
    //     this.remarkErrorMsg = '';
    //   } else {
    //     this.remarkErrorMsg = '留言不能为空';
    //   }
    // },
    // 表单验证end
    selectTitle () {
      setItem('requestData', {
        name: this.name,
        phone: this.phone,
        remark: this.remark
      });
      this.$go({
        name: 'MerchantList',
        query: {}
      });
    },
    submit () {
      this.nameCheck(this.name);
      this.merchantNameCheck(this.merchantName);
      this.phoneCheck(this.phone);
      let hasFalse = this.nameErrorMsg || this.merchantNameErrorMsg || this.phoneErrorMsg;
      if (hasFalse) {
        return false;
      } else {
        apply({
          name: this.name,
          merchant_id: this.merchantId,
          mobile: this.phone,
          apply_remark: this.remark
        }).then(({success, msg, code}) => {
          if (success) {
            // Toast('新增成功！');//
            this.showResult = true;
          } else if (code === 606) {
            this.resultIcon = 'erroricon';
            this.resultTitle = '申请已提交';
            this.resultTips = '请勿重复申请！';
            this.showResult = true;
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
    Button,
    Icon,
    fecha
  },
  watch: {
    // merchantId (val) {
    //   if (val) {
    //     this.loadData();
    //   }
    // }
  }
};
</script>
<style lang="less">
@import "~@/assets/color.less";
.purchase-application {
  .van-cell--required::before {
    color: @primaryColor;
  }
  .merchant-get{
        .van-field__control{
            // width: auto;
            padding: 0 0.2rem;
            color: #BBBBBB;
            border: 1px solid #D3D3D9;
            border-radius:0.1rem;
        }
    }
    .has-merchant{
        .van-field__control{
            color: #000;
        }
    }
}
</style>
<style lang="less" scoped>
@import "~@/assets/color.less";
.purchase-application{
  .red {
    color: red;
  }
  .van-cell-group {
      margin-top: 0.2rem;
  }

  }
  .van-popup{
    border-radius:0.1rem;
  }
  .result{
    width: 5.1rem;
    height: 2.08rem;
    // border-radius: 0.2rem;
    font-size:0.19rem;
    position: relative;
    .van-icon-iclose{
      position: absolute;
      right: 0;
      top: 0;
      padding:0.1rem 0.1rem 0.2rem 0.2rem;
      font-size: 0.4rem;
      opacity:0.43;
      color: #000;
    }
    .result-content{
      height: 1.2rem;
      padding-top:0.39rem;
      display: flex;
      justify-content: center;
      p{
        margin:0;
        padding:0;
        line-height:0.6rem;
        color:#5F5F5F;
      }
      .van-icon{
        font-size: 1.11rem;
        color: @primaryColor;
        margin-right:0.26rem;
      }
      .van-icon-erroricon{
        margin-top:-0.1rem;
      }
      .result-title{
        font-size:0.36rem;
      }

    }
    .result-date{
      margin-top:0.1rem;
      text-align:center;
      color:#A2A1A1;
    }

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
