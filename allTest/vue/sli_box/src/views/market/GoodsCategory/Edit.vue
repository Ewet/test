<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="分类名称" prop="cateName">
            <Input :maxlength="12" v-model="formValidate.cateName" placeholder="请输入分类名称"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="save('formValidate.cateName')" >保存</Button>
        </FormItem>
        </Form>
</template>
<script>
import { updateItem } from './model';

export default {

  name: 'GoodsCategoryEdit',
  props: {
    gcateId: {
      type: String
    },
    name: {
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
      }
      // id: ''
    };
  },
  mounted () {
  },
  methods: {

    save (name) {
      const cateName = this.formValidate.cateName;
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          updateItem({
            gcate_id: this.gcateId, // 未
            cate_name: cateName
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('保存成功!');
              this.$emit('close');
              this.$emit('upDateSuccess', {
                cateName
              });
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
    name (val) {
      this.handleReset();
      this.formValidate.cateName = val;
    }
  }
};
</script>
