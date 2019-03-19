<template>
    <Form ref="formCustomer" :model="formCustomer" :rules="ruleValidate" :label-width="120">
        <FormItem label="广告名称" prop="adName">
            <Input :maxlength="50" v-model="formCustomer.adName" placeholder="请输入广告名称"></Input>
        </FormItem>
        <FormItem label="所属广告商" prop="advertiser">
            <Input :maxlength="50" v-model="formCustomer.advertiser" placeholder="请输入广告商名称"></Input>
        </FormItem>
        <FormItem label="广告文件" prop="fileId">
            <Upload
              ref="uploadFile"
              v-if="!formCustomer.fileId"
              :on-success="handleUpload"
              :on-error="UploadError"
              :action= "UploadFileUrl"
              :with-credentials="true"
              :max-size="500*1024"
              :format="['mp4']"
              :on-format-error="fileHandleFormatError"
              :on-exceeded-size="fileHandleMaxSize"
              :before-upload="handleBeforeUploadMedia"
              name="file"
            >
              <Button :disabled="mediaUploading" icon="ios-cloud-upload-outline">请上传MPG4格式视频文件</Button>
            </Upload>
            <div class="audio">
              <audio :src="formCustomer.fileUrl" controls="controls" v-if="formCustomer.fileId">
                Your browser does not support the audio element.
              </audio>
              <Icon class="delFile" type="md-close-circle" @click.native="fileHandleRemove()" v-if="formCustomer.fileId"></Icon>
            </div>
        </FormItem>
      <FormItem label='备注' prop='remark'>
                <Input v-model="formCustomer.remark" :maxlength="100" type="textarea" :autosize="{minRows: 4, maxRows: 6}" placeholder="备注不超过100字"></Input>
      </FormItem>
        <FormItem>
            <AddBtn @click="add('formCustomer')" v-show="!id"/>
            <SaveBtn @click="save('formCustomer')" v-show="id"/>
        </FormItem>
      </Form>
</template>
<script>
import { updateItem, addItem } from './model';
import { UPLOADP_ADVERTS } from '@/const/url';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'AdvertisingManagementEdit',
  data () {
    return {
      UploadFileUrl: UPLOADP_ADVERTS,
      formCustomer: {
        adName: '',
        advertiser: '',
        fileId: '',
        fileUrl: '',
        adId: '',
        remark: ''
      },
      mediaUploading: false,
      // uploadfileData: {
      //   source: 'uf_box'
      // },
      ruleValidate: {
        adName: [
          {
            required: true, message: '广告名称不能为空', trigger: 'blur', transform: value => value.toString().trim()
          }
        ],
        advertiser: [
          {
            required: true, message: '所属广告商不能为空', trigger: 'blur', transform: value => value.toString().trim()
          }
        ],
        fileId: [
          { required: true, message: '广告文件不能为空' }
        ]
      },
      id: ''
    };
  },
  mounted () {
  },
  methods: {
    getFormData () {
      return {
        advert_name: this.formCustomer.adName,
        advert_merchants_name: this.formCustomer.advertiser,
        file_id: this.formCustomer.fileId,
        notes: this.formCustomer.remark
      };
    },
    add (name) {
      this.$refs.formCustomer.validate(async (valid) => {
        if (valid) {
          const { success, msg } = await addItem(this.getFormData());
          if (success) {
            this.$success('新增成功！');
            this.setModal(false);
            this.reload();
          } else {
            this.$error(msg);
          }
        }
      });
    },
    save (name) {
      this.$refs.formCustomer.validate(async (valid) => {
        if (valid) {
          const { success, msg } = await updateItem({
            ...this.getFormData(),
            id: this.id
          });
          if (success) {
            this.$success('保存成功!');
            this.setModal(false);
            this.reload();
          } else {
            this.$error(msg);
          }
        }
      });
    },
    handleReset (name) {
      this.$refs.formCustomer.resetFields();
    },
    // 上传前弹出上传中
    /* 关闭时间点：
    * 上传成功、失败、文件格式验证失败、文件大小验证失败
    */
    handleBeforeUploadMedia () {
      this.mediaUploading = true;
      this.$store.commit('setLoading', true);
      return true;
    },
    // 上传文件
    handleUpload (file) {
      if (file.success) {
        this.formCustomer.fileId = file.data.file_id;
        this.formCustomer.fileUrl = file.data.file_url;
      } else {
        this.$refs.uploadFile.clearFiles();
        this.$error(file.message);
      }
      this.mediaUploading = false;
      this.$store.commit('setLoading', false);
      this.$refs.formCustomer.validateField('fileId');
    },
    // 上传失败
    UploadError (fileListfile) {
      this.$error('上传失败');
      this.mediaUploading = false;
      this.$store.commit('setLoading', false);
    },
    /*
      文件上传限制start
    */
    fileHandleFormatError (file) {
      this.$error('文件格式不正确,请上传MPG4格式视频文件.');
      this.mediaUploading = false;
      this.$store.commit('setLoading', false);
    },
    fileHandleMaxSize (file) {
      this.$error('超过文件大小限制,文件大小不要超过500M.');
      this.mediaUploading = false;
      this.$store.commit('setLoading', false);
    },
    /*
      文件上传限制end
    */
    // 删除已上传文件
    fileHandleRemove () {
      this.formCustomer.fileId = '';
      this.formCustomer.fileUrl = '';
      this.$refs.formCustomer.validateField('fileId');
    }
  },
  watch: {
    formData (val) {
      this.$refs.formCustomer.resetFields();
      if (Object.keys(val).length > 0) {
        this.formCustomer = {
          adName: val.adName,
          advertiser: val.advertiser,
          fileId: val.fileId,
          fileUrl: val.fileUrl,
          remark: val.remark
        };
        console.log(this.formCustomer);
        this.id = val.adId || '';
      } else {
        this.formCustomer = {
          adName: '',
          advertiser: '',
          fileId: '',
          fileUrl: '',
          remark: ''
        };
        this.id = '';
      }
    }
  },
  components: {
  }
};
</script>
<style lang="less" scoped>
.delFile{
      position: absolute;
      /* line-height: 66px; */
      top: 0px;
      transform: translate3d(-50%, -50%, 0);
      font-size: 30px;
    }
</style>
