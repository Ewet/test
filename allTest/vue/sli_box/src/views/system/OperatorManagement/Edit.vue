<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
        <FormItem label="运营商名称" prop="name" >
            <Input
            :maxlength="50"
            v-model="formValidate.name"
            placeholder="请输入运营商名称"></Input>
        </FormItem>
        <FormItem label="运营商编号" prop="operatorNo" >
            <Input
            :maxlength="50"
            v-model="formValidate.operatorNo"
            placeholder="请输入运营商编号"></Input>
        </FormItem>
        <FormItem label="法人代表" prop="legal" >
            <Input
            :maxlength="10"
            v-model="formValidate.legal"
            placeholder="请输入法人代表"></Input>
        </FormItem>
        <FormItem label="地址" prop="address" >
            <Input
            :maxlength="200"
            v-model="formValidate.address"
            placeholder="请输入地址"></Input>
        </FormItem>
        <FormItem label="管理员" prop="administrator" >
            <Input
            :maxlength="20"
            v-model="formValidate.administrator"
            placeholder="请输入管理员"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="phone" >
            <Input
            :maxlength="20"
            v-model="formValidate.phone"
            placeholder="请输入联系电话"></Input>
        </FormItem>
        <FormItem>
            <AddBtn @click="add()" v-show="Object.keys(formData).length<=0"/>
            <SaveBtn @click="save()" v-show="Object.keys(formData).length > 0"/>
        </FormItem>
        </Form>
</template>
<script>
import { updateItem, addItem } from './model';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    const phoneCheck = (rule, value, callback) => {
      if (this.trim(value) === '' || value === null) {
        callback(new Error('联系电话不能为空'));
      } else {
        const myreg = /^(([1][3,4,5,6,7,8,9][0-9]{9})|([9][2,8][0-9]{9})|((\d{3,4}-)?\d{7,8}))$/;
        if (!myreg.test(value)) {
          callback(new Error('电话号码格式不对'));
        } else {
          callback();
        }
      }
    };
    return {
      formValidate: {
        name: '',
        legal: '',
        address: '',
        administrator: '',
        phone: '',
        operatorNo: '',
        id: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '运营商名称不能为空', trigger: 'blur' }
        ],
        operatorNo: [
          { required: true, message: '运营商编号不能为空', trigger: 'blur' }
        ],
        legal: [
          { required: true, message: '法人代表不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
        administrator: [
          { required: true, message: '管理员不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: phoneCheck, trigger: 'blur' }
        ]
      }
    };
  },
  mounted () {
  },
  methods: {
    // 去掉字符串两边空格
    trim (str) {
      if (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
      }
      return str;
    },

    // 保存添加运营商
    add () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          addItem({
            name: this.trim(this.formValidate.name), // 运营商名称
            legal_person: this.trim(this.formValidate.legal), // 法人代表
            address: this.trim(this.formValidate.address), // 地址
            contact_name: this.trim(this.formValidate.administrator), // 联系人
            contact_phone: this.trim(this.formValidate.phone), // 联系电话
            operator_no: this.trim(this.formValidate.operatorNo) // 运营编号
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('新增成功！');
              this.setModal(false);
              this.reload();
              this.$refs.formValidate.resetFields();
              this.formValidate = {
                name: '',
                legal: '',
                address: '',
                administrator: '',
                phone: '',
                operatorNo: '',
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
    // 保存编辑运营商资料
    save () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          updateItem({
            name: this.trim(this.formValidate.name), // 运营商名称
            legal_person: this.trim(this.formValidate.legal), // 法人代表
            address: this.trim(this.formValidate.address), // 地址
            contact_name: this.trim(this.formValidate.administrator), // 联系人
            contact_phone: this.trim(this.formValidate.phone), // 联系电话
            operator_no: this.trim(this.formValidate.operatorNo), // 运营编号
            operator_id: this.trim(this.formValidate.id) // 运营商ID
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
    }

  },
  watch: {
    formData (val) {
      this.$refs.formValidate.resetFields();
      if (Object.keys(val).length > 0) {
        this.formValidate.name = this.formData.name;
        this.formValidate.legal = this.formData.legal;
        this.formValidate.address = this.formData.address;
        this.formValidate.administrator = this.formData.administrator;
        this.formValidate.phone = this.formData.phone;
        this.formValidate.operatorNo = this.formData.operatorNo;
        this.formValidate.id = this.formData.id;
      } else {
        this.formValidate = {
          name: '',
          legal: '',
          address: '',
          administrator: '',
          phone: '',
          operatorNo: '',
          id: ''
        };
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
