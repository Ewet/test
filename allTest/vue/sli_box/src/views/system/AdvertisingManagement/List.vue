<template>
    <div style="min-height:420px">
      <!-- <Table border :columns="columns" :data="items" ></Table> -->
      <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :pageSize="pageSize"
          :total="total"
          :pageChange="pageChange.bind(this)"
        />
        <!-- <Modal
        :value="showModalVideo"
        :title="'预览视频'"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="showModalVideo=false"
        width= 572
        >
        <video
        ref="video"
          :src="videoUrl"
          controls="controls"
          autoplay
          width="540px"
          height="450px"
          >
          您的浏览器不支持 video 标签。
        </video>
    </Modal> -->
    <!-- <VideoPreviewModal
    v-model="showModalVideo"
    :videoSrc="videoUrl"/> -->
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { delItem } from './model';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'AdvertisingManagementList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '上传时间',
          key: 'uploadTime',
          minWidth: 80
        },
        {
          title: '广告名称',
          key: 'adName',
          minWidth: 80
        },
        {
          title: '所属广告商',
          key: 'advertiser',
          minWidth: 80
        },
        {
          title: '投放盒子数量',
          key: 'quantity',
          minWidth: 80
        },
        {
          title: '备注',
          key: 'remark',
          minWidth: 80
        },
        {
          title: '上传者',
          key: 'uploadedBy',
          minWidth: 80
        },
        {
          title: '操作',
          key: 'action',
          width: 300,
          align: 'center',
          render: (h, params) => h('div', [
            h('ZBtn', {
              props: {
                size: 'small'
              },
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.showVideo(params.row.fileUrl);
                }
              }
            }, '预览'),
            h('ZBtn', {
              props: {
                size: 'small'
              },
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.deliverySetting(params.row.adId);
                }
              }
            }, '投放设置'),
            h('EditBtn', {
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.editItem(params.row.adId);
                }
              }
            }, '编辑'),

            h('DelBtn', {
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.del(params.row.adId);
                }
              }
            }, '删除')
          ])
        }
      ],
      isloading: false
    };
  },
  mounted () {
    // this.pageChange(1);
  },
  methods: {
    showVideo (url) {
      this.$openPreviewVideo(url);
    },
    del (id) {
      this.$Modal.confirm({
        title: '请确认是否删除该广告？',
        content: '(删除后设置的全部相关盒子将停止播放该广告)',
        onOk: () => {
          delItem(id).then(({ success, msg }) => {
            if (success) {
              this.$success('删除成功!');
              this.reload();
            } else if (msg) {
              this.$error({
                content: `删除记录失败${msg}`
              });
            }
          });
        }
      });
    },
    // 关闭视频后台播放
    closeVideo () {
      const objVideo = this.$refs.video;
      if (!objVideo.paused) {
        objVideo.load();
        objVideo.pause();
      }
    }
  },
  watch: {
    showModalVideo (val) {
      if (!val) {
        this.closeVideo();
      }
    }
  }
};
</script>
