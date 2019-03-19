<template>
<div class="local-server">
    <!-- <Modal title="View Image" v-model="visible">
        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
    </Modal> -->
    <h3>
    <Upload
        ref="upload"
        :show-upload-list="false"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        :action="uploadAction"
        style="display: inline-block;"
        :data="uploadData"
        :with-credentials="true"
        name="pic">
       <Button type="primary">上传图片</Button>
    </Upload>
    </h3>
    <div class="upload-list" v-for="(item,i) in uploadList" :key="i"  @click="selectItem(item,i)">
        <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="upload-list-cover" v-show="item.id === value">
                <Icon type="checkmark"></Icon>
            </div>
            <div class="close">
              <Icon type="close-circled" @click.native="handleRemove(item)"></Icon>
            </div>
            <div class="upload-item-title">
                {{item.name}}
            </div>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
    </div>
</div>
</template>
<script>
import { getImageList } from 'views/market/ReleaseSetting/model';
import {
  UPLOAD_URL
} from '@/const/url';

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      defaultList: [],
      imgName: '',
      visible: false,
      uploadList: [],
      index: 0,
      uploadData: {
        source: 'uf_mc',
        desc: 'csm_pic'
      },
      uploadAction: UPLOAD_URL,
      activeIndex: -1
    };
  },
  methods: {
    handleView ({ name, url }) {
      this.imgName = name;
      this.visible = true;
      this.$m_confirm({
        render: h => h('img', {
          attrs: {
            src: url
          },
          style: {
            width: '100%'
          }
        })
      });
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess (res, file) {
      console.log(res, file);
      file.url = res.data.file_url;
      file.id = res.data.file_id;
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: `File format of ${file.name} is incorrect, please select jpg or png.`
      });
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: `File  ${file.name} is too large, no more than 2M.`
      });
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 50;
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        });
      }
      return check;
    },
    selectItem (item, index) {
      this.$emit('selectItem', item);
      this.$emit('input', item.id);
    }
  },
  mounted () {
    getImageList({
      'pagination[page_size]': 1000
    }).then((result) => {
      this.$fetchCB(result, (data) => {
        this.defaultList = data.items;
        this.$nextTick(() => { this.uploadList = this.$refs.upload.fileList; });
      });
    });
  }
};
</script>
<style lang="less">
.local-server{
    .upload-list{
        position: relative;
        display: inline-block;
        width: 130px;
        height: 130px;
        text-align: center;
        line-height: 130px;
        border: 1px solid transparent;
        border-radius: 4px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 8px;
    }
    .upload-list img{
        width: 100%;
        height: 100%;
        vertical-align: top;
    }
    .upload-list-cover{
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
        .ivu-icon {
            font-size: 30px;
            color: greenyellow;
        }
    }
    .upload-item-title {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        line-height: 30px;
        text-align: center;
        color:#fff;
        background: rgba(0,0,0,.6);
        word-break: break-all;
        transition: bottom 1s;
    }
    .close {
      display: none;
      position: absolute;
      right: 0px;
      top: 0px;
      line-height: 0;
      .ivu-icon {
        font-size: 20px;
        color:#fff;
      }
    }
}

</style>
