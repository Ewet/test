<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
      <div style="height:600px; overflow:auto;">
      <Row>
        <Col span="12">
          <FormItem label="商品名称" prop="goodsName">
            <Input :maxlength="30" v-model="formValidate.goodsName" placeholder="请输入商品名称"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="商品分类" prop="gcateId">
            <Select v-model="formValidate.gcateId" placeholder="商品分类">
                <Option
                v-for="(item,index) in categoryOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
          </FormItem>
        </Col>
    </Row>
    <!-- <br> -->
    <Row>
        <Col span="12">
          <FormItem label="所属渠道商" prop="distributorId">
            <!-- <Input :maxlength="50" v-model="formValidate.distributorName" placeholder="请选择所属渠道商"></Input> -->
            <Select v-model="formValidate.distributorId" placeholder="所属渠道商" >
                <Option
                v-for="(item,index) in channelOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="商品BOM码" prop="barcode">
            <Input :maxlength="20" v-model="formValidate.barcode" placeholder="请输入商品BOM码"></Input>
          </FormItem>
        </Col>
    </Row>
    <!-- <br> -->
    <Row>
        <Col span="12">
          <FormItem label="市场价(/元)" prop="marketPrice" >
            <InputNumber :max="999999.99" :min="0" v-model="formValidate.marketPrice" placeholder="请输入市场价" style="width:100%;"></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="建议售价(/元)" prop="suggestPrice">
            <InputNumber :max="999999.99" :min="0" v-model="formValidate.suggestPrice" placeholder="请输入建议售价" style="width:100%;"></InputNumber>
          </FormItem>
        </Col>
    </Row>
        <FormItem label="介绍文件" prop="fileId">
            <Upload
              ref="uploadFile"
              v-if="!formValidate.fileId"
              :on-success="handleUpload"
              :on-error="UploadError"
              :data="uploadfileData"
              :action= "UploadFileUrl"
              :with-credentials="true"
              :max-size="100*1024"
              :format="['mp3','mp4','mpg']"
              :on-format-error="fileHandleFormatError"
              :on-exceeded-size="fileHandleMaxSize"
              :before-upload="handleBeforeUploadMedia"
              name="file"
            >
              <Button :disabled="mediaUploading" icon="ios-cloud-upload-outline">上传介绍MP3/MP4/MPG</Button>
            </Upload>
            <div class="audio">
              <audio :src="formValidate.fileUrl" controls="controls" v-if="formValidate.fileId">
                Your browser does not support the audio element.
              </audio>
              <Icon class="delFile" type="md-close-circle" @click.native="fileHandleRemove()" v-if="formValidate.fileId"></Icon>
            </div>
        </FormItem>
        <FormItem label="轮播图片" >
        <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
        <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name,item.url)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
        </div>
        <Upload
        ref="upload"
        :show-upload-list="false"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        :max-size="15*1024"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        :action="UploadImgUrl"
        :format="['jpg','jpeg','png', 'gif', 'bmp']"
        :data= "uploadImgData"
        :with-credentials="true"
        name="pic"
        type="drag"
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera" size="20"></Icon>
        </div>
        </Upload>
        </FormItem>
        <FormItem label="商品描述" prop="description">
          <ZRichText v-model="formValidate.description"/>
        </FormItem>
        </div>
        <FormItem>
            <Button type="primary" @click="add('formValidate')" v-show="!formValidate.goodsId" :loading="loading">新增</Button>
            <Button type="primary" @click="save('formValidate')" v-show="formValidate.goodsId" :loading="loading">保存</Button>
        </FormItem>
    </Form>
</template>
<script>
import { updateItem, addItem } from './model';
import { getCategoryOptions } from 'views/market/GoodsCategory/model';
import { UPLOAD_URL, UPLOAD_FILE } from '@/const/url';
import { getList } from 'views/system/ChannelManagement/model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'GoodsEdit',
  data () {
    return {
      loading: false,
      UploadFileUrl: UPLOAD_FILE,
      UploadImgUrl: UPLOAD_URL,
      uploadImgData: {
        source: 'uf_box',
        desc: 'goods_img'
      },
      uploadfileData: {
        source: 'uf_box'
      },
      formValidate: {
        goodsId: '',
        goodsName: '',
        gcateId: '',
        distributorId: '',
        barcode: '',
        marketPrice: null,
        suggestPrice: null,
        // uploadList: [],
        images: [],
        fileId: '',
        fileUrl: '',
        description: ''
      },
      channelOptions: [],
      categoryOptions: [],
      ruleValidate: {
        goodsName: [
          {
            required: true,
            message: '商品名称不能为空',
            trigger: 'blur',
            transform (value) {
              return value.toString().trim();
            }
          }
        ],
        gcateId: [
          {
            required: true,
            // type: 'string',
            message: '商品分类不能为空',
            trigger: 'change'
          }
        ],
        distributorId: [
          {
            required: true,
            // type: 'string',
            message: '所属渠道商不能为空',
            trigger: 'change'
          }
        ],
        marketPrice: [
          {
            required: true,
            type: 'number',
            message: '市场价不能为空',
            trigger: 'blur'
          }
        ],
        suggestPrice: [
          {
            required: true,
            type: 'number',
            message: '建议售价不能为空',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: '商品描述不能为空',
            trigger: 'blur',
            transform (value) {
              return value.toString().trim();
            }
          }
        ],
        barcode: [
          {
            required: true,
            message: '商品BOM码不能为空',
            trigger: 'blur',
            transform (value) {
              return value.toString().trim();
            }
          }
        ]
      },
      defaultList: [
      ],
      uploadList: [],
      imgName: '',
      mediaUploading: false
    };
  },
  methods: {
    handleBeforeUploadMedia () {
      this.mediaUploading = true;
      this.$store.commit('setLoading', true);
      return true;
    },
    add (name) {
      if (this.mediaUploading) {
        this.$error('介绍文件正在上传中，请稍候。。。');
        return false;
      }
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          this.loading = true;
          const imagesIds = this.uploadList.map(x => x.id);
          addItem({
            distributor_id: this.formValidate.distributorId, //
            goods_name: this.formValidate.goodsName,
            description: this.formValidate.description, //
            gcate_id: this.formValidate.gcateId, //
            barcode: this.formValidate.barcode,
            // legal_person: this.formValidate.gcateName,
            // distributorName: this.formValidate.distributorName,
            market_price: this.formValidate.marketPrice,
            suggest_price: this.formValidate.suggestPrice,
            images_id: imagesIds,
            file_id: this.formValidate.fileId
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('新增成功！');
              this.setModal(false);
              this.reload();
            } else {
              this.$error(msg);
            }
            this.loading = false;
          });
        }
      });
    },
    save (name) {
      if (this.mediaUploading) {
        this.$error('介绍文件正在上传中，请稍候。。。');
        return false;
      }
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          this.loading = true;
          const imagesIds = this.uploadList.map(x => x.id);
          updateItem({
            goods_id: this.formValidate.goodsId, //
            distributor_id: this.formValidate.distributorId,
            goods_name: this.formValidate.goodsName,
            description: this.formValidate.description,
            gcate_id: this.formValidate.gcateId,
            barcode: this.formValidate.barcode,
            market_price: this.formValidate.marketPrice,
            suggest_price: this.formValidate.suggestPrice,
            images_id: imagesIds,
            file_id: this.formValidate.fileId
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('保存成功!');
              this.setModal(false);
              this.reload();
            } else {
              this.$error(msg);
            }
            this.loading = false;
          });
        }
      });
    },
    handleReset (name) {
      this.$refs.formValidate.resetFields();
    },
    loadcategoryOptions () {
      getCategoryOptions().then((result) => {
        if (result.success) {
          this.categoryOptions = result.data;
        }
      });
    },
    loadchannelOptions () {
      getList().then((result) => {
        if (result.success) {
          this.channelOptions = result.data.items.map(x => ({
            name: x.merchantName,
            value: x.merchantId
          }));
        }
      });
    },
    // 上传文件
    handleUpload (file) {
      if (file.success) {
        this.formValidate.fileId = file.data.file_id;
        this.formValidate.fileUrl = file.data.file_url;
      } else {
        // this.fileHandleRemove();
        this.$refs.uploadFile.clearFiles();
        this.$error(file.message);
      }
      this.mediaUploading = false;
      this.$store.commit('setLoading', false);
    },
    UploadError (fileListfile) {
      this.$error('上传失败');
      this.mediaUploading = false;
      this.$store.commit('setLoading', false);
    },
    fileHandleRemove () {
      // console.log(this.$refs);
      // const fileList = this.$refs.upload.fileList;
      // this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      this.formValidate.fileId = '';
      this.formValidate.fileUrl = '';
    },
    // 上传图片
    handleSuccess (res, file) {
      file.url = res.data.file_url;
      file.id = res.data.file_id;
    },
    handleView (name, url) {
      this.$store.commit('showImage', {
        title: name,
        url
      });
    },
    // 删除图片
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    /*
      文件上传限制start
    */
    fileHandleFormatError (file) {
      this.$error('文件格式不正确,请选择mp3/mp4/mpg格式的文件.');
      this.mediaUploading = false;
      this.$store.commit('setLoading', false);
    },
    fileHandleMaxSize (file) {
      // console.log(file);
      this.$error('超过文件大小限制,文件大小不要超过100M.');
      this.mediaUploading = false;
      this.$store.commit('setLoading', false);
    },
    /*
      文件上传限制end
    */
    /*
      图片上传限制start
    */
    handleFormatError (file) {
      this.$error('图片格式不正确, 请选择jpg/jpeg/png/gif/bmp格式的图片.');
    },
    handleMaxSize (file) {
      // console.log(file);
      this.$error('超过图片大小限制,图片大小不要超过15M.');
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$error('最多上传5张图片.');
      }
      return check;
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList;
    this.loadcategoryOptions();
    this.loadchannelOptions();
  },
  watch: {
    formData (val) {
      this.$refs.formValidate.resetFields();
      if (Object.keys(val).length > 0) {
        this.formValidate.goodsId = val.goodsId;
        this.formValidate.goodsName = val.goodsName;
        this.formValidate.gcateId = val.gcateId;
        this.formValidate.distributorId = val.distributorId;
        this.formValidate.barcode = val.barcode;
        this.formValidate.marketPrice = val.marketPrice;
        this.formValidate.suggestPrice = val.suggestPrice;
        this.formValidate.fileId = val.fileId;
        this.formValidate.fileUrl = val.fileUrl;
        // this.uploadList = val.pic;
        // this.defaultList = val.pic;
        this.formValidate.description = val.description;
        this.defaultList = val.pic;
        this.$nextTick(() => {
          this.uploadList = this.$refs.upload.fileList;
        });
      } else {
        this.formValidate = {
          goodsId: '',
          goodsName: '',
          gcateId: '',
          distributorId: '',
          barcode: '',
          marketPrice: null,
          suggestPrice: null,
          fileId: '',
          fileUrl: '',
          description: ''
        };
        this.defaultList = [];
        this.$nextTick(() => {
          this.uploadList = this.$refs.upload.fileList;
        });
        // this.defaultList = [];
      }
    }
  }
};
</script>
<style>
    .ivu-input-number-handler-wrap{
      display: none;
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
    .audio{
      position: relative;
      height:100%;
    }
    audio{
      background-color: #f1f3f4;
    }
    .delFile{
      position: absolute;
      /* line-height: 66px; */
      top: 0px;
      transform: translate3d(-50%, -50%, 0);
      font-size: 30px;
    }
</style>
