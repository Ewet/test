<template>
    <div class="random-remission-setting">
      <ModuleHeader title="随机立减活动设置">
      </ModuleHeader>
      <Form ref="formData" :model="formData" :rules="ruleValidate"  :label-width="120">
          <FormItem label="状态">
              <i-switch v-model="formData.status"
              true-value="1"
              false-value="0"/>
          </FormItem>
          <FormItem label="周期" prop="validDay" class="inline-item">
              <InputNumber
                  :max="100"
                  :min="0"
                  v-model="formData.validDay"
                  placeholder="请输入天数"
                  style="width:200px;"
              ></InputNumber><span style="margin:0 1em">天</span>
          </FormItem>
          <FormItem class="inline-item day-item" prop="useNumber">
              <InputNumber
                  :max="100"
                  :min="0"
                  v-model="formData.useNumber"
                  placeholder="请输入次数"
                  style="width:200px;"
              ></InputNumber><span style="margin:0 1em">次</span>
          </FormItem>
          <FormItem>
              <Button type="primary" @click="handleSave">保存</Button>
          </FormItem>
    </Form>
    </div>
</template>
<script>
import { get, update } from './model';

export default {
  name: 'RandomRemissionSetting',
  components: {
  },
  data () {
    const validateDay = (rule, value, callback) => {
      if (!this.formData.validDay) {
        callback(new Error('天数输入不正确'));
      } else {
        callback();
      }
    };
    const validateCount = (rule, value, callback) => {
      if (!this.formData.useNumber) {
        callback(new Error('次数输入不正确'));
      } else {
        callback();
      }
    };
    return {
      formData: {
        status: '0',
        useNumber: null,
        validDay: null
      },
      ruleValidate: {
        validDay: [
          {
            required: true,
            message: '天数不能为空',
            trigger: 'blur',
            transform (value) {
              if (value === null) {
                return '';
              }
              return value.toString().trim();
            }
          },
          { validator: validateDay }
        ],
        useNumber: [
          {
            required: true,
            message: '次数不能为空',
            trigger: 'blur',
            transform (value) {
              if (value === null) {
                return '';
              }
              return value.toString().trim();
            }
          },
          { validator: validateCount }
        ]
      }
    };
  },
  mounted () {
    this.loadData();
  },
  methods: {
    async loadData () {
      const { success, msg, data } = await get();
      if (success) {
        Object.keys(this.formData).forEach(e => (this.formData[e] = data[e]));
      } else {
        this.$error(msg);
      }
    },
    async handleSave () {
      this.$refs.formData.validate((valid) => {
        console.log(valid);
        if (valid) {
          this.save();
        } else {
          this.$refs.formInline.$el.scrollTo(0, 0);
        }
      });
    },
    async save () {
      const { success, msg } = await update({
        status: this.formData.status,
        use_number: this.formData.useNumber,
        valid_day: this.formData.validDay
      });
      if (success) {
        this.$success('保存成功!');
      } else {
        this.$error(msg);
      }
    }
  }
};
</script>
<style lang="less">
.random-remission-setting {
  .inline-item {
    display: inline-block;
    margin-right: 10px;
    vertical-align: top;
  }
  .day-item {
    .ivu-form-item-content {
      margin-left:0!important;
    }
  }
}
</style>
