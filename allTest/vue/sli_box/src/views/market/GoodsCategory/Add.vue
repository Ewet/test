<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="分类名称" prop="cateName">
            <Input :maxlength="12" v-model="formValidate.cateName" placeholder="请输入分类名称"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="add('formValidate')">新增</Button>
        </FormItem>
        </Form>
</template>
<script>
import { addItem } from './model';

export default {

  name: 'GoodsCategoryAdd',
  props: {
    parentId: {
      type: String
    }
  },
  data () {
    return {
      formValidate: {
        cateName: ''
        // gcateId: '',
        // parentId: '',
        // parentName: ''
      },
      ruleValidate: {
        cateName: [
          {
            required: true,
            message: '分类名称不能为空',
            trigger: 'blur',
            transform (value) {
              return value.toString().trim();
            }
          }
        ]
        // cateName: [
        //   { required: true, message: '分类名称不能为空', trigger: 'blur' }
        //   // { type: 'string', min: 3, max: 20, message: '分类名称必须3～20个字符', trigger: 'blur' }
        // ]
      },
      id: ''
    };
  },
  methods: {
    add (name) {
      const cateName = this.formValidate.cateName;
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          addItem({
            cate_name: cateName,
            parent_id: this.parentId
          }).then(({ success, msg, data }) => {
            if (success) {
              this.$success('新增成功！');
              this.formValidate.cateName = '';
              this.$emit('addSuccess', {
                expand: false,
                gcateId: data.gcateId || parseInt(Math.random() * 10000).toString(),
                cateName: data.cateName,
                parentId: data.parentId || '0'
              });
              this.$emit('close');
              // this.$emit('refresh');
              // this.setModal(false);
              // this.reload();
            } else {
              this.$error(msg);
            }
          });
        } else {
          // this.$error('表单验证不正确');
        }
      });
    },
    handleReset (name) {
      this.formValidate.cateName = '';
      this.$refs.formValidate.resetFields();
    }
  },
  watch: {
    parentId (val) {
      this.handleReset();
    }
  }
};
</script>
