<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" class="formBox">
        <FormItem label="公开日期" prop="publishDate">
            <DatePicker
            :options="disabledTime"
            type="datetime"
            placeholder="请选择日期"
            style="width: 100%"
            v-model="formValidate.publishDate">
           </DatePicker>
        </FormItem>
        <FormItem label="标题" prop="title">
            <Input
            :maxlength="30"
            v-model="formValidate.title"
            placeholder="请填入30个字以内的标题">
           </Input>
        </FormItem>
        <FormItem label="导读" prop="guideReading">
             <Input
             :maxlength="100"
             v-model="formValidate.guideReading"
             type="textarea"
             :rows="3"
             placeholder="请填入100个字以内的导读内容" />
        </FormItem>
        <FormItem label="主图" prop="picture">
             <div class="demo-upload-list" v-for="item in uploadList" :key="item.url">
                  <template v-if="item.status === 'finished'">
                      <img :src="item.url">
                      <div class="demo-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                      </div>
                  </template>
                  <template v-else>
                      <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                  </template>
              </div>
             <div v-show="uploadList.length===0" class="uploadBox">
               <Upload
                  v-show="uploadList.length===0"
                  ref="upload"
                  :show-upload-list="false"
                  :default-file-list="defaultList"
                  :on-success="handleSuccess"
                  :format="['jpg','jpeg','png', 'gif', 'bmp']"
                  :max-size="15*1024"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  type="drag"
                  :action="UploadImgUrl"
                  :data= "uploadImgData"
                  :with-credentials="true"
                  name="pic"
                  style="display: inline-block;width:58px;">
                  <div v-show="uploadList.length===0" style="width: 58px;height:58px;line-height: 58px;">
                      <Icon type="ios-camera" size="20"></Icon>
                  </div>
              </Upload>
              <span v-show="!isUpload"></span>
             </div>
        </FormItem>
        <FormItem label="主要内容" prop="content">
          <ZRichText v-model="formValidate.content" style="height:300px"/>
        </FormItem>
        <FormItem style="text-align:right;">
            <AddBtn @click="add('formValidate')" v-show="!itemId"/>
            <SaveBtn @click="save('formValidate')" v-show="itemId"/>
        </FormItem>
        </Form>
</template>
<script>
import { updateItem, addItem } from './model';
import { UPLOAD_URL } from '@/const/url';
import vuexMixins from 'mixins/module-map';
import { getConfig } from 'model/authManagement';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'Edit',
  data () {
    return {
      isUpload: true, // 是否允许上传
      disabledTime: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      ruleValidate: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        picture: [
          { required: true, message: '主图不能为空', trigger: 'blur' }
        ],
        guideReading: [
          { required: true, message: '导读不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '主要内容不能为空', trigger: 'blur' }
        ]
      },
      formValidate: {
        publishDate: '', // 公开日期
        title: '', // 标题
        guideReading: '', // 导读
        picture: '', // 主图
        content: '', // 主要内容
        id: ''
      },
      loading: false,
      id: '',
      expandedKeys: [],
      autoExpandParent: true,
      treeData: [],
      leafCollection: [],
      defaultList: [],
      uploadList: [],
      UploadImgUrl: UPLOAD_URL,
      uploadImgData: {
        source: 'uf_box',
        desc: 'goods_img'
      }
    };
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList;
  },
  methods: {
    add (name) {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          let date = '';
          if (this.formValidate.publishDate !== '') {
            date = this.$formatTime(this.formValidate.publishDate);
          }
          const content = this.formValidate.content;
          addItem({
            publish_date: date,
            title: this.formValidate.title,
            column_name: this.formValidate.guideReading,
            image: this.formValidate.picture,
            content
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
    save () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          let date = '';
          if (this.formValidate.publishDate) {
            date = this.$formatTime(this.formValidate.publishDate);
          }
          const content = this.formValidate.content;
          updateItem({
            publish_date: date,
            title: this.formValidate.title,
            column_name: this.formValidate.guideReading,
            image: this.formValidate.picture,
            content,
            website_news_id: this.formValidate.id
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
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    async loadTree () {
      const { success, data, msg } = await getConfig();
      if (success) {
        this.treeData = data.treeData;
        this.leafCollection = data.leafCollection;
      } else {
        this.$error(msg);
      }
    },
    // 图片预览
    handleView (url) {
      this.showImg({
        visible: true,
        url
      });
    },
    // 图片删除
    handleRemove (file) {
      const fileList = this.uploadList;
      this.uploadList.splice(fileList.indexOf(file), 1);
      this.formValidate.picture = '';
    },
    // 文件上传成功时的钩子
    handleSuccess (res, file, fileList) {
      file.url = res.data.file_url;
      file.id = res.data.file_id;
      this.formValidate.picture = res.data.file_id;
      this.uploadList = fileList;
      this.isUpload = true;
      this.$refs.formValidate.validateField('picture');
    },
    // 文件格式验证失败时的钩子
    handleFormatError (file) {
      this.$error('图片格式不正确, 请选择jpg/jpeg/png/gif/bmp格式的图片.');
      this.isUpload = true;
    },
    // 文件超出指定大小限制时的钩子
    handleMaxSize (file) {
      this.$error('超过图片大小限制,图片大小不要超过15M.');
      this.isUpload = true;
    },
    // 上传文件之前的钩子，参数为上传的文件
    handleBeforeUpload () {
      this.isUpload = false;
      const check = this.uploadList.length < 1;
      if (!check) {
        this.isUpload = true;
        this.$Notice.warning({
          title: '最多可上传1张图片'
        });
      }
      return check;
    }
  },
  watch: {
    showModal (val) {
      if (!val) {
        this.formValidate = {
          publishDate: '', // 更新日期
          title: '', // 标题
          guideReading: '', // 导读
          picture: '', // 主图
          content: '', // 主要内容
          id: ''
        };
        this.uploadList = [];
      }
    },
    formData (val) {
      this.$refs.formValidate.resetFields();
      this.$refs.upload.clearFiles();
      if (Object.keys(val).length > 0) {
        this.formValidate.publishDate = val.publishDate;
        this.formValidate.title = val.title;
        this.formValidate.guideReading = val.guideReading;
        this.formValidate.picture = val.imgId;
        this.formValidate.content = val.content;
        this.formValidate.id = val.id || '';
        if (val.imgId) {
          this.uploadList = [{
            id: val.id,
            name: val.picture,
            percentage: 100,
            url: val.picture,
            showProgress: false,
            status: 'finished'
          }];
        }

        // this.$refs.upload.fileList = [{
        //   'picId': val.id,
        //   'id': val.id,
        //   'url': val.picture,
        //   'status': 'finished',
        //   'name': val.picture
        // }];
      } else {
        this.formValidate = {
          publishDate: '', // 更新日期
          title: '', // 标题
          guideReading: '', // 导读
          picture: '', // 主图
          content: '', // 主要内容
          id: ''
        };
        this.uploadList = [];
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
<style lang="less" scoped>
.uploadBox{
  width: 60px;
  height: 60px;
  position: relative;
  overflow: hidden;
  span{
    display: block;
    width: 60px;
    height: 60px;
    position: absolute;
    left: 0;
    top:0;
    opacity: 0;
  }
}
.imgBox{
  width: 120px;
  height: 120px;
  background-color: #eee;
  img{
    display: block;
    width: 100%;
    height: 100%;
  }
}

.demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>

<style lang="less">
.edui-default .edui-editor{
      width: auto !important;
    }
    .ivu-select-dropdown{
      z-index: 999999!important;
    }
.formBox{
    padding:0 10px;
    max-height:800px;
    overflow:auto;
    .ivu-form-item-content{
      line-height: inherit!important;
    }
}

</style>
