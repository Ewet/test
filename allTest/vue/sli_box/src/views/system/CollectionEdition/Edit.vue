<template>
    <div class="collectionEdition">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="采集板编号" prop="collectionNumber" >
            <!-- <Input
            v-model="formValidate.collectionNumber"
            placeholder="请输入采集板编号(1~32)"></Input> -->
            <InputNumber style="width:100%;" :max="32" :min="1" v-model="formValidate.collectionNumber" clearable placeholder="请输入采集板编号(1~32)"></InputNumber>
        </FormItem>
        <FormItem label="采集板版本" prop="edition" >
            <Input
            v-model="formValidate.edition"

            placeholder="请输入采集板版本"></Input>
        </FormItem>
        <FormItem label="遮挡电平"  >
            <RadioGroup v-model="formValidate.level" size="default" style="margin-top: -6px;">
                <Radio label="1"><span>高</span></Radio>
                <Radio label="0"><span>低</span></Radio>
            </RadioGroup>
        </FormItem>
        <FormItem class="formBtn">
            <AddBtn  @click="add()"/>
        </FormItem>
        </Form>
    </div>

</template>
<script>
import { addItem } from './model';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    const collectionNumberCheck = (rule, value, callback) => {
      if (value === '' || value === null) {
        callback(new Error('采集板编号不能为空'));
      } else {
        callback();
      }
    };
    const editionCheck = (rule, value, callback) => {
      if (this.trim(value) === '' || value === null) {
        callback(new Error('采集板版本不能为空'));
      } else {
        const len = this.trim(value).length;
        if (len > 10) {
          callback(new Error('采集板版本不能超过十位'));
        } else {
          callback();
        }
      }
    };
    return {
      formValidate: {
        level: '1',
        collectionNumber: null,
        edition: '',
        passagewayNumber: '',
        id: ''
      },
      ruleValidate: {
        collectionNumber: [
          { required: true, validator: collectionNumberCheck, trigger: 'blur' }
        ],
        edition: [
          { required: true, validator: editionCheck, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 去掉字符串两边空格
    trim (str) {
      if (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
      }
      return str;
    },
    // 保存添加采集板
    add () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          const mcbId = this.$store.state.boxManagement.mcbId;
          addItem({
            mcb_id: mcbId,
            acquisition_no: this.formValidate.collectionNumber,
            hw_version: this.trim(this.formValidate.edition),
            blocked_level: this.formValidate.level
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('新增成功！');
              this.setModal(false);
              this.reload();
              this.$refs.formValidate.resetFields();
              this.formValidate = {
                level: '1',
                collectionNumber: null,
                edition: '',
                passagewayNumber: '',
                id: ''
              };
              this.level = '';
            } else {
              this.$error(msg);
            }
          });
        } else {
        }
      });
    },
    // 保存编辑资料
    // save () {
    //   this.$refs['formValidate'].validate((valid) => {
    //     if (valid) {
    //       updateItem({
    //         collectionNumber: this.trim(this.formValidate.collectionNumber),
    //         edition: this.trim(this.formValidate.edition),
    //         passagewayNumber: this.trim(this.formValidate.passagewayNumber),
    //         level: this.level,
    //         id: this.trim(this.formValidate.id)
    //       }).then(({success, msg}) => {
    //         if (success) {
    //           this.$success('保存成功!');
    //           this.setModal(false);
    //           this.reload();
    //           this.$refs['formValidate'].resetFields();
    //           this.formValidate = {};
    //         } else {
    //           this.$error(msg);
    //         }
    //       });
    //     } else {
    //     }
    //   });
    // },
    handleReset (name) {
      this.$refs.formValidate.resetFields();
    }

  },
  watch: {
    formData (val) {
      this.$refs.formValidate.resetFields();
      if (Object.keys(val).length > 0) {
        this.formValidate = {
          collectionNumber: val.collectionNumber,
          edition: val.edition,
          passagewayNumber: val.passagewayNumber,
          level: val.level,
          id: val.id
        };
      } else {
        this.formValidate = {
          level: '1',
          collectionNumber: null,
          edition: '',
          passagewayNumber: '',
          id: ''
        };
      }
    }
  }
};
</script>
<style lang="less">
.ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background-color: #fff;
}
</style>
<style lang="less" >
.formBtn{
  text-align:right;
}
.collectionEdition{
  clear: both;
  overflow: hidden;
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
.collectionEdition .ivu-input-number-handler-wrap{
    display: none!important;
}
</style>
