<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
        <FormItem label="IP地址" prop="IPAddress" >
            <Input
            v-model="formValidate.IPAddress"
            placeholder="请输入IP地址"></Input>
        </FormItem>
        <FormItem label="硬件版本" prop="version" >
            <Input
            v-model="formValidate.version"

            placeholder="请输入硬件版本"></Input>
        </FormItem>
        <FormItem class="formBtn">
            <AddBtn @click="add()" v-show="!formValidate.id"/>
            <SaveBtn @click="save()" v-show="formValidate.id"/>
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
    const IPAddressCheck = (rule, value, callback) => {
      if (this.trim(value) === '' || value === null) {
        callback(new Error('IP地址不能为空'));
      } else {
        const myreg = /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$/;
        if (!myreg.test(value)) {
          callback(new Error('IP地址格式不对'));
        } else {
          callback();
        }
      }
    };
    const versionCheck = (rule, value, callback) => {
      if (this.trim(value) === '' || value === null) {
        callback(new Error('硬件版本不能为空'));
      } else {
        const len = this.trim(value).length;
        if (len > 10) {
          callback(new Error('硬件版本不能超过十位'));
        } else {
          callback();
        }
      }
    };
    return {
      formValidate: {
        IPAddress: '',
        version: '',
        id: ''
      },
      ruleValidate: {
        IPAddress: [
          { required: true, validator: IPAddressCheck, trigger: 'blur' }
        ],
        version: [
          { required: true, validator: versionCheck, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 去掉字符串两边空格
    trim (str) {
      if (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
      }
      return str;
    },

    // 保存添加补货员
    add () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          const boxId = this.$store.state.boxManagement.boxId;
          addItem({
            box_id: boxId,
            ip_address: this.trim(this.formValidate.IPAddress),
            hw_version: this.trim(this.formValidate.version)
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('新增成功！');
              this.setModal(false);
              this.reload();
              this.$refs.formValidate.resetFields();
              this.formValidate = {
                IPAddress: '',
                version: '',
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
            mcb_id: this.formValidate.id,
            ip_address: this.formValidate.IPAddress,
            hw_version: this.formValidate.version
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('保存成功!');
              this.setModal(false);
              this.reload();
              this.setFormData({});
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
        this.formValidate.IPAddress = val.IPAddress;
        this.formValidate.version = val.version;
        this.formValidate.id = val.id;
      } else {
        this.formValidate = {
          IPAddress: '',
          version: '',
          id: ''

        };
      }
    }
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
</style>
