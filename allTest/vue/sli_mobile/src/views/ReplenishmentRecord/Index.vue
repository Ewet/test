<template>
  <StructPage>
    <Header slot="header" title="补货记录" />
    <div slot="content">
      <div v-show="!emptyBox">
        <List v-model="loading" :offset="27" :finished="finished" @load="onLoad">
            <ItemRecord
              v-for="(item, index) in boxList"
              :key="index"
              :id="item.id"
              :time="item.time"
              :number="item.boxNo"
              :address="item.address"
            />
            <div class="message" v-show="message">已为你展示全部</div>
          </List>

      </div>
      <ListNoData v-show="emptyBox"
            :desc="'您还没有相关的内容耶~'"
            :bgimg="'.bg4'"
      />
    </div>
  </StructPage>
</template>
<script>
import { List } from 'vant';
import ListNoData from 'components/ListNoData';
import { getListBox } from 'model/replenishmentRecord';
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import ItemRecord from './ItemRecord';
export default {
  data () {
    return {
      message: false,
      boxList: [],
      loading: false,
      finished: false,
      page: 0,
      emptyBox: false
    };
  },
  mounted () {},
  methods: {
    async onLoad () {
      let page = this.page + 1;
      let {success, data} = await getListBox({
        'pagination[page]': page,
        'pagination[page_size]': 5
      });
      if (success) {
        let isEmpty = this.isDataEmpty(page, data.items);
        if (isEmpty) {
          this.loading = false;
          this.emptyBox = isEmpty;
        } else {
          let arr = [...this.boxList, ...data.items];
          this.boxList = arr;
          this.page = page;
          this.loading = false;
          if (!data.hasMore) {
            this.finished = true;
            this.message = true;
          }
        }
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
    ListNoData,
    StructPage,
    Header,
    ItemRecord,
    List
  }
};

</script>
<style lang="less" scoped>
.message {
  font-size: 0.2rem;
  color: #ABABAB;
  text-align: center;
  margin: 0.5rem 0;
}

</style>
