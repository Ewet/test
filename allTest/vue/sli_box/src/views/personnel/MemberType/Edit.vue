<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" class="random-remission-rule">
        <FormItem label="会员类型名称" prop="name">
           <Input
           v-model="formValidate.name"
            style="width:100%;"></Input>
        </FormItem>
        <FormItem label="价格" prop="price">
            <InputNumber
            :max="9999999"
            :min="0"
            v-model="formValidate.price"
            @on-blur="priceBlur"
            placeholder="请输入加价格"
            style="width:100%;"
            />
        </FormItem>
        <FormItem label="描述" prop="desc">
           <Input
                type="textarea"
                v-model="formValidate.desc"
                :maxlength="100"
                :rows="5"
                 style="width:100%;"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="add('formValidate')" v-show="!id">新增</Button>
            <Button type="primary" @click="save('formValidate')" v-show="id">保存</Button></FormItem>
    </Form>
</template>
<script>
import { updateItem } from 'views/personnel/MemberType/model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MemberTypeEdit',
  data () {
    const validatePrice = (rule, value, callback) => {
      callback();
    //   if (!this.formValidate.price) {
    //     callback(new Error('价格输入不正确'));
    //   } else {
    //     callback();
    //   }
    };
    return {
      formValidate: {
        name: '',
        price: null,
        desc: ''
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: '会员类型名称不能为空',
            trigger: 'blur',
            transform (value) {
              if (value === null) {
                return '';
              }
              return value.toString().trim();
            }
          }
        ],
        price: [
          {
            required: true,
            message: '价格不能为空',
            trigger: 'blur',
            transform (value) {
              console.log(value);
              if (value === null) {
                return '';
              }
              return value.toString().trim();
            }
          },
          { validator: validatePrice }
        ]
      },
      id: ''
    };
  },
  methods: {
    save (name) {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          updateItem({
            type_key: this.id,
            type_name: this.formValidate.name,
            threshold: this.formValidate.price,
            type_desc: this.formValidate.desc
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
    priceBlur () {
      if (this.formValidate.price) {
        this.formValidate.price = Number(this.formValidate.price.toFixed(2));
      }
      this.$refs.formValidate.validateField('price');
    }
  },
  watch: {
    formData (val) {
      this.$refs.formValidate.resetFields();
      if (Object.keys(val).length > 0) {
        this.formValidate.name = val.name;
        this.formValidate.price = val.price;
        this.formValidate.desc = val.desc;
        this.id = val.id || '';
      } else {
        this.formValidate = {
          name: '',
          price: null,
          desc: ''
        };
        this.id = '';
      }
    }
  }
};
</script>
