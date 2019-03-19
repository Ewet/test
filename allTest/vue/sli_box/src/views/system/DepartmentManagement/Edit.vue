<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="部门名称" prop="departmentName">
            <Input :maxlength="12" v-model="formValidate.departmentName" placeholder="请输入部门名称"></Input>
        </FormItem>
        <FormItem>
            <AddBtn @click="add('formValidate')" v-show="!id"/>
            <SaveBtn @click="save('formValidate')" v-show="id"/></FormItem>
        </Form>
</template>
<script>
import { updateItem, addItem } from './model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'DepartmentManagementEdit',
  data () {
    return {
      formValidate: {
        departmentName: ''
      },
      ruleValidate: {
        departmentName: [
          {
            required: true, message: '部门名称不能为空', trigger: 'blur', transform: value => value.toString().trim()
          },
          {
            type: 'string', min: 3, max: 20, message: '部门名称必须3～20个字符', trigger: 'blur'
          }
        ]
      },
      id: ''
    };
  },
  methods: {
    add (name) {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          addItem({
            dep_name: this.formValidate.departmentName
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
            dep_name: this.formValidate.departmentName
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
  },
  watch: {
    formData (val) {
      this.$refs.formValidate.resetFields();
      if (Object.keys(val).length > 0) {
        this.formValidate.departmentName = val.departmentName;
        this.id = val.id || '';
      } else {
        this.formValidate = {
          departmentName: ''
        };
        this.id = '';
      }
    }
  }
};
</script>
