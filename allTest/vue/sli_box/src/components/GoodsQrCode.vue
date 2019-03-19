<template>
    <Modal
        :value="value"
        title="商品二维码"
        :mask-closable="false"
        @on-cancel="close"
        :scrollable= "true"
        ok-text='打印'
        @on-ok="printfQr"
        >
        <div class="qrcode" id="myDiv" >
          <section ref="print" style="text-align:center;">
            <h3 style="font-size: 24px;word-break: break-all;">商品名称：{{goodsName}}</h3>
            <img
            style="width: 300px;height: 300px;"
            :src="qrCodeUrl">
          </section>
          <span class="no-print">商品二维码(请右击图片另存为进行保存)</span>
        </div>
        <div slot="footer">
            <Button @click="close">取消</Button>
            <Button @click="printfQr" type="primary">打印</Button>
        </div>
      </Modal>
</template>

<script>
export default {
  name: 'GoodsQrCode',
  props: {
    goodsName: {
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
