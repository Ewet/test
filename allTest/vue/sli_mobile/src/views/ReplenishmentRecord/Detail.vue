<template>
  <StructPage>
    <Header slot="header" title="补货详情" />
    <div slot="content">
      <Tabs type="card" class="tab" :color="'#A669C2'" >
        <Tab title="理货记录">
            <div  v-show="!emptyTally">
                <ItemDetail
                    v-for="(item, index) in listTally"
                    :key="index"
                    :tab="'tally'"
                    :imgUrl="item.imgUrl"
                    :position="' 货区'+item.position"
                    :name="item.name"
                    :before="item.before"
                    :after="item.after"
                    :price="item.price"
                />
                <div class="message" v-show="messageTally">已为你展示全部</div>

            </div>
            <ListNoData v-show="emptyTally"
            :desc="'您还没有相关的内容耶~'"
            :bgimg="'.bg4'"
            />
        </Tab>
        <Tab title="补货记录">
            <div v-show="!emptyReplenish">
                    <ItemReplenish
                        v-for="(item, index) in listReplenish"
                        :key="index"
                        :imgUrl="item.imgUrl"
                        :position="' 货区'+item.position"
                        :state="item.state"
                        :name="item.name"
                        :before="item.before"
                        :after="item.after"
                        :price="item.price"
                        :itemList="item.itemList?item.itemList:[]"
                    />
                    <div class="message" v-show="messageReplenish">已为你展示全部</div>

            </div>
            <ListNoData v-show="emptyReplenish"
            :desc="'您还没有相关的内容耶~'"
            :bgimg="'.bg4'"
            />

        </Tab>
      </Tabs>

    </div>
  </StructPage>
</template>
<script>
import { Tab, Tabs, List, Toast } from 'vant';
import ListNoData from 'components/ListNoData';
import {getInfo} from 'model/replenishmentRecord';
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import ItemDetail from './ItemDetail';
import ItemReplenish from './ItemReplenish';
export default {
  data () {
    return {
      replenishmentId: '',
      listTally: [], // 理货记录
      listReplenish: [], // 补货记录
      messageTally: false,
      messageReplenish: false,
      emptyTally: false,
      emptyReplenish: false
    };
  },
  mounted () {
    this.onLoadTally();
    this.onLoadReplenish();
  },
  methods: {
    filterData (arr) {
      return arr.filter(function (val) {
        return !(!val || val === '');
      });
    },
    // 理货记录
    async onLoadTally () {
      let replenishmentId = this.$route.query.replenishmentId;
      let {success, data, msg} = await getInfo({
        'replenishment_id': replenishmentId,
        'detail_type': '1'
      });
      if (success) {
        let dataArr = this.filterData(data);
        if (dataArr.length > 0) {
          this.emptyTally = false;
          this.listTally = dataArr;
        } else {
          this.emptyTally = true;
        }
      } else {
        Toast(msg);
      }
    },
    // 补货记录
    async onLoadReplenish () {
      let replenishmentId = this.$route.query.replenishmentId;
      let {success, data, msg} = await getInfo({
        'replenishment_id': replenishmentId,
        'detail_type': '2'
      });
      if (success) {
        let dataArr = this.filterData(data);
        if (dataArr.length > 0) {
          this.emptyReplenish = false;
          this.listReplenish = dataArr;
        } else {
          this.emptyReplenish = true;
        }
      } else {
        Toast(msg);
      }
    },
    // 判断是否有数据
    isDataEmpty (page, data) {
      let len = data.length;
      if (page === 1 && len === 0) {
        return true;
      }
      return false;
    }
  },
  components: {
    StructPage,
    Header,
    Tab,
    Tabs,
    List,
    ItemDetail,
    ItemReplenish,
    ListNoData
  }
};

</script>
<style lang="less" >
.tab {
  margin: 0.2rem 0 0 0;
  color: #fff;
  padding-top: 1rem;
  padding-bottom: 1rem;

  .van-tab--active {
    color: #fff !important;
  }

  .van-tabs__wrap,
  .van-tabs__nav--card {
    height: 35px;
  }

  .van-tabs__nav--card {
    border-radius: 5px;
    overflow: hidden;
  }

  .van-tab {
    display: flex;
    justify-content: center;
    align-items: center;
  }

}
.message {
  font-size: 0.2rem;
  color: #ABABAB;
  text-align: center;
  margin: 0.5rem 0;
}

</style>
