<template>
    <div class='addExpansionBoard'>
      <Form class='content' :label-width="86" ref="expansionBoardForm" :model="expansionBoardForm" :rules='ruleValidate'>
        <FormItem label='编号' prop='expansionBoardNum'>
            <InputNumber :max="16" :min="1" v-model="expansionBoardForm.expansionBoardNum" clearable placeholder="请输入扩展板编号（范围：1-16）"></InputNumber >
        </FormItem>
        <FormItem label='通道数量' prop='channelNum'>
            <InputNumber :max="8" v-model="expansionBoardForm.channelNum" clearable placeholder="请输入通道数量"></InputNumber >
        </FormItem>
        <FormItem label="默认电平">
            <RadioGroup v-model="expansionBoardForm.defaultLevel">
                <Radio label="1">高</Radio>
                <Radio label="0">低</Radio>
            </RadioGroup>
        </FormItem>
      </Form>
      <CloseBtn style='float:right;margin:40px 0 10px' @click="cancel"/>
      <DetermineBtn style='float:right;margin:40px 10px 10px 0' @click="addOk('expansionBoardForm')" :disabled='isDisabled'/>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { addExponsionBoard } from './ExpansionBoard/model';
import { STORE_NAME } from './store';

export default {
  name: 'AddexpansionBoard',
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      isDisabled: false,
      expansionBoardForm: {
        expansionBoardNum: null,
        channelNum: 8,
        defaultLevel: '1'
      },
      ruleValidate: {
        expansionBoardNum: [
          { required: true, validator: this.validateExpansionBoardNum, trigger: 'change' }
        ],
        channelNum: [
          { required: true, validator: this.validateChannelNum, trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    validateExpansionBoardNum (rule, value, callback) {
      if (!value) {
        callback(new Error('扩展板编号不能为空'));
      } else {
        callback();
      }
    },
    validateChannelNum (rule, value, callback) {
      if (!value) {
        callback(new Error('通道数量不能为空'));
      } else {
        callback();
      }
    },
    async addOk (name) {
      this.isDisabled = true;
      setTimeout(() => {
        this.isDisabled = false;
      }, 1000);
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const { success, msg } = await addExponsionBoard({
            acquisition_id: this.collectionBoardId,
            extension_no: this.expansionBoardForm.expansionBoardNum,
            blocked_level: this.expansionBoardForm.defaultLevel,
            number_of_channels: this.expansionBoardForm.channelNum
          });
          if (success) {
            this.$success('添加成功！');
            this.getExpansionBoardData(this.collectionBoardId);
          } else {
            this.$error(`添加失败！${msg}`);
          }
          this.cancel();
        }
      });
    },
    cancel () {
      this.$refs.expansionBoardForm.resetFields();
      this.setAddExpansionBoardModal(false);
    },
    cancelExpansionBoardForm () {
      this.cancel();
    }
  },
  created () {
    this.$g_on('cancelExpansionBoardForm', this.cancelExpansionBoardForm);
  },
  beforeDestroy () {
    this.$g_off('cancelExpansionBoardForm', this.cancelExpansionBoardForm);
  }
};
</script>
<style lang='less'>
.addExpansionBoard{
  clear: both;
  overflow: hidden;
  .content{
    height: 250px;
      label.ivu-form-item-label,.ivu-input-number-input-wrap,
      .ivu-input-number-input,.ivu-input,.ivu-select-input,
      .ivu-input-icon,.ivu-select-single .ivu-select-selection{
        height: 38px;
      }
      label.ivu-form-item-label,.ivu-form .ivu-form-item-label{
        padding: 14px 12px 10px 0;
      }
      .ivu-select,.ivu-input-wrapper,.ivu-input-number{
        width: 90%;
        height: 38px;
      }
      .ivu-input-number-handler-wrap{
        width: 0px;
      }
  }
  ::-webkit-input-placeholder{/*Webkit browsers*/
    color:#999;
  }
  :-moz-placeholder{/*Mozilla Firefox 4 to 8*/
    color:#999;
  }
  ::moz-placeholder{/*Mozilla Firefox 19+*/
    color:#999;
  }
  :-ms-input-placeholder{/*Internet Explorer 10+*/
    color:#999;
  }
}
</style>
