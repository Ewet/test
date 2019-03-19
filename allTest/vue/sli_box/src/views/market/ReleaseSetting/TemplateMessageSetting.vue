<template>
   <Form ref="formInline" :label-width="120" class="template-message-setting" :model="formItem" :rules="formRules">
        <h3>通知模版设置</h3>
        <FormItem label="模版id" prop="templateId">
            <Select v-model="formItem.templateId" style="width:100%">
                <Option v-for="item in templateList" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <!-- <p>模版搜索关键字：业务处理通知/OPEnTM207574677</p> -->
        </FormItem>
        <h3>优惠劵发放通知</h3>
        <FormItem label="通知消息头部" prop="messageHeader">
           <Row>
               <Col span="22"><Input v-model="formItem.messageHeader"></Input></Col>
               <Col span="2"><ColorPicker v-model="formItem.messageHeaderColor" style="width:100%"/></Col>
           </Row>
        </FormItem>
        <FormItem label="通知消息1" prop="message1">
             <Row>
               <Col span="22"><Input v-model="formItem.message1" type="textarea" :autosize="true" placeholder=""></Input></Col>
               <Col span="2"><ColorPicker v-model="formItem.message1Color"   style="width:100%"/></Col>
           </Row>
        </FormItem>
        <FormItem label="通知消息2" prop="message2">
             <Row>
               <Col span="22"><Input v-model="formItem.message2" type="textarea" :autosize="true" placeholder=""></Input></Col>
               <Col span="2"><ColorPicker v-model="formItem.message2Color"   style="width:100%"/></Col>
           </Row>
        </FormItem>
         <FormItem label="模版消息结尾" prop="messageEnd">
            <Row>
               <Col span="22"><Input v-model="formItem.messageEnd" placeholder=""></Input></Col>
               <Col span="2"><ColorPicker v-model="formItem.messageEndColor"   style="width:100%"/></Col>
           </Row>
        </FormItem>
        <FormItem label="推送链接">
            <Input v-model="formItem.link" type="textarea" :autosize="true" placeholder=""></Input>
            <p>消息推送点击的链接，为空默认为优惠劵详情</p>
        </FormItem>
        <FormItem>
        <Button type="primary" @click="handleSave">保存</Button>
    </FormItem>
   </Form>
  </div>
</template>
<script>
import {
  getTemplateMsgSetting,
  saveTemplateMsgSetting,
  getMsgTemplateList
} from './model';

const fieldMap = {
  wxtm_first: '通知消息头部',
  wxtm_first_color: '通知消息头部颜色',
  wxtm_keyword1: '通知消息1',
  wxtm_keyword1_color: '通知消息1颜色',
  wxtm_keyword2: '通知消息2',
  wxtm_keyword2_color: '通知消息2颜色',
  wxtm_remark: '模版消息结尾',
  wxtm_remark_color: '模版消息结尾颜色',
  wxtm_link: '推送链接'
};
export default {
  name: 'SendMessageSetting',
  data () {
    return {
      formItem: {
        templateId: '',
        messageHeader: '',
        messageHeaderColor: '',
        message1: '',
        message1Color: '',
        message2: '',
        message2Color: '',
        messageEnd: '',
        messageEndColor: '',
        link: ''
      },
      formRules: {
        templateId: [
          { required: true, message: '模版id不能为空', trigger: 'blur' }
        ],
        messageHeader: [
          {
            required: true, message: '通知消息头部不能为空', trigger: 'blur', transform (value) { return value.toString().trim(); }
          }
        ],
        message1: [
          {
            required: true, message: '通知消息1不能为空', trigger: 'blur', transform (value) { return value.toString().trim(); }
          }
        ],
        message2: [
          {
            required: true, message: '通知消息2不能为空', trigger: 'blur', transform (value) { return value.toString().trim(); }
          }
        ],
        messageEnd: [
          {
            required: true, message: '模版消息结尾不能为空', trigger: 'blur', transform (value) { return value.toString().trim(); }
          }
        ],
        link: [
          {
            required: true, message: '推送链接不能为空', trigger: 'blur', transform (value) { return value.toString().trim(); }
          }
        ]
      },
      templateList: []
    };
  },
  mounted () {
    this.loadTemplate();
    this.loadData();
  },
  methods: {
    handleSave () {
      this.$refs.formInline.validate((valid) => {
        if (valid) {
          this.save();
        }
      });
    },
    save () {
      saveTemplateMsgSetting({
        wxtm_template_id: this.formItem.templateId,
        wxtm_first: this.formItem.messageHeader,
        wxtm_first_color: this.formItem.messageHeaderColor,
        wxtm_keyword1: this.formItem.message1,
        wxtm_keyword1_color: this.formItem.message1Color,
        wxtm_keyword2: this.formItem.message2,
        wxtm_keyword2_color: this.formItem.message2Color,
        wxtm_remark: this.formItem.messageEnd,
        wxtm_remark_color: this.formItem.messageEndColor,
        wxtm_link: this.formItem.link || '-1'
      }).then((result) => {
        this.$fetchCB(result, (data) => {
          this.$success('保存成功');
        }, ({
          msg, errorObj
        }) => {
          if (msg) {
            this.$error(msg);
          } else if (errorObj) {
            this.$Notice.error({
              title: msg,
              duration: 5,
              desc: Object.keys(errorObj).map(x => `<p>${fieldMap[errorObj[x].field]}:${errorObj[x].msg}</p>`).join('')
            });
          }
        });
      });
    },
    loadData () {
      getTemplateMsgSetting().then((result) => {
        this.$fetchCB(result, (data) => {
          this.formItem.templateId = data.templateId;
          this.formItem.messageHeader = data.messageHeader;
          this.formItem.messageHeaderColor = data.messageHeaderColor;
          this.formItem.message1 = data.message1;
          this.formItem.message1Color = data.message1Color;
          this.formItem.message2 = data.message2;
          this.formItem.message2Color = data.message2Color;
          this.formItem.messageEnd = data.messageEnd;
          this.formItem.messageEndColor = data.messageEndColor;
          this.formItem.link = data.link;
        });
      });
    },
    loadTemplate () {
      getMsgTemplateList({
        'pagination[page_size]': 1000
      }).then(({
        success, data, msg
      }) => {
        if (success) {
          this.templateList = data.items.map(x => ({
            name: x.desc,
            value: x.templateId
          }));
        } else {
          this.$error(msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>

.template-message-setting {
    padding-bottom: 100px;
    h3 {
        border-bottom: 1px solid #dddee1;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }
}
</style>
<style lang="less">
.ivu-color-picker .ivu-select-dropdown{
    width: 300px;
    right: 0;
    left: auto!important;
}
</style>
