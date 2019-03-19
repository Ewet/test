<template>
    <div style="min-height:420px">
      <ModuleHeader title="收款明细">
      </ModuleHeader>
      <section class="collection-statistics">
        <h3>收款统计</h3>
          <ul>
            <li>
              {{receiptsToday}}<br/>
              今日收款额
            </li>
            <li>
              {{receiptsYesterday}}<br/>
              昨日收款额
            </li>
            <li>
              {{receiptsSevenDay}}<br/>
              近7日收款额
            </li>
            <li>
              {{receiptsThirtyDay}}<br/>
              近30天收款额
            </li>
            <li>
              {{receiptsTotal}}<br/>
              总收款额
            </li>
        </ul>
      </section>
      <Toolbar />
      <List/>
    </div>
</template>
<script>
import Toolbar from './Toolbar';
import List from './List';
import vuexMixins from 'mixins/module-map';
import { getAmount } from 'views/report/CollectionDetail/model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'CollectionDetail',
  components: {
    Toolbar,
    List
  },
  data () {
    return {
      receiptsToday: '0',
      receiptsYesterday: '0',
      receiptsSevenDay: '0',
      receiptsThirtyDay: '0',
      receiptsTotal: '0'
    };
  },
  mounted () {
    this.getTotal();
  },
  methods: {
    async getTotal () {
      const { success, data, msg } = await getAmount();
      if (success) {
        this.receiptsToday = data.today_receipt;
        this.receiptsYesterday = data.yestterday_receipt;
        this.receiptsSevenDay = data.seven_receipt;
        this.receiptsThirtyDay = data.thirty_receipt;
        this.receiptsTotal = data.total_price;
      } else {
        this.$error(`信息获取失败！${msg}`);
      }
    }
  }
};
</script>
<style lang="less">
.collection-statistics {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #dddee1;
  ul {
    display: flex;
    justify-content: space-around;
    list-style:none;
    font-size: 25px;
    li {
      text-align: center;
    }
  }
}
</style>
