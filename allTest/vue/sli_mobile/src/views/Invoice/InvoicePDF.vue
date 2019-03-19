<template>
    <StructPage>
          <Header
              slot="header"
              title="我的发票"
          />
          <div slot="content">
              <iframe class="pdf-viewer"
              name="pdf-viewer"
              v-if="src"
              :src='pdfSrc'
              width="813" height="600" scrolling="no">
                您的浏览器不支持PDF阅读
              </iframe>
          </div>
         <footer slot="footer">
            <Button @click="handleDownload">下载</Button>
            <div>
              <Button @click="handleZoomOut">缩小</Button>
              <Button @click="handleZoomIn">放大</Button>
            </div>
          </footer>
    </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import { getItem } from 'model/invoiceModel';
import { Button } from 'vant';
export default {
  data () {
    return {
      'invoiceId': this.$route.query.invoice_id,
      'src': '',
      'title': ''
    };
  },
  mounted () {
    this.loadData();
  },
  methods: {
    loadData () {
      this.$showSpin();
      getItem(this.invoiceId).then(result => {
        if (result.success) {
          let data = result.data;
          this.title = data.invoiceNo;
          this.src = data.invoiceUrl;
        } else if (result.code !== 401) {
          this.$error(result.msg);
        }
        this.$hideSpin();
      });
    },
    handleZoomOut () {
      let viewer = window.frames['pdf-viewer'];
      if (viewer && viewer.pdfZoomOut) {
        viewer.pdfZoomOut();
      }
    },
    handleZoomIn () {
      let viewer = window.frames['pdf-viewer'];
      if (viewer && viewer.pdfZoomIn) {
        viewer.pdfZoomIn();
      }
    },
    handleDownload () {
      let viewer = window.frames['pdf-viewer'];
      if (viewer && viewer.pdfDownload) {
        viewer.pdfDownload();
      }
    }
  },
  computed: {
    pdfSrc () {
      let isDev = process.env.NODE_ENV !== 'production';
      let base = isDev ? '' : '/mobile';
      return `${base}/static/pdf/web/viewer.html?file=${this.src}`;
    }
  },
  components: {
    StructPage,
    Header,
    Button
  }
};
</script>
<style lang="less">
@import "~@/assets/color.less";
footer {
  display: flex;
  background: #000;
  justify-content: space-between;
  z-index: 1;
  font-size: .32rem;
  padding: .1rem;
}
</style>
