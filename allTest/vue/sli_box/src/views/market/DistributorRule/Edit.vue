<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="等级名称" prop="levelName">
            <Input :maxlength="10" v-model="formValidate.levelName" placeholder="请输入等级名称"></Input>
        </FormItem>
        <FormItem label="等级" prop="level">
            <Select v-model="formValidate.level" placeholder="请输入等级">
                <Option :value="1">1级</Option>
            </Select>
        </FormItem>
        <FormItem label="分成比例" prop="proportion">
            <InputNumber
            :max="100"
            :min="0"
            v-model="formValidate.proportion"
            placeholder="请输入分成比例"
            ></InputNumber><span style="margin-left:1em">%</span>
        </FormItem>
        <FormItem label="每笔发放佣金上限" prop="toplimit">
          <InputNumber :max="500" :min="1" v-model="formValidate.toplimit" placeholder="请输入上限"></InputNumber>
        </FormItem>
        <FormItem label="默认规则" prop="isdefault" >
          <i-switch
            true-value="1"
            false-value="0"
            v-model="formValidate.isdefault"
          ></i-switch>
        </FormItem>
        <FormItem label="生效时间" prop="activeTime">
            <DatePicker @on-change="activeTimeChange" format="yyyy-MM-dd HH:mm:ss" style="width:100%" type="datetime" placeholder="请选择生效时间" v-model="formValidate.activeTime"></DatePicker>
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
    return {
      formValidate: {
        levelName: '',
        level: 1,
        proportion: 0,
        activeTime: '',
        toplimit: 0,
        isdefault: '0'
      },
      ruleValidate: {
        levelName: [
          { required: true, message: '等级名称不能为空', trigger: 'blur' }
        ],
        // level: [
        //   { required: true, message: '等级不能为空', trigger: 'blur' }
        // ],
        // proportion: [
        //   { required: true, message: '分成比例不能为空', trigger: 'blur' }
        // ],
        activeTime: [
          {
            required: true, type: 'date', message: '生效时间不能为空', trigger: 'change'
          }
        ]
      },
      id: '',
      activeTimeText: ''
    };
  },
  methods: {

    add (name) {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          addItem({
            name: this.formValidate.levelName,
            level: this.formValidate.level,
            proportion: this.formValidate.proportion,
            active_time: this.activeTimeText,
            toplimit: this.formValidate.toplimit,
            is_default: this.formValidate.isdefault
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
            rule_id: this.id,
            name: this.formValidate.levelName,
            level: this.formValidate.level,
            proportion: this.formValidate.proportion,
            active_time: this.activeTimeText,
            toplimit: this.formValidate.toplimit,
            is_default: this.formValidate.isdefault
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
    activeTimeChange (val) {
      console.log(val);
      this.activeTimeText = val;
    }
  },
  watch: {
    formData (val) {
      this.$refs.formValidate.resetFields();
      if (Object.keys(val).length > 0) {
        this.formValidate.levelName = val.levelName;
        this.formValidate.level = val.level;
        this.formValidate.proportion = val.proportion;
        this.formValidate.activeTime = new Date(val.activeTime);
        this.formValidate.toplimit = val.toplimit;
        this.formValidate.isdefault = val.isdefault;
        this.formValidate.isdefaultformatted = val.isdefaultformatted;
        this.id = val.id || '';
        this.activeTimeText = val.activeTime;
      } else {
        this.formValidate = {
          levelName: '',
          level: 1,
          proportion: 0,
          activeTime: '',
          toplimit: 0,
          isdefault: '0',
          isdefaultformatted: ''
        };
        this.id = '';
        this.activeTimeText = '';
      }
    }
  }
};
</script>
