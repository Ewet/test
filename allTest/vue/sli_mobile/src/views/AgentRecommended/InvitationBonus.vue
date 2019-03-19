<template>
  <StructPage>
    <Header slot="header" title="我的现金红包" />
    <div slot="content">
      <!-- <div v-show="!emptyBox">
        <List v-model="loading" :finished="finished" @load="onLoad">
            <ItemRecord
              v-for="(item, index) in boxList"
              :key="index"
              :id="item.id"
              :time="item.time"
              :number="item.boxNo"
              :address="item.address"
              :class="(index%2===0?'wow slideInLeft':'wow slideInRight')"

            />
            <div class="message" v-show="message">已为你展示全部</div>
          </List>

      </div>
      <ListNoData v-show="emptyBox"
            :desc="'您还没有相关的内容耶~'"
            :bgimg="'.bg4'"
      /> -->
    </div>
  </StructPage>
</template>
<script>
import {WOW} from 'wowjs';
import { List } from 'vant';
import ListNoData from 'components/ListNoData';
import { getListBox } from '@/model/replenishmentRecord';
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
  mounted () {
    // new WOW().init();
    console.log(3 % 2);
  },
  methods: {
    async onLoad () {
      let page = this.page + 1;
      let {success, data} = await getListBox({
        'pagination[page]': page,
        'pagination[page_size]': 5
      });
      if (success) {
        console.log(data);
        let totalPage = Math.ceil(parseInt(data.total) / 5);
        let isEmpty = this.isDataEmpty(page, data.items);
        if (isEmpty) {
          this.emptyBox = isEmpty;
        } else {
          let arr = [...this.boxList, ...data.items];
          this.boxList = arr;
          this.page = page;
          this.loading = false;
          if (page === totalPage) {
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
  watch: {
    boxList () {
      this.$nextTick(() => { // 在dom渲染完后,再执行动画
        new WOW().init();
      });
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
<style lang="less">
.message {
  font-size: 0.2rem;
  color: #ABABAB;
  text-align: center;
  margin: 0.5rem 0;
}

</style>
