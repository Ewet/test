<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="地区名称" prop="districtName">
            <Input :maxlength="50" v-model="formValidate.districtName" placeholder="请输入地区名称"></Input>
        </FormItem>
        <FormItem>
            <AddBtn  @click="add('formValidate')" v-show="!formValidate.districtId"/>
            <SaveBtn @click="save('formValidate')" v-show="formValidate.districtId"/>
        </FormItem>
    </Form>
</template>
<script>
import { updateItem, addItem } from './model';

import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'ChannelManagementEdit',
  data () {
    return {
      formValidate: {
        districtName: '',
        districtId: ''
      },
      ruleValidate: {
        districtName: [
          {
            required: true, message: '地区名称不能为空', trigger: 'blur', transform (value) { return value.toString().trim(); }
          }
        ]
      }
    };
  },
  methods: {

    add (name) {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          addItem({
            district_name: this.formValidate.districtName,
            district_id: this.formValidate.districtId
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
            district_name: this.formValidate.districtName,
            district_id: this.formValidate.districtId
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
    }
    // activeTimeChange (val) {
    //   this.activeTimeText = val;
    // }
  },
  watch: {
    formData (val) {
      this.$refs.formValidate.resetFields();
      if (Object.keys(val).length > 0) {
        this.formValidate.districtName = val.districtName;
        this.formValidate.districtId = val.districtId;
      } else {
        this.formValidate = {
          districtName: '',
          districtId: ''

        };
      }
    }
  }
};
</script>
