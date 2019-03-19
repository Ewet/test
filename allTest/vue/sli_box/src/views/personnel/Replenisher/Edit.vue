<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
        <FormItem  v-show="formValidate.id"  label="" class="wxImgRow" >
            <div class="wxImg">
              <img :src="formValidate.avatar" >
            </div>
        </FormItem>
        <FormItem  v-show="Object.keys(formData).length>0||formValidate.id"   label="微信ID" prop="weChatID" >
            <Input disabled
            v-model="formValidate.weChatID"
            placeholder="请输入微信ID"></Input>
        </FormItem>
        <FormItem label="手机号码" prop="phone"  v-show="Object.keys(formData).length<=0">
            <Select
                ref="selectEl"
                filterable
                remote
                :remote-method="seleteItem"
                :loading="isLoad"
                placeholder="请输入手机号码"
                v-model="formValidate.phone"
                 @on-change="confirm"
                >
                <Option v-for="(option, index) in options" :value="option.phone" :key="index">{{option.phone}}</Option>
            </Select>
        </FormItem>
        <FormItem  label="微信名称" prop="weChatName">
            <Input
            :maxlength="50"
            :disabled="isDisabled"
            v-model="formValidate.weChatName"
            placeholder="请输入微信名称" ></Input>
        </FormItem>
        <FormItem label="手机号码" prop="phone2"  v-show="Object.keys(formData).length > 0">
            <Input
            v-model="formValidate.phone2"

            placeholder="请输入手机号码"></Input>
        </FormItem>
        <FormItem label="补货员姓名" prop="name" >
            <Input
            :maxlength="50"
            v-model="formValidate.name"
            placeholder="请输入补货员姓名"></Input>
        </FormItem>
        <FormItem class="formBtn">
            <Button type="primary" @click="add()" v-show="Object.keys(formData).length<=0">新增</Button>
            <Button type="primary" @click="save()" v-show="Object.keys(formData).length > 0">保存</Button>
        </FormItem>
        </Form>
</template>
<script>
import { updateItem, addItem, getMemberList } from 'views/personnel/Replenisher/model';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  // mixins: [vuexMixins({moduleName: 'replenisher'})],
  data () {
    const phoneCheck = (rule, value, callback) => {
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
    const phoneCheck2 = (rule, value, callback) => {
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
    return {
      isDisabled: false,
      optionData: [],
      isLoad: false,
      options: [],
      formValidate: {
        weChatID: '',
        weChatName: '',
        name: '',
        phone: '',
        phone2: '',
        avatar: '',
        id: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '补货员姓名不能为空', trigger: 'blur' }
        ],
        phone2: [
          { required: true, validator: phoneCheck2, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: phoneCheck, trigger: 'blur' }
        ],
        weChatID: [
          { required: true, message: '微信ID不能为空', trigger: 'blur' }
        ],
        weChatName: [
          { required: true, message: '微信名称不能为空', trigger: 'blur' }

        ]
      }
    };
  },
  mounted () {
    this.inintOptions();
  },
  methods: {
    // 去掉字符串两边空格
    trim (str) {
      if (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
      }
      return str;
    },
    // 点击昵称选项
    confirm (v) {
      if (v) {
        this.$refs.formValidate.resetFields();
        let arr = this.optionData;
        arr = arr.filter(item => item.phone === v);
        this.isDisabled = true;
        this.formValidate = {
          weChatID: arr[0].weChatID,
          weChatName: arr[0].weChatName,
          name: arr[0].name,
          phone: arr[0].phone,
          avatar: arr[0].avatar,
          id: arr[0].id
        };
      }
    },

    getOptions (str) {
      return this.optionData.filter((item) => {
        if (item.phone) {
          if (item.phone.indexOf(str) > -1) {
            return item;
          }
        }
      });
    },
    seleteItem (query) {
      if (query !== '') {
        this.options = this.optionData.filter((item) => {
          if (item.phone) {
            if (item.phone.indexOf(query) > -1) {
              if (item.phone === query) {
                this.$refs.formValidate.resetFields();
                this.isDisabled = true;
                this.formValidate = {
                  weChatID: item.weChatID,
                  weChatName: item.weChatName,
                  name: item.name,
                  phone: item.phone,
                  phone2: '',
                  avatar: item.avatar,
                  id: item.id
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
    // 保存添加补货员
    add () {
      this.$refs.formValidate.validate((valid) => {
        console.log(333);
        if (valid) {
          addItem({
            wxuser_id: this.trim(this.formValidate.weChatID),
            name: this.trim(this.formValidate.name),
            mobile: this.trim(this.formValidate.phone),
            user_id: this.trim(this.formValidate.id)
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('新增成功！');
              this.setModal(false);
              this.reload();
              this.$refs.formValidate.resetFields();
              this.weChatName = '';
              this.options = [];
              this.formValidate = {
                weChatID: '',
                weChatName: '',
                name: '',
                phone: '',
                phone2: '',
                avatar: '',
                id: ''
              };
            } else {
              this.$error(msg);
            }
          });
        } else {
        }
      });
    },
    // 保存编辑资料
    save () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          updateItem({
            user_id: this.formValidate.id,
            name: this.formValidate.name,
            mobile: this.formValidate.phone2
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('保存成功!');
              this.setModal(false);
              this.reload();
              this.$refs.formValidate.resetFields();
              this.formValidate = {};
            } else {
              this.$error(msg);
            }
          });
        } else {
        }
      });
    },

    handleReset (name) {
      this.$refs.formValidate.resetFields();
    },
    // 加载会员列表
    inintOptions () {
      getMemberList().then((res) => {
        if (res.success) {
          if (res.data.items.length < 0) {
            this.formValidate = {
              weChatID: '',
              weChatName: '',
              name: '',
              phone: '',
              avatar: '',
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
    }

  },
  watch: {
    formData (val) {
      console.log(val);
      this.$refs.formValidate.resetFields();
      if (Object.keys(val).length > 0) {
        this.formValidate.weChatID = this.formData.weChatID;
        this.formValidate.weChatName = this.formData.weChatName;
        this.formValidate.name = this.formData.name;
        this.formValidate.phone2 = this.formData.phone;
        this.formValidate.avatar = this.formData.avatar;
        this.formValidate.id = this.formData.id;
        this.options = [
          { phone: this.formData.phone }
        ];
        this.isDisabled = true;
      } else {
        this.formValidate = {
          weChatID: '',
          weChatName: '',
          name: '',
          phone: '',
          phone2: '',
          avatar: '',
          id: ''
        };
        this.options = [];
        this.$refs.selectEl.query = '';
        this.isDisabled = false;
      }
    }
  },
  components: {

  },
  computed: {

  }
};
</script>
<style lang="less">
.ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background-color: #fff;
}
</style>
<style lang="less" scoped>
.formBtn{
  text-align:right;
}
.wxImgRow{

}
.wxImg{
  width: 100px;
  height: 100px;
  margin:0 auto;
}
.wxImg>img{
  display: block;
  width:100%;
  height: 100%;
  margin-left: -50px;
  border-radius:50%;
}

</style>
