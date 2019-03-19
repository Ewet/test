<template>
    <Form class="formValidateBox" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
        <FormItem label="手机号码" prop="mobileAdd"  v-show="Object.keys(formData).length<=0">
            <Select
                ref="selectEl"
                filterable
                remote
                :remote-method="seleteItem"
                :loading="isLoad"
                placeholder="请输入手机号码"
                v-model="formValidate.mobileAdd"
                 @on-change="confirm"
                >
                <Option v-for="(option, index) in options" :value="option.mobileAdd" :key="index">{{option.mobileAdd}}</Option>
            </Select>
        </FormItem>
        <FormItem label="手机号" prop="mobileEdit"  v-show="Object.keys(formData).length > 0">
            <Input :maxlength="20" v-model="formValidate.mobileEdit" placeholder="请输入手机号码"></Input>
        </FormItem>
        <FormItem label="代购员姓名" prop="name">
            <Input :maxlength="50" v-model="formValidate.name" placeholder="请输入代购员姓名"></Input>
        </FormItem>
        <FormItem label="微信名称" prop="nickname">
            <Input :disabled="isDisabled" :maxlength="50" v-model="formValidate.nickname" placeholder="请输入微信名称"></Input>
        </FormItem>
        <FormItem label="所属商户" prop="merchantId">
            <Select
                ref="selectMerchant"
                filterable
                remote
                :remote-method="selectMerchant"
                :loading="isLoadMerchant"
                placeholder="请输入所属商户"
                v-model="formValidate.merchantId"
                @on-change="confirmMerchant"
                @on-open-change="merchantCheck"
                >
                <Option v-for="(option, index) in optionsMerchant" :value="option.value" :key="index">{{option.label}}</Option>
            </Select>
        </FormItem>
        <div class="titleBox">
          <h6>代购范围（增加其他商户盒子代购权限）</h6>
          <Button @click="setShowBoxModal(true);" type="primary" size="small" slot="right">添加盒子</Button>
        </div>
        <Table height="180"  border :columns="columns" :data="formValidate.itemList" :loading="isLoading"></Table>
        <p class="all">共{{formValidate.itemList.length}}条</p>
        <div class="btnBox">
            <Button v-show="Object.keys(formData).length<=0" type="primary" @click="add()" >新增</Button>
            <Button  v-show="Object.keys(formData).length>0"  type="primary" @click="save()">保存</Button>
            <Button type="primary" @click="setModal(false)">取消</Button>
        </div>
        </Form>
</template>
<script>
import {
  updateItem, addItem, getMemberList, getMerchantList
} from './model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'PurchasingManagementEdit',
  components: {
  },
  data () {
    const mobileAddCheck = (rule, value, callback) => {
      if (Object.keys(this.formData).length <= 0) {
        const v = this.$refs.selectEl.query;
        this.options = this.getOptions(v);
        const len = this.options.length;
        const myreg = /^(([1][3,4 ,5,6,7,8,9][0-9]{9})|([9][2,8][0-9]{9}))$/;
        if (this.trim(v) === '' || v == null) {
          callback(new Error('手机号码不能为空'));
        } else if (!myreg.test(v)) {
          callback(new Error('手机号码格式不对'));
        } else if (len <= 0) {
          callback(new Error('用户不存在'));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const mobileEditCheck = (rule, value, callback) => {
      if (Object.keys(this.formData).length > 0) {
        // let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        const myreg = /^(([1][3,4,5,6,7,8,9][0-9]{9})|([9][2,8][0-9]{9}))$/;
        if (this.trim(value) === '' || value == null) {
          callback(new Error('手机号码不能为空'));
        } else if (!myreg.test(value)) {
          callback(new Error('手机号码格式不对'));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    const merchantIdCheck = (rule, value, callback) => {
      const v = this.$refs.selectMerchant.query;
      const len = this.optionsMerchant.length;
      if (this.trim(v) === '' || v == null) {
        callback(new Error('所属商户不能为空'));
      } else if (len <= 0) {
        callback(new Error('商户不存在'));
      } else {
        callback();
      }
    };
    return {
      isEdit: true, // 当前是否是第一次编辑
      isDisabled: false, // 是否禁用
      isLoad: false,
      isLoadMerchant: false, //
      optionData: [], // 会员列表
      options: [], // 下拉会员列表数据(会员列表)
      optionMerchantData: [], // 商户列表
      optionsMerchant: [], // 下拉商户列表数据(商户列表)
      formValidate: {
        name: '', // 补货员姓名
        mobileAdd: '', // 手机号(新增)
        mobileEdit: '', // 手机号(编辑)
        nickname: '', // 微信昵称
        wxuserId: '', // 微信用户id
        merchantId: '', // 所属商户Id
        itemList: [], // 代购范围
        id: ''
      },
      ruleValidate: {
        mobileEdit: [
          { required: true, validator: mobileEditCheck, trigger: 'blur' }
        ],
        mobileAdd: [
          { required: true, validator: mobileAddCheck, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '代购员姓名不能为空', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '微信名称不能为空', trigger: 'blur' }
        ],
        merchantId: [
          { required: true, validator: merchantIdCheck, trigger: 'blur' }
        ]
      },
      columns: [
        {
          title: '序号',
          type: 'index',
          minWidth: 10,
          align: 'center'
        },
        {
          title: '商户名称',
          key: 'merchantName',
          minWidth: 80
        },
        {
          title: '盒子编码',
          key: 'boxNo',
          minWidth: 80
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 30,
          align: 'center',
          fixed: 'right',
          render: (h, params) => h('div', [
            h('DelBtn', {
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.remove(params.index);
                }
              }
            }, '删除')
          ])
        }
      ]
    };
  },
  mounted () {
    this.inintOptions();
    this.inintMerchantOptions();
  },
  methods: {
    // 去掉字符串两边空格
    trim (str) {
      if (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
      }
      return str;
    },
    // 校验商户
    merchantCheck () {
      this.$refs.formValidate.validateField('merchantId');
    },
    getOptions (str) {
      return this.optionData.filter((item) => {
        if (item.mobileAdd) {
          if (item.mobileAdd.indexOf(str) > -1) {
            return item;
          }
        }
      });
    },
    // 点击手机号选项
    confirm (v) {
      if (v) {
        this.$refs.formValidate.resetFields();
        let arr = this.optionData;
        const itemList = this.formValidate.itemList;// 代购范围
        const merchantId = this.formValidate.merchantId;// 所属商户Id
        arr = arr.filter(item => item.mobileAdd === v);
        this.isDisabled = true;
        this.formValidate = {
          name: arr[0].name, // 补货员姓名
          mobileAdd: arr[0].mobileAdd, // 手机号(新增)
          mobileEdit: '', // 手机号(编辑)
          nickname: arr[0].nickname, // 微信昵称
          wxuserId: arr[0].weChatID, // 微信用户id
          merchantId, // 所属商户Id
          itemList, // 代购范围
          id: ''
        };
      }
    },
    confirmMerchant (v) {
    },
    // 手机搜索
    seleteItem (query) {
      if (query !== '') {
        this.options = this.optionData.filter((item) => {
          if (item.mobileAdd) {
            if (item.mobileAdd.indexOf(query) > -1) {
              if (item.mobileAdd === query) {
                this.$refs.formValidate.resetFields();
                this.isDisabled = true;
                const itemList = this.formValidate.itemList;// 代购范围
                const merchantId = this.formValidate.merchantId;// 所属商户Id
                this.formValidate = {
                  name: item.name, // 补货员姓名
                  mobileAdd: item.mobileAdd, // 手机号(新增)
                  mobileEdit: '', // 手机号(编辑)
                  nickname: item.nickname, // 微信昵称
                  wxuserId: item.weChatID, // 微信用户id
                  merchantId, // 所属商户Id
                  itemList, // 代购范围
                  id: ''
                };
              }
              return item;
            }
          }
        });
      } else {
        this.$refs.selectEl.query = '';
        this.options = [];
      }
    },
    // 商户搜索
    selectMerchant (query) {
      if (query !== '') {
        if (this.optionMerchantData.length > 0) {
          this.optionsMerchant = this.optionMerchantData.filter((item) => {
            if (item.label) {
              if (item.label.indexOf(query) > -1) {
                if (item.label === query) {
                  this.formValidate.merchantId = item.value;// 所属商户Id
                }
                return item;
              } if (item.value.indexOf(query) > -1) {
                if (item.value === query) {
                  this.formValidate.merchantId = item.value;// 所属商户Id
                }
                return item;
              }
            }
          });
        }
      } else {
        this.optionsMerchant = [];
      }
    },
    remove (index) {
      const itemList = [...this.formValidate.itemList];
      itemList.splice(index, 1);
      this.formValidate.itemList = itemList;
    },
    add () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          const boxIdArr = this.getBoxId(this.formValidate.itemList);
          addItem({
            name: this.formValidate.name, // 补货员姓名
            mobile: this.formValidate.mobileAdd, // 手机号
            wxuser_id: this.formValidate.wxuserId, // 微信昵称
            merchant_id: this.formValidate.merchantId, // 所属商户Id
            extraBoxs: boxIdArr // 关联的盒子id,数据格式为数组
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('新增成功！');
              this.setModal(false);
              this.reloadFn();
            } else {
              this.$error(msg);
            }
          });
        } else {
        }
      });
    },
    // 保存
    save () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          const boxIdArr = this.getBoxId(this.formValidate.itemList);
          updateItem({
            name: this.formValidate.name, // 补货员姓名
            mobile: this.formValidate.mobileEdit, // 手机号
            wxuser_id: this.formValidate.wxuserId, // 微信昵称
            merchant_id: this.formValidate.merchantId, // 所属商户Id
            extraBoxs: boxIdArr // 关联的盒子id,数据格式为数组
            // id: this.formValidate.id
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('保存成功!');
              this.setModal(false);
              this.reloadFn();
            } else {
              this.$error(msg);
            }
          });
        } else {
        }
      });
    },

    // 刷新
    reloadFn () {
      this.reload();
    },
    // 最近一周时间
    getRecentTime () {
      const nowTime = new Date().setHours(0, 0, 0, 0);
      const tomorrowTime = nowTime + 24 * 60 * 60 * 1000;
      const lastTime = nowTime - 7 * 24 * 60 * 60 * 1000;
      return [this.$formatTime(lastTime), this.$formatTime(tomorrowTime)];
    },

    // 获取盒子Id
    getBoxId (dataArr) {
      const arr = [];
      for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i].boxId) {
          arr.push(dataArr[i].boxId);
        }
      }
      return arr;
    },

    // 加载会员列表
    inintOptions () {
      getMemberList().then((res) => {
        if (res.success) {
          if (res.data.items.length < 0) {
            this.formValidate = {
              name: '', // 补货员姓名
              mobileAdd: '', // 手机号(新增)
              mobileEdit: '', // 手机号(编辑)
              nickname: '', // 微信昵称
              merchantId: '', // 所属商户Id
              itemList: [], // 代购范围
              id: ''
            };
            return false;
          }
          this.optionData = res.data.items;
        } else {

        }
      }, (error) => {
        console.log(error);
      });
    },

    // 加载商户列表
    inintMerchantOptions () {
      getMerchantList().then((res) => {
        if (res.success) {
          this.optionMerchantData = res.data.items;
        } else {
        }
      }, (error) => {
        console.log(error);
      });
    }

  },
  watch: {
    showModal (val) {
      if (!val) {
        this.setFormData({});
      }
    },
    boxRow (val) {
      if (Object.keys(val).length > 0) {
        let ffNo = true;
        const itemList = [...this.formValidate.itemList];
        for (let i = 0; i < itemList.length; i++) {
          if (itemList[i].boxNo === val.boxNo) {
            this.$error('盒子已存在!');
            ffNo = false;
            break;
          }
        }
        if (ffNo) {
          itemList.push(val);
          this.formValidate.itemList = itemList;
        }
      }
    },
    formData (val) {
      this.$refs.formValidate.resetFields();
      if (Object.keys(val).length > 0) {
        this.isEdit = true;
        this.formValidate.name = val.name;
        this.formValidate.mobileEdit = val.mobile;
        this.formValidate.nickname = val.nickname;
        this.formValidate.wxuserId = val.wxuserId;
        this.formValidate.itemList = val.itemList;
        this.formValidate.id = val.id || '';
        this.isDisabled = true;
        this.optionsMerchant = [
          { value: val.merchantId, label: val.merchant }
        ];
        this.formValidate.merchantId = val.merchantId;
      } else {
        this.formValidate = {
          name: '', // 补货员姓名
          mobileAdd: '', // 手机号(新增)
          mobileEdit: '', // 手机号(编辑)
          nickname: '', // 微信昵称
          wxuserId: '', // 微信用户id
          merchantId: '', // 所属商户Id
          itemList: [], // 代购范围
          id: ''
        };
        this.$refs.selectMerchant.query = '';
        this.optionsMerchant = [];
        this.isDisabled = false;
      }
    }
  }
};
</script>

<style lang="less">
.formValidateBox{
  .titleBox{
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #dddee1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h6{
      height: 100%;
      line-height: 100%;
      font-size: 14px;
    }
  }
  .ivu-table-cell{
    white-space: nowrap !important;
  }
  .ivu-table td, .ivu-table th{
        height: 30px !important;
  }
  .all{
    margin: 10px 0 0 0;
    text-align: right;
    padding: 0;
    font-size: 12px;
  }
  .btnBox{
    text-align: left;
  }
}

</style>
