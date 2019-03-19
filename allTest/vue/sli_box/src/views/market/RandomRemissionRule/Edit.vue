<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" class="random-remission-rule">
        <FormItem label="立减区间" prop="minDiscount" class="inline-item">
            <InputNumber
            :max="100"
            :min="0"
            v-model="formValidate.minDiscount"
            placeholder="开始区间"
            :precision="0"
            ></InputNumber><span style="margin:0 .5em">%</span><span style="margin:0 2em">至</span>
        </FormItem>
        <FormItem  prop="maxDiscount" class="inline-item end-item">
            <InputNumber
            :max="100"
            :min="0"
            v-model="formValidate.maxDiscount"
            placeholder="结束区间"
            :precision="0"
            ></InputNumber><span style="margin:0 .5em">%</span>
        </FormItem>
        <FormItem label="机率" prop="probability">
            <InputNumber
            :max="100"
            :min="1"
            v-model="formValidate.probability"
            @on-blur="probabilityBlur"
            placeholder="请输入机率"
            style="width:200px;"
            :precision="0"
            ></InputNumber><span style="margin-left:1em">%</span>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="add('formValidate')" v-show="!id">新增</Button>
            <Button type="primary" @click="save('formValidate')" v-show="id">保存</Button></FormItem>
    </Form>
</template>
<script>
import { updateItem, addItem } from './model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'DistributorLevelEdit',
  data () {
    const validateMinDiscount = (rule, value, callback) => {
      if (!this.formValidate.minDiscount) {
        callback(new Error('开始区间输入不正确'));
      } else {
        callback();
      }
    };
    const validateMaxDiscount = (rule, value, callback) => {
      if (!this.formValidate.maxDiscount) {
        callback(new Error('结束区间输入不正确'));
      } else {
        callback();
      }
    };
    return {
      formValidate: {
        probability: null,
        maxDiscount: null,
        minDiscount: null
      },
      ruleValidate: {
        minDiscount: [
          {
            required: true,
            message: '开始区间不能为空',
            trigger: 'blur',
            transform (value) {
              if (value === null) {
                return '';
              }
              return value.toString().trim();
            }
          },
          { validator: validateMinDiscount }
        ],
        maxDiscount: [
          {
            required: true,
            message: '结束区间不能为空',
            trigger: 'blur',
            transform (value) {
              if (value === null) {
                return '';
              }
              return value.toString().trim();
            }
          },
          { validator: validateMaxDiscount }
        ],
        probability: [
          {
            required: true,
            message: '机率不能为空',
            type: 'number'
          }
        ]
      },
      id: ''
    };
  },
  methods: {
    add (name) {
      if (this.formValidate.minDiscount > this.formValidate.maxDiscount) {
        this.$error('开始区间不能大于结束区间');
        return false;
      }
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          addItem({
            min_discount: this.formValidate.minDiscount,
            max_discount: this.formValidate.maxDiscount,
            probability: this.formValidate.probability
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
      if (this.formValidate.minDiscount > this.formValidate.maxDiscount) {
        this.$error('开始区间不能大于结束区间');
        return false;
      }
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          updateItem({
            random_id: this.id,
            min_discount: this.formValidate.minDiscount,
            max_discount: this.formValidate.maxDiscount,
            probability: this.formValidate.probability
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
    },
    probabilityBlur () {
      this.$refs.formValidate.validateField('probability');
    }
  },
  watch: {
    formData (val) {
      this.$refs.formValidate.resetFields();
      if (Object.keys(val).length > 0) {
        this.formValidate.minDiscount = val.minDiscount;
        this.formValidate.maxDiscount = val.maxDiscount;
        this.formValidate.probability = val.probability;
        this.id = val.id || '';
      } else {
        this.formValidate = {
          minDiscount: null,
          maxDiscount: null,
          probability: null
        };
        this.id = '';
      }
    }
  }
};
</script>
<style lang="less">
.random-remission-rule{
  .inline-item {
    display: inline-block;
    margin-right: 10px;
    vertical-align: top;
  }
  .end-item {
    .ivu-form-item-content {
      margin-left:0!important;
    }
  }
}
</style>
