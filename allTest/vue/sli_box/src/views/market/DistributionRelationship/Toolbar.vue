<template>
    <Form ref="formInline" :rules="ruleInline" inline style="text-align:left">
        <Button type="primary" icon="refresh">刷新</Button>
        <FormItem label="" >
            <Select v-model="formInline.select" placeholder="是否分销商">
                <Option value="1">是</Option>
                <Option value="2">否</Option>
            </Select>
        </FormItem>
        <FormItem label="" >
            <Select v-model="formInline.select" placeholder="下线层级">
                <Option value="beijing">不按时间</Option>
                <Option value="shanghai">天</Option>
                <Option value="shenzhen">季度</Option>
            </Select>
        </FormItem>
        <FormItem>
             <Select  v-model="formInline.select" placeholder="关注">
                <Option value="beijing">神级</Option>
                <Option value="shanghai">黑</Option>
                <Option value="shenzhen">红</Option>
            </Select>
        </FormItem>
        <FormItem>
             <Select  v-model="formInline.select" placeholder="分销商">
                <Option value="beijing">神级</Option>
                <Option value="shanghai">黑</Option>
                <Option value="shenzhen">红</Option>
            </Select>
        </FormItem>
        <FormItem>
            <DatePicker type="date" placeholder="会员注册时间" style="width: 200px"></DatePicker>
            <DatePicker type="date" placeholder="成为分销商时间" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
            <Button type="primary" @click="handleSubmit('formInline')">导出</Button>
        </FormItem>
    </Form>
</template>
<script>
export default {
  name: 'DistributionRelationshipToolbar',
  data () {
    return {
      formInline: {
        user: '',
        password: '',
        select: ''
      },
      ruleInline: {
        user: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          {
            type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$success('Success!');
        } else {
          this.$error('Fail!');
        }
      });
    }
  }
};
</script>
