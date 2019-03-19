<template>
    <StructPage>
        <Header
            slot="header"
            title="发票详情"
        />
        <div slot="content" class="invoice-detail">
            <cell-group>
                <field
                    :value="titleTypeFormatted"
                    label="发票类型"
                    readonly
                />
                <field
                    :value="titleName"
                    label="发票抬头"
                    readonly
                />
                <field
                    :value="createdTimeFormatted"
                    label="申请日期"
                    readonly
                />
                <field
                    :value="statusFormatted"
                    label="状态"
                    readonly
                />
                <field
                    :value="orderSn"
                    label="关联单号"
                    readonly
                />
                <field
                    :value="invoiceNo"
                    label="发票号码"
                    readonly
                >
                <div slot="button">
                  <Button size="small" class='showbtn zi' @click="showInvoice">查看发票</Button>
                  <Button size="small" class='showbtn zi' @click="doCopy">复制发票</Button>
                </div>
                </field>
                <field
                    :value="handledTimeFormatted"
                    label="开票日期"
                    readonly
                />
                <field
                    :value="orderTotal"
                    label="订单金额"
                    readonly
                />
                <field
                    :value="paidTotal"
                    label="开票金额"
                    readonly
                />
            </cell-group>
            <p class="goods-title">商品</p>
                <!-- <div class="goods-item" v-for="(item,index) in goodsList" :key="index">
                    <div class="van-ellipsis goodsname">{{item.goodsName}}</div>
                    <div class="quantity">数量 {{item.quantity}}</div>
                    <div>总额￥{{item.goodsTotalPrice}}</div>
                </div> -->
                <Row class="goods-item" v-for="(item,index) in goodsList" :key="index">
                  <Col span="10" class="van-ellipsis goodsname">{{item.goodsName}}</Col>
                  <Col span="6" class="quantity">数量 {{item.quantity}}</Col>
                  <Col span="8" class="goods-amount">总额￥{{item.goodsTotalPrice}}</Col>
                </Row>
           </div>
    </StructPage>
</template>

<script>
import { CellGroup, Field, Toast, Button, Row, Col } from 'vant';
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import { getItem } from 'model/invoiceModel';
export default {
  data () {
    return {
      'loading': false,
      'finished': false,
      'invoiceId': this.$route.query.invoice_id,
      titleTypeFormatted: '',
      titleName: '',
      createdTimeFormatted: '',
      status: '',
      statusFormatted: '',
      orderSn: '',
      invoiceNo: '',
      handledTimeFormatted: '',
      orderTotal: '',
      paidTotal: '',
      invoiceUrl: '',
      goodsList: []

    };
  },
  computed: {
  },
  mounted () {
    this.loadData();
  },
  methods: {
    showInvoice () {
      this.$go({
        name: 'InvoicePDF',
        query: {
          invoice_id: this.invoiceId
        }
      });
    },
    loadData () {
      this.$showSpin();
      getItem(this.invoiceId).then(result => {
        if (result.success) {
          let data = result.data;
          this.titleTypeFormatted = data.titleTypeFormatted;
          this.titleName = data.titleName;
          this.createdTimeFormatted = data.createdTimeFormatted;
          this.statusFormatted = data.statusFormatted;
          this.orderSn = data.orderSn;
          this.invoiceNo = data.invoiceNo;
          this.handledTimeFormatted = data.handledTimeFormatted;
          this.orderTotal = data.orderTotal;
          this.paidTotal = data.paidTotal;
          this.invoiceUrl = data.invoiceUrl;
          this.goodsList = data.goodsList;
        } else if (result.code !== 401) {
          Toast(result.msg);
        }
        this.$hideSpin();
      });
    },
    doCopy () {
      this.$copyText(this.invoiceUrl).then((e) => {
        this.$success('复制成功！');
        console.log('copyed success');
      }, (e) => {
        this.$error('复制失败！');
        console.log('copyed fail');
      });
    }
  },
  components: {
    StructPage,
    Header,
    Field,
    CellGroup,
    Button,
    Row,
    Col
  }
};
</script>
<style lang="less">
@import "~@/assets/color.less";
</style>
<style lang="less" scoped>
@import "~@/assets/color.less";
.invoice-detail{
    .zi{
        color:@primaryColor;
    }
    font-size: 0.3rem;
    .goods-title {
        margin: 0.3rem 0.3rem 0.2rem;
    }
    .showbtn{
      border-radius:0.1rem;
    }
    .goods-item{
        height: 0.94rem;
        line-height:0.94rem;
        background: #fff;
        .goodsname{
          padding-left:0.3rem;
          text-align:left;
        }
        .quantity{
            text-align:center;
        }
        .goods-amount{
            text-align:right;
            padding-right:0.3rem;
        }
    }
}
</style>
