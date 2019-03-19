<template>
    <Modal
        :value="value"
        title="盒子二维码"
        :mask-closable="false"
        @on-cancel="close"
        :scrollable= "true"
        ok-text='打印'
        @on-ok="printfQr"
        >
        <div class="qrcode" id="myDiv" >
          <section ref="print" style="text-align:center;">
            <h3 style="font-size: 24px;word-break: break-all;">盒子编号：{{boxNo}}</h3>
            <img
            style="width: 300px;height: 300px;"
            :src="qrCodeUrl">
          </section>
          <span class="no-print">开门二维码<a :href="qrCodeUrl">[下载]</a></span>
        </div>
        <div slot="footer">
            <Button @click="close">取消</Button>
            <Button @click="printfQr" type="primary">打印</Button>
        </div>
      </Modal>
</template>

<script>
export default {
  name: 'BoxQrCode',
  props: {
    boxNo: {
      type: String,
      default: ''
    },
    qrCodeUrl: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    printfQr () {
      this.$print(this.$refs.print);
      // this.showQrcode = false;
      // this.$emit('input', false);
    },
    close () {
      this.$emit('input', false);
    }
  }
};
</script>
