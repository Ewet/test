<template>
    <StructPage>
        <Header
            slot="header"
            title="申请发票"
        />
        <div slot="content" class="request">
            <!-- <h2>申请发票内容</h2> -->
            <cell-group>
                <field
                    v-model="titleName"
                    label="发票抬头"
                    placeholder="请选择发票抬头"
                    readonly
                    icon="arrow"
                    class="invoice-header"
                    :class="{'has-header':titleName}"
                    @click="selectTitle"
                    @click-icon="selectTitle"
                />
                <field
                    :value="orderTotal"
                    label="发票金额"
                    readonly
                    class="amount"
                />
                <field
                    :value="createTime"
                    label="申请时间"
                    readonly
                />
                <field
                    :value="orderSn"
                    label="对应单号"
                    readonly
                />
            </cell-group>
            <p class="goods-title">商品</p>
                <!-- <div class="goods-item" v-for="(item,index) in goodsList" :key="index">
                    <div class="van-ellipsis goodsname">{{item.goodsName}}</div>
                    <div class="quantity">{{item.quantity}}X{{item.price}}</div>
                    <div class="zi">￥{{item.amount}}</div>
                </div> -->
                <Row class="goods-item" v-for="(item,index) in goodsList" :key="index">
                  <Col span="10" class="van-ellipsis goodsname">{{item.goodsName}}</Col>
                  <Col span="6" class="quantity">数量 {{item.quantity}}</Col>
                  <Col span="8" class="goods-amount">总额￥{{item.amount}}</Col>
                </Row>
                <!-- <div class="goods-item" v-for="(item,index) in goodsList" :key="index">
                    <div class="van-ellipsis goodsname">{{item.goodsName}}</div>
                    <div class="quantity">数量 {{item.quantity}}</div>
                    <div>总额￥{{item.amount}}</div>
                </div> -->
           </div>
           <div class="btn-footer" slot="footer">
               <Btn class="btn" size='height' @click="submitRequest">确认提交</Btn>
            </div>
    </StructPage>
</template>

<script>
import { CellGroup, Field, Toast, Row, Col } from 'vant';
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import Btn from 'components/Btn';
import fecha from 'fecha';
import { getOrderDetail, applyInvoice, getTitleItem } from 'model/invoiceModel';
export default {
  data () {
    return {
      'goodsList': [],
      'loading': false,
      'finished': false,
      'titleId': this.$route.query.title_id,
      'titleName': '',
      'orderTotal': '',
      'orderSn': this.$route.query.order_sn, // 订单点开发票跳转时传过来
      'orderId': ''

    };
  },
  computed: {
    createTime () {
      return fecha.format(new Date(), 'YYYY-MM-DD');
    }
  },
  mounted () {
    this.loadData();
  },
  methods: {
    loadData () {
      this.$showSpin();
      getOrderDetail(this.orderSn).then(result => {
        if (result.success) {
          let data = result.data;
          this.orderId = data.orderId;
          this.orderTotal = `￥${data.realReceive}`;
          //   this.orderSn = data.orderSn;
          this.goodsList = data.goods;
        } else if (result.code !== 401) {
          Toast(result.msg);
        }
        this.$hideSpin();
      });
      if (this.titleId) {
        getTitleItem(this.titleId).then(result => {
          if (result.success) {
            let data = result.data;
            this.titleName = data.titleName;
          } else if (result.code !== 401) {
            Toast(result.msg);
          }
          this.$hideSpin();
        });
      }
    },
    selectTitle () {
      this.$go({
        name: 'InvoiceHeaderList',
        query: {order_sn: this.orderSn}
      });
    },
    submitRequest () {
      if (this.titleName) {
        applyInvoice({
          title_id: this.titleId,
          order_id: this.orderId
        }).then(({success, msg}) => {
          if (success) {
          // Toast('新增成功！');
            this.$go({
              name: 'Invoice'
            });
          } else {
            Toast(msg);
          }
        });
      } else {
        Toast('请选择发票抬头');
      }
    }
  },
  components: {
    StructPage,
    Header,
    Field,
    CellGroup,
    Btn,
    fecha,
    Row,
    Col
  }
};
</script>
<style lang="less">
@import "~@/assets/color.less";
.request{
    .van-field__control{
        font-size: 0.26rem;
    }
    // .van-icon::before{
    //   margin-left:
    // }
    .invoice-header{
        .van-field__control{
            // width: auto;
            padding: 0 0.2rem;
            color: #BBBBBB;
            border: 1px solid #D3D3D9;
            border-radius:0.1rem;
        }
    }
    .has-header{
        .van-field__control{
            color: #000;
        }
    }
    .amount{
        .van-field__control{
            color:@primaryColor;
            font-size: 0.3rem;
        }
    }
}
</style>
<style lang="less" scoped>
@import "~@/assets/color.less";
.request{
    .zi{
        color:@primaryColor;
    }
    font-size: 0.3rem;
    .goods-title{
        margin: 0.3rem 0.3rem 0.2rem;
        // line-height: 0.9rem
    }
    .goods-item{
        height: 0.94rem;
        line-height:0.94rem;
        background: #fff;
        // display: flex;
        // justify-content: space-between;
        .goodsname{
          // max-width: 3.5rem;
          padding-left:0.3rem;
          text-align:left;
        }
        .quantity{
            // color: #C3C3C3;
            // font-size:0.26rem;
            // padding-top:0.1rem;
            text-align:center;
        }
        .goods-amount{
            text-align:right;
            padding-right:0.3rem;
        }
    }
}
.btn-footer{
        display: flex;
        justify-content: center;
        margin:0.1rem 0 0.36rem;
}
</style>
