<template>
    <div>
   <Form ref="formInline" :label-width="120" :model="formItem" :rules="formRules">
        <FormItem label="推送标题" prop="title">
            <Input
              v-model="formItem.title"
              type="textarea"
              :autosize="true"
              placeholder=""
              maxlength="50"
            ></Input>
        </FormItem>
        <FormItem label="推送图标" prop="imgUrl">
            <div>
                <Button type="primary" @click="selectImage">选择图片</Button>
            </div>
        </FormItem>
        <FormItem>
            <div class="push-icon" v-if="formItem.imgUrl!==''">
                <img :src="formItem.imgUrl" alt="">
                <Icon type="close-circled" @click.native="removeImg"></Icon>
            </div>
        </FormItem>
         <FormItem label="推送描述" prop="desc">
             <Input
              v-model="formItem.desc"
              type="textarea"
              :autosize="true"
              placeholder=""
              maxlength="200"></Input>
        </FormItem>
        <FormItem label="推送链接">
           <Input v-model="formItem.link" type="textarea" :autosize="true" placeholder=""></Input>
           <p>消息推送点击的链接，为空默认为优惠劵详情</p>
        </FormItem>
    <FormItem>
        <Button type="primary" @click="handleSave">保存</Button>
    </FormItem>
   </Form>

   <Modal
    v-model="showSelectModal"
    width="67%"
    height="70%"
    title="图片选择"
    :footer-hide="true"
    >
       <ImageSelect v-model="formItem.imgId" @selectItem="selectItem"/>
   </Modal>
  </div>
</template>
<script>
import { getCustomerServiceMsgSetting, saveCustomerServiceMsgSetting } from './model';

const fieldMap = {
  csm_title: '推送标题',
  csm_pic_id: '推送图标',
  csm_desc: '推送描述',
  csm_link: '推送链接'
};
export default {
  name: 'CustomerServiceMessageSetting',
  data () {
    return {
      formItem: {
        title: '',
        desc: '',
        link: '',
        imgUrl: '',
        imgId: ''
      },
      formRules: {
        title: [
          {
            required: true, message: '推送标题不能为空', trigger: 'blur', transform (value) { return value.toString().trim(); }
          }
        ],
        desc: [
          {
            required: true, message: '推送描述不能为空', trigger: 'blur', transform (value) { return value.toString().trim(); }
          }
        ],
        link: [
          {
            required: true, message: '推送链接不能为空', trigger: 'blur', transform (value) { return value.toString().trim(); }
          }
        ],
        imgUrl: [
          {
            required: true, message: '推送图标不能为空', trigger: 'blur', transform (value) { return value.toString().trim(); }
          }
        ]
      },
      showSelectModal: false
    };
  },
  mounted () {
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
      saveCustomerServiceMsgSetting({
        csm_title: this.formItem.title,
        csm_pic_id: this.formItem.imgId,
        csm_desc: this.formItem.desc,
        csm_link: this.formItem.link || '-1'
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
    selectImage () {
      this.showSelectModal = true;
    },
    loadData () {
      getCustomerServiceMsgSetting().then((result) => {
        this.$fetchCB(result, (data) => {
          this.formItem.title = data.title;
          this.formItem.desc = data.desc;
          this.formItem.imgUrl = data.imgUrl;
          this.formItem.link = data.link;
          this.formItem.imgId = data.imgId;
        });
      });
    },
    removeImg () {
      this.formItem.imgUrl = '';
      this.formItem.imgId = '';
    },
    selectItem (item) {
      // console.log(item);
      this.formItem.imgUrl = item.url;
      this.formItem.imgId = item.id;
      this.$refs.formInline.validateField('imgUrl');
      this.$success('添加推送图标成功');
    }
  }
};
</script>
<style lang="less" scoped>
h3 {
    border-bottom: 1px solid #dddee1;
    padding-bottom: 10px;
    margin-bottom: 10px;
}
.push-icon {
    list-style: none;
    position: relative;
    width:150px;
    height: 150px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    img {
        width: 100%;
        height:100%;
    }
    .ivu-icon{
        position: absolute;
        right: -6px;
        top: -6px;
        font-size: 20px;
        color:#fff;
    }
}
</style>
