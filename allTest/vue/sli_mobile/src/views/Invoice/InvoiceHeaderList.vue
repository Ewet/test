<template>
    <StructPage>
        <Header
            slot="header"
            title="发票抬头"
        />
        <div slot="content" class="headerList">
          <pull-refresh v-model="topLoading" @refresh="onRefresh">
          <list
          v-model="bottomLoading"
          :finished="finished"
          @load="onLoad"
          :immediate-check="true"
        >
            <div class="item" v-for="(item,index) in items" :key="index">
              <div @click="selectTitle(item.titleId)">
                <cell :title="item.titleName" titleClass="van-ellipsis"/>
                <cell title="">
                    <div slot="right-icon" >
                            <span @click.stop="edit(item.titleId)"><icon name="records"/>编辑</span>
                            <span @click.stop="del(item.titleId)"><icon name="delete"/>删除</span>
                    </div>
                </cell>
              </div>
            </div>
            <ListNoData
              desc="暂无发票抬头记录~"
              bgimg='bg2'
              v-show="items.length===0 && loaded"></ListNoData>
            <BottomNoData v-show="loaded && finished && items.length >0"></BottomNoData>
            </list>
            </pull-refresh>

            <!-- <div class="item" v-for="(item, index) in invoiceHeaderList" :key="index">
                <cell :title="item.titleName"/>
                <cell title="">
                    <div slot="right-icon" >
                            <span @click="edit(item.titleId)"><icon name="records"/>编辑</span>
                            <span @click="del(item.titleId)"><icon name="delete"/>删除</span>
                    </div>
                </cell>
            </div> -->
        </div>
        <div class="btn-footer" slot="footer">
               <Btn class="btn" size='height' @click="add">新增发票抬头</Btn>
        </div>
    </StructPage>
</template>

<script>
import { CellGroup, Cell, Icon, Dialog, List, Toast, PullRefresh } from 'vant';
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import Btn from 'components/Btn';
import BottomNoData from 'components/BottomNoData';
import ListNoData from 'components/ListNoData';
import { getTitleList, delItem } from 'model/invoiceModel';
export default {
  data () {
    return {
      // invoiceHeaderList: [],
      orderSn: this.$route.query.order_sn,
      items: [],
      topLoading: false,
      finished: false,
      bottomLoading: false,
      current: 1,
      hasMore: true,
      loaded: false
    };
  },
  mounted () {
  },
  methods: {
    loadData (callback = (data) => {}) {
      this.loadAjaxData();
    },
    //
    onLoad () {
      this.$nextTick(() => {
        this.loadAjaxData(undefined, ({
          hasMore
        }) => {
          this.bottomLoading = false;
          this.finished = !hasMore;
        });
      });
    },
    onRefresh () {
      this.loadAjaxData(() => {
        // this.filterTime = '';
        this.current = 1;
        this.finished = true;
      }, ({
        hasMore
      }) => {
        setTimeout(() => {
          this.topLoading = false;
        }, 500);
        this.finished = !hasMore;
        if (this.finished) {
          this.$nextTick(() => {
            this.showNoMoreData = true;
          });
        }
      });
    },
    // 加载异步数据
    loadAjaxData (beforeCallback = () => {}, afterCallback = () => {}) {
      beforeCallback.call(this);
      getTitleList({
        'pagination[page]': this.current
      }).then(({
        success,
        data,
        msg
      }) => {
        afterCallback.call(this, data);
        let formatItem = item => {
          return {
            titleId: item.titleId,
            titleName: item.titleName
          };
        };
        if (success) {
          if (this.current === 1) {
            this.items = data.items.map(x => {
              return formatItem(x);
            });
          } else {
            this.items = this.items.concat(data.items.map(x => {
              return formatItem(x);
            }));
          }
          this.current++;
          this.loaded = true;
        } else if (msg) {
          Toast(msg);
        }
      });
    },
    //
    selectTitle (id) {
      this.$go({
        name: 'InvoiceRequest',
        query: {
          title_id: id,
          order_sn: this.orderSn
        }
      });
    },
    edit (id) {
      this.$go({
        name: 'InvoiceHeaderEdit',
        query: {
          title_id: id,
          order_sn: this.orderSn
        }
      });
    },
    add () {
      this.$go({
        name: 'InvoiceHeaderEdit',
        query: {
          order_sn: this.orderSn
        }
      });
    },
    del (id) {
      Dialog.confirm({
        title: '确定要删除吗？',
        message: ''
      }).then(() => {
        // on confirm
        delItem(id).then(({success, msg}) => {
          if (success) {
            Toast('删除成功！');
            // this.loadData();
            this.onRefresh();
          } else {
            Toast(msg);
          }
        }).catch(() => {
          // on cancel
        });
      });
    }
  },
  components: {
    StructPage,
    Btn,
    BottomNoData,
    ListNoData,
    Header,
    CellGroup,
    Cell,
    Icon,
    List,
    Toast,
    PullRefresh
  }
};
</script>
<style lang="less">
@import "~@/assets/color.less";
.headerList{
    .item{
        span{
            margin-left: 0.5rem;
            .van-icon{
            margin-right: 0.1rem;
        }
        }

    }
}
</style>
<style lang="less" scoped>
@import "~@/assets/color.less";
.headerList{
    .item{
        margin-top:0.2rem;
    }
}
.btn-footer{
        display: flex;
        justify-content: center;
        align-items:center;
        padding:0.2rem 0;
        // margin:0.1rem 0 0.36rem;
}
</style>
